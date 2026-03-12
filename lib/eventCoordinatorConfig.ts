export interface CoordinatorEvent {
    slug: string;
    title: string;
    category: string;
    venue: string;
    date: string;
}

export const COORDINATOR_EVENTS: CoordinatorEvent[] = [
    {
        slug: "singing",
        title: "Singing",
        category: "Cultural",
        venue: "Main Stage",
        date: "VANSH 2K26"
    },
    {
        slug: "dance-solo",
        title: "Dance Solo",
        category: "Cultural",
        venue: "Main Stage",
        date: "VANSH 2K26"
    },
    {
        slug: "dance-group",
        title: "Dance Group",
        category: "Cultural",
        venue: "Main Stage",
        date: "VANSH 2K26"
    },
    {
        slug: "battle-of-bands",
        title: "Battle Of Bands",
        category: "Music",
        venue: "Main Stage",
        date: "VANSH 2K26"
    },
    {
        slug: "photography",
        title: "Photography",
        category: "Creative",
        venue: "Campus",
        date: "VANSH 2K26"
    },
    {
        slug: "short-film",
        title: "Short Film",
        category: "Creative",
        venue: "Screening Hall",
        date: "VANSH 2K26"
    },
    {
        slug: "game-zone",
        title: "Game Zone (BGMI & Free Fire)",
        category: "Gaming",
        venue: "Esports Arena",
        date: "VANSH 2K26"
    },
    {
        slug: "mun",
        title: "Model United Nations",
        category: "Academic",
        venue: "Seminar Hall",
        date: "VANSH 2K26"
    }
];

export const getCoordinatorEventBySlug = (slug: string) =>
    COORDINATOR_EVENTS.find((eventItem) => eventItem.slug === slug);
