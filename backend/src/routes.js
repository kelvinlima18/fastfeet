import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import AvatarController from './app/controllers/AvatarController';
import DeliveyManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryStatusController from './app/controllers/DeliveryStatusController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliveryReceivedController from './app/controllers/DeliveryReceivedController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/deliverymans', DeliveyManController.store);
routes.get('/deliverymans', DeliveyManController.index);
routes.get('/deliverymans/:id', DeliveyManController.show);
routes.put('/deliverymans/:id', DeliveyManController.update);
routes.delete('/deliverymans/:id', DeliveyManController.delete);

routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.post(
  '/deliverymans/:id/deliveries/:deliveries_id',
  upload.single('file'),
  DeliveryReceivedController.store
);
routes.get('/deliverymans/:id/deliveries', DeliveryStatusController.index);
routes.get(
  '/deliverymans/:id/deliveries/:deliveries_id',
  DeliveryStatusController.show
);
routes.put(
  '/deliverymans/:id/deliveries/:deliveries_id',
  DeliveryStatusController.update
);

routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.put('/problem/:id/cancel-delivery', DeliveryProblemController.update);

routes.post('/avatars', upload.single('file'), AvatarController.store);

export default routes;
