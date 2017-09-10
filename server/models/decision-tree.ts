export interface DecisonTree{
    lCondition:string;
    rCondition:string;
    isLeaf:boolean;
    prediction:string;
    impurity: number;
    sample:number;
    sampleDistribution: number[];
    probability: number;
    left: DecisonTree;
    right: DecisonTree;
    marked: boolean;
}

let abc:DecisonTree ={  
                lCondition: "genres in {action|adventure|fantasy|sci-fi, action|adventure|thriller, romance, thriller|war, comedy|crime|sport}",
                rCondition: "genres in {action|adventure|fantasy|sci-fi, action|adventure|thriller, romance, thriller|war, comedy|crime|sport}",
                left:{},
                right:{},
                isLeaf:false,
                prediction:"imdb rating: 7",
                probability: 0.71,
                sample: 45,
                sampleDistribution: [23,0,0,0]
            };