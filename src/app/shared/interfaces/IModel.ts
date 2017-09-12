
export interface IModel{
    decisionTree?:IDecisonTree;
    confusionMatrix?:IConfusionMatrix;
    decisionRules?:IdecisionRules;
    featureRelevance?: IFeatureRelevance;
}

export interface IDecisonTree{
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

export interface IConfusionMatrix {
    headers: string[];
    data: IMatrixPoint[];
}

interface IMatrixPoint{
    value:number;
    isDiagonal: boolean; 
}

export interface IdecisionRules{
    key:string;
    condition: string;
    impurity: number;
}
export interface IFeatureRelevance{
    name:string;
    value:number;
    percentage: number;
}

export interface ID3Tree{
    name:string;
    direction?:string;
    condition?:string;
    children?: ID3Tree[];
    samples?: number;
    impurity: number;
    marked: boolean;
    isLeaf: boolean;
}
