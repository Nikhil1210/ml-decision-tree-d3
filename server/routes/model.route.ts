import { Router, Request, Response } from 'express';
import ModelController from '../controllers/model.controller';

const ctrl = new ModelController();
export default Router()
  .get('/decisionTree', ctrl.GetDecisionTree)
  .get('/modelData', ctrl.ModelData)
    .get('/modelMatrix', ctrl.GetModelMatrix);
