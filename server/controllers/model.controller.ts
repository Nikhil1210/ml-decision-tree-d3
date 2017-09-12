import { Router, Request, Response } from 'express';
import model from '../models/model';
import {MODEL_DATA} from "../mocks/model";

export default class ModelController {
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
    //     model.find().sort({ createdAt: -1 }).exec((err, result) => {
    //     if (err) {
    //         return res.send(500);
    //     }
    //     return res.json(result);
    // }); 
    }

    /**
     * GetModelData
     */
    public ModelData(req: Request, res: Response) {
        return res.json(MODEL_DATA);
    }
}
