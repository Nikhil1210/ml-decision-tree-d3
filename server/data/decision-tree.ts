import {DecisonTree} from "../models/decision-tree";

export const decisionTreeData : DecisonTree[] = [
    {
        lCondition: "director_name in {James Cameron, Andrew Stanton, Sam Mendis, Peter jackson, Mark" +
            " Andrews, Christopher Nolan, Steven Spielberg, Martin Scorsese, Quentin Tarantin" +
            "o}",
        rCondition: "director_name not in {James Cameron, Andrew Stanton, Sam Mendis, Peter jackson, " +
            "Mark Andrews, Christopher Nolan, Steven Spielberg, Martin Scorsese, Quentin Tara" +
            "ntino}",
        left: {
            lCondition: "actor_1_facebook_likes > 4000",
            rCondition: "actor_1_facebook_likes < 4000",
            left: {
                lCondition: "genres in {action|adventure|fantasy|sci-fi, action|adventure|thriller, romance, " +
                    "thriller|war, comedy|crime|sport}",
                rCondition: "genres not in {action|adventure|fantasy|sci-fi, action|adventure|thriller, roman" +
                    "ce, thriller|war, comedy|crime|sport}",
                left: {
                    isLeaf: true,
                    prediction: "imdb rating: 8",
                    probability: 1,
                    sample: 25,
                    sampleDistribution: [23, 0, 0, 0]
                },
                right: {
                    isLeaf: true,
                    prediction: "imdb rating: 7",
                    probability: 1,
                    sample: 14,
                    sampleDistribution: [27, 0, 0, 0]
                },
                isLeaf: false,
                prediction: "imdb rating: 7",
                probability: 0.71,
                sample: 45,
                sampleDistribution: [23, 0, 0, 0]
            },
            right: {
                lCondition: "budget > 210000000",
                rCondition: "budget < 210000000",
                left: {
                    lCondition: "plot_keywords in {avatar|future|marine|native|paraplegic, 15 year old|dancing|li" +
                        "ttle sister|suburb,biker|biker gang|idea|idea agent|fight,death|doctor|gypsy|jud" +
                        "ge|lawyer, zombbie|zombie spoof, president|snow|television, racism}",
                    rCondition: "plot_keywords in {avatar|future|marine|native|paraplegic, 15 year old|dancing|li" +
                        "ttle sister|suburb,biker|biker gang|idea|idea agent|fight,death|doctor|gypsy|jud" +
                        "ge|lawyer, zombbie|zombie spoof, president|snow|television, racism}",
                    left: {
                        lCondition: "title_year < 2008",
                        rCondition: "title_year > 2008",
                        left: {
                            isLeaf: true,
                            prediction: "imdb rating: 7.8",
                            probability: 1,
                            sample: 15,
                            sampleDistribution: [23, 0, 0, 0]
                        },
                        right: {
                            isLeaf: true,
                            prediction: "imdb rating: 8.3",
                            probability: 1,
                            sample: 10,
                            sampleDistribution: [23, 0, 0, 0]
                        },
                        isLeaf: false,
                        prediction: "imdb rating: 7.5",
                        probability: 0.71,
                        sample: 45,
                        sampleDistribution: [23, 0, 0, 0]
                    },
                    right: {
                        lCondition: "director_facebook_likes > 1000",
                        rCondition: "director_facebook_likes < 1000",
                        left: {
                            isLeaf: true,
                            prediction: "imdb rating: 8.0",
                            probability: 1,
                            sample: 15,
                            sampleDistribution: [23, 0, 0, 0]
                        },
                        right: {
                            lCondition: "director_name in {Gore Verbinski, Anthony Russo, Peter jackson, Joe Berlinger, N" +
                                "icholas Hytner}",
                            rCondition: "director_name not in {Gore Verbinski, Anthony Russo, Peter jackson, Joe Berlinge" +
                                "r, Nicholas Hytner}",
                            left: {
                                isLeaf: true,
                                prediction: "imdb rating: 7.2",
                                probability: 1,
                                sample: 22,
                                sampleDistribution: [23, 0, 0, 0]
                            },
                            right: {
                                isLeaf: false,
                                prediction: "imdb rating: 6.1",
                                probability: 1,
                                sample: 11,
                                sampleDistribution: [23, 0, 0, 0]
                            },
                            isLeaf: false,
                            prediction: "imdb rating: 8.3",
                            probability: 1,
                            sample: 10,
                            sampleDistribution: [23, 0, 0, 0]
                        },
                        isLeaf: false,
                        prediction: "imdb rating: 7.5",
                        probability: 0.71,
                        sample: 45,
                        sampleDistribution: [23, 0, 0, 0]
                    },
                    isLeaf: false,
                    prediction: "imdb rating: 7",
                    probability: 0.71,
                    sample: 45,
                    sampleDistribution: [23, 0, 0, 0]
                },
                right: {
                    lCondition: "actor_2_name in {Orlando Bloom, Marlon Brando, Andrew garfield, Judy Greer, Eva " +
                        "Green, William Hurt, Kate Winslet, Robert Downey Jr., Jessica Simpson, Jean Arth" +
                        "ur, Hugh Jackman, Ian Hart}",
                    rCondition: "actor_2_name not in {Orlando Bloom, Marlon Brando, Andrew garfield, Judy Greer, " +
                        "Eva Green, William Hurt, Kate Winslet, Robert Downey Jr., Jessica Simpson, Jean " +
                        "Arthur, Hugh Jackman, Ian Hart",
                    left: {},
                    right: {},
                    isLeaf: false,
                    prediction: "imdb rating: 7",
                    probability: 0.71,
                    sample: 45,
                    sampleDistribution: [23, 0, 0, 0]
                },
                isLeaf: false,
                prediction: "imdb rating: 6",
                probability: 0.71,
                sample: 45,
                sampleDistribution: [23, 0, 0, 0]
            },
            isLeaf: false,
            prediction: "imdb rating: 7",
            probability: 0.62,
            sample: 50,
            sampleDistribution: [50, 2, 0, 0]
        },
        // right:,
        isLeaf: false,
        prediction: "imdb rating: 8",
        probability: 0.543,
        sample: 20,
        sampleDistribution: [23, 0, 0, 0]
    }
]as DecisonTree[];