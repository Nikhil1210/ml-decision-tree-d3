import { Router, Request, Response } from 'express';
import PredictionsController from '../controllers/predictions.controller';

const ctrl = new PredictionsController();
export default Router()
  .get('/predictions', ctrl.GetPredictions);
