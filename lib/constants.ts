export const STATIC_ROUNDS_CONFIG = [
    {
        id: "round1",
        title: "Round-1",
        subtitle: "Problem Analysis & Solution feasibility",
        color: "text-blue-400",
        bg: "bg-blue-500",
        dayOffset: 0,
        hour: 14,
        minute: 30,
        criteria: [
            { id: "r1q1", label: "Problem Understanding", desc: "Clarity in defining the problem and understanding its root cause." },
            { id: "r1q2", label: "Solution Feasibility", desc: "Solutions for problem is appropriate or not." },
            { id: "r1q3", label: "Societal Relevance & Impact", desc: "Addresses a real societal / public issue." },
            { id: "r1q4", label: "Domain Alignment", desc: "Strong fit with domain chosen (AI/ Blockchain / IoT / Cyber)" },
            { id: "r1q5", label: "Feasibility in 24 Hours", desc: "Can a working prototype be built within the hackathon time" },
            { id: "r1q6", label: "Team Contribution & Presentation", desc: "Team Members Contribution and Presentation" },
        ]
    },
    {
        id: "round2",
        title: "Round-2",
        subtitle: "Technical Design - Detailed",
        color: "text-pink-400",
        bg: "bg-pink-500",
        dayOffset: 0,
        hour: 21,
        minute: 30,
        criteria: [
            { id: "r2q1", label: "Model Design", desc: "Detailed architecture including data flow/control flow, and module interaction" },
            { id: "r2q2", label: "Domain Knowledge", desc: "Practical application of domain-specific techniques/algorithms protocols" },
            { id: "r2q3", label: "Methodology", desc: "Detailed implementation steps" },
            { id: "r2q4", label: "Team Contribution & Presentation", desc: "Team Members Contribution and Presentation" },
        ]
    },
    {
        id: "round3",
        title: "Round-3",
        subtitle: "Final Evaluation (Focusing on What was actually buill)",
        color: "text-yellow-400",
        bg: "bg-yellow-500",
        dayOffset: 1,
        hour: 6,
        minute: 0,
        criteria: [
            { id: "r3q1", label: "Implementation Accuracy", desc: "How closely the implementation follows the design presented in Round-2." },
            { id: "r3q2", label: "Testing", desc: "Verification of functionality using valid inputs and scenarios" },
            { id: "r3q3", label: "Viability for Commercialization", desc: "Potential for real-world or market use" },
            { id: "r3q4", label: "Team Contribution & Presentation", desc: "Team Members Contribution and Presentation" },
        ]
    },
    {
        id: "round4",
        title: "Round-4",
        subtitle: "Top Teams Presentation",
        color: "text-purple-400",
        bg: "bg-purple-600",
        dayOffset: 1,
        hour: 7,
        minute: 0,
        criteria: [
            { id: "r4q1", label: "Achievement of Objective", desc: "Extent to which the proposed objective has been successfully achieved." },
            { id: "r4q2", label: "Quality of Execution", desc: "Effectiveness and completeness of implementation and demonstration." },
            { id: "r4q3", label: "Response to Queries", desc: "Ability to clearly answer questions and justify design choices." },
            { id: "r4q4", label: "Team Members Contribution", desc: "Individual involvement and role in project development." },
            { id: "r4q5", label: "Presentation", desc: "Clarity, confidence, and overall quality of the presentation." },
            { id: "r4q6", label: "Potential for Patent or Publication", desc: "Novelty and originality of the work with potential for patent filing or research publication." },
        ]
    }
];
