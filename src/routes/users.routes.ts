import { Router, Request, Response } from 'express';
import usersService from '../services/users.service';

class UsersRoute {
  public router = Router();

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.get('/usuarios', this.obtenerUsuarios.bind(this));
    this.router.post('/usuarios', this.crearUsuarios.bind(this));
    this.router.put('/usuarios/:id', this.actualizarUsuarios.bind(this));
    this.router.delete('/usuarios/:id', this.eliminarUsuarios.bind(this));
  }

  async obtenerUsuarios(req: Request, res: Response) {
    try {
      const response = await usersService.obtenerUsuarios();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async crearUsuarios(req: Request, res: Response) {
  /*  if (!req.body.nombreUsuario || !req.body.rolUsuario || !req.body.contrasena) {
      return res.status(400).json({ mensaje: 'Por favor ingrese todos los datos requeridos', status: 400 });
    }*/ // USAR ESTE IF PARA VALIDAR ENTRADA DE DATOS
    try {
      const response = await usersService.crearUsuarios(req.body);
      if (response?.status === 400) {
        return res.status(response?.status).json(response);
      }
      res.status(200).json({ mensaje: 'Usuario creado satisfactoriamente' }); //SOlo cambiar los mensajes a lo que pida
    } catch (err) {
      res.status(500).json({ mensaje: 'Hubo un problema en la creación de usuario', err, status: 500 });
    }
  }

  async actualizarUsuarios(req: Request, res: Response) {
    /*  if (!req.body.nombreUsuario || !req.body.rolUsuario || !req.body.contrasena) {
        return res.status(400).json({ mensaje: 'Por favor ingrese todos los datos requeridos', status: 400 });
      }*/ // USAR ESTE IF PARA VALIDAR ENTRADA DE DATOS
      try {
        const response = await usersService.actualizarUsuarios(req.body,req.params.id);
        if (response?.status === 400) {
          return res.status(response?.status).json(response);
        }
        res.status(200).json({ mensaje: 'Usuario actualizado satisfactoriamente' }); //SOlo cambiar los mensajes a lo que pida
      } catch (err) {
        res.status(500).json({ mensaje: 'Hubo un problema en la actualizacion de usuario', err, status: 500 });
      }
    }

  async eliminarUsuarios(req: Request, res: Response) {
    try {
      const response = await usersService.eliminarUsuarios(req.params.id);
      if (response?.status === 400) {
        return res.status(response?.status).json(response);
      }
      res.status(200).json({ mensaje: 'El Usuario ha sido dado de baja exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Hubo un problema en la baja de usuario', error, status: 500 });
    }
  }
}

export default new UsersRoute().router;
