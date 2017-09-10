import { Router, Request, Response } from 'express';
import model from '../models/model';

export default class ModelController{
    constructor(){

    }
    /**
     * GetDecisionTree
     */
    public GetDecisionTree(req: Request,res:Response) {
        return res.json('decision tree');
    }

    /**
     * GetModelMatrix
     */
    public GetModelMatrix() {
        
    }

    /**
     * GetModelData
     */
    public GetModelData(req: Request,res:Response) {
        model.find().sort({ createdAt: -1 }).exec((err, result) => {
        if (err) {
            return res.send(500);
        }
        return res.json(result);
    });
    }
}