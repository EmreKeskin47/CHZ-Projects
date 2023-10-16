interface Proposal {
    id: number;
    title: string;
    options: string[];
}

const proposals: Proposal[] = [
    {
        id: 1,
        title: "Who should join the virtual meetup?",
        options: [
            "Kevin De Bruyne (Manchester City)",
            "Lionel Messi (Barcelona)",
            "Zlatan Ibrahimović (Milan)",
        ],
    },
    {
        id: 2,
        title: "Who should join the virtual meetup?",
        options: [
            "Raheem Sterling (Manchester City)",
            "Ansu Fati (Barcelona)",
            "Franck Kessié (Milan)",
        ],
    },
    {
        id: 3,
        title: "Who should join the virtual meetup?",
        options: [
            "Phil Foden (Manchester City)",
            "Sergio Busquets (Barcelona)",
            "Theo Hernández (Milan)",
        ],
    },
];

export default proposals;
