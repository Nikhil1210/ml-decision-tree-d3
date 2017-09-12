
export interface IModel{
    decisionTree?:IDecisonTree;
    confusionMatrix?:IConfusionMatrix;
    decisionRules?:IdecisionRules;
    featureRelevance?: IFeatureRelevance;
}

interface IDecisonTree{
    lCondition:string;
    rCondition:string;
    isLeaf:boolean;
    prediction:string;
    impurity: number;
    sample:number;
    sampleDistribution: number[];
    probability: number;
    left: IDecisonTree;
    right: IDecisonTree;
    marked: boolean;
}

interface IConfusionMatrix{
    headers: string[];
    data: IMatrixPoint[];
}

interface IMatrixPoint{
    value:number;
    isDiagonal: boolean; 
}

interface IdecisionRules{
    key:string;
    condition: string;
    impurity: number;
}
interface IFeatureRelevance{
    name:string;
    value:number;
    percentage: number;
}
