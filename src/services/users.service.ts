import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';

// LOS NOMBRE DE SERIVICIO Y RUTA, CAMBIARLO A LO QUE TE PIDAN ESTO ES SOLO UN EJEMPLO DE TEMPLATE
class UserService {
  async obtenerUsuarios() {
    const usuarios = await getRepository(User).find();
    return usuarios;
  }

  async crearUsuarios(usuario: any) {
    try {
      //Buscamos si existe un usuario con ese mismo nombre de usuario ingresado.
      const usuarioEncontrado = await getRepository(User).findOne({
        where: { nombreUsuario: usuario.nombreUsuario, fechaBaja: null },
      });
      if (usuarioEncontrado) {
        return { mensaje: 'El usuario con ese nombre de usuario, ya existe en nuestro sistema', status: 400 };
      }
      const nuevoUsuario = new User();
      nuevoUsuario.nombreUsuario = String(usuario.nombreUsuario).toLowerCase(); //Para poder almacenar los nombres de usuarios todo en minusucula
      nuevoUsuario.fechaCreacion = new Date();
      // Debemos hashear la contraseña con bcrypt.
      const salt = await bcrypt.genSalt(10);
      const contrasenaCifrada = await bcrypt.hash(usuario.contrasena, salt);
      nuevoUsuario.constrasena = contrasenaCifrada;
      await getRepository(User).save(nuevoUsuario);
    } catch (error) {
      throw error;
    }
  }

  async actualizarUsuarios(usuario: any, idUsuario:string) {
    try {
      const usuarioEncontrado = await getRepository(User).findOne(idUsuario, { where: { fechaBaja: null } });
      if (!usuarioEncontrado) {
        return { mensaje: 'El usuario no se encuentra en el sistema', status: 400 };
      }
      usuarioEncontrado.nombreUsuario = String(usuario.nombreUsuario).toLowerCase(); //Para poder almacenar los nombres de usuarios todo en minusucula
      usuarioEncontrado.fechaCreacion = new Date();
      // Debemos hashear la contraseña con bcrypt.
      const salt = await bcrypt.genSalt(10);
      const contrasenaCifrada = await bcrypt.hash(usuario.contrasena, salt);
      usuarioEncontrado.constrasena = contrasenaCifrada;
      await getRepository(User).save(usuarioEncontrado);
    } catch (error) {
      throw error;
    }
  }

  async eliminarUsuarios(idUsuario: string) {
    const usuarioEncontrado = await getRepository(User).findOne(idUsuario, { where: { fechaBaja: null } });
    if (!usuarioEncontrado) {
      return { mensaje: 'El usuario no se encuentra en el sistema', status: 400 };
    }
    usuarioEncontrado.fechaBaja = new Date();
    await getRepository(User).save(usuarioEncontrado);
  }
}

export default new UserService();
