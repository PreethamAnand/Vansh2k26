export interface EventPrize {
  position: string;
  label: string;
  amount: string;
}

export interface EventData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  venue: string;
  date: string;
  teamSize: string;
  registrationFee: string;
  description: string;
  longDescription: string;
  accent: string;      // hex color
  accentDim: string;   // muted hex
  glow: string;        // rgba for box-shadow / orbs
  gradient: string;    // CSS gradient string for hero
  rules: string[];
  eligibility: string[];
  prizes: EventPrize[];
  tags: string[];
  coordinator: string;
  coordinatorPhone: string;
}

export const EVENTS_DATA: EventData[] = [
  /* ─────────────────────────────────────────────── 1. SINGING ── */
  {
    slug: "singing",
    title: "Singing",
    subtitle: "Where Silence Becomes Sound",
    category: "Cultural",
    venue: "Main Stage",
    date: "VANSH 2K26",
    teamSize: "Solo",
    registrationFee: "₹100",
    description:
      "The stage is yours and the mic is live — own every note. VANSH 2K26's Singing Competition is a celebration of raw vocal talent across every genre and language.",
    longDescription:
      "Step into the spotlight and command the room with nothing but your voice and soul. Whether you pour emotion into a melancholic ballad, ignite the crowd with a high-energy number, or stun the judges with classical mastery — the Main Stage of VANSH 2K26 is where legends are born. This is your arena.",
    accent: "#F59E0B",
    accentDim: "#92400E",
    glow: "rgba(245,158,11,0.22)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.18) 0%, transparent 70%)",
    rules: [
      "Performance duration must be strictly between 3 and 5 minutes.",
      "Backing tracks (karaoke) are permitted; live instruments are also welcome.",
      "Lyrics must be audience-appropriate — explicit content is strictly prohibited.",
      "Participants must report backstage at least 30 minutes prior to their assigned slot.",
      "Costume changes mid-performance are not allowed.",
      "Mobile devices and props that obstruct the stage are not permitted.",
      "The judges' decision is final and no appeals will be entertained.",
    ],
    eligibility: [
      "Open to all currently enrolled college / university students.",
      "Valid student ID card must be presented at check-in.",
      "Each individual may register for only one solo singing slot.",
      "Prior online registration and payment confirmation is mandatory.",
    ],
    prizes: [
      { position: "1st", label: "Gold", amount: "₹5,000" },
      { position: "2nd", label: "Silver", amount: "₹3,000" },
      { position: "3rd", label: "Bronze", amount: "₹1,500" },
    ],
    tags: ["Solo", "3–5 Min", "Any Genre", "Any Language"],
    coordinator: "K. Sai Lalitya",
    coordinatorPhone: "8374749942",
  },

  /* ─────────────────────────────────────────────── 2. DANCE SOLO ── */
  {
    slug: "dance-solo",
    title: "Dance Solo",
    subtitle: "One Body. One Beat. Infinite Power.",
    category: "Cultural",
    venue: "Main Stage",
    date: "VANSH 2K26",
    teamSize: "Solo",
    registrationFee: "₹100",
    description:
      "Just you and the floor — no safety net, no backup. Solo dance at VANSH 2K26 is raw expression at its purest, where every move is amplified by presence.",
    longDescription:
      "Solo dance demands everything: technique, artistry, stamina, and the ability to hold an entire crowd spellbound alone. From contemporary fusion to classical Bharatanatyam, from hip-hop to freestyle — if it moves the soul, it has a place on our stage. Bring your story. Let your body tell it.",
    accent: "#EC4899",
    accentDim: "#831843",
    glow: "rgba(236,72,153,0.22)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236,72,153,0.18) 0%, transparent 70%)",
    rules: [
      "Performance must be between 3 and 5 minutes in duration.",
      "Any dance form is eligible — classical, folk, western, freestyle, fusion, etc.",
      "Pre-recorded music tracks must be submitted 30 minutes before the event starts.",
      "Props are allowed but must be set up and cleared within the allotted performance time.",
      "Costume must be appropriate and not impede safe movement.",
      "Live accompaniment (tabla, mridangam, etc.) may be requested in advance.",
      "Lip-syncing or vocal performance during the dance is not permitted.",
    ],
    eligibility: [
      "Open to all currently enrolled college / university students.",
      "Each participant may register for Solo Dance or Group Dance — not both.",
      "Valid student ID required at event check-in.",
      "Advance registration and fee payment is mandatory.",
    ],
    prizes: [
      { position: "1st", label: "Gold", amount: "₹5,000" },
      { position: "2nd", label: "Silver", amount: "₹3,000" },
      { position: "3rd", label: "Bronze", amount: "₹1,500" },
    ],
    tags: ["Solo", "3–5 Min", "Any Style", "Props OK"],
    coordinator: "K. Sai Lalitya",
    coordinatorPhone: "8374749942",
  },

  /* ─────────────────────────────────────────────── 3. DANCE GROUP ── */
  {
    slug: "dance-group",
    title: "Dance Group",
    subtitle: "Unified Motion. Explosive Energy.",
    category: "Cultural",
    venue: "Main Stage",
    date: "VANSH 2K26",
    teamSize: "5–15 Members",
    registrationFee: "₹500 / Team",
    description:
      "When dancers become one organism — that's group dance. Synchronised, fierce, and spectacular. Bring your crew and set the stage ablaze at VANSH 2K26.",
    longDescription:
      "Group dance is the ultimate test of coordination, creativity, and collective energy. It's not just about individual skill — it's about how effortlessly a team breathes, moves, and communicates as one. From intricately choreographed classical ensembles to high-octane contemporary group acts, the Main Stage is ready for your masterpiece.",
    accent: "#A855F7",
    accentDim: "#581C87",
    glow: "rgba(168,85,247,0.22)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(168,85,247,0.2) 0%, transparent 70%)",
    rules: [
      "Minimum 5 and maximum 15 members per team.",
      "Performance duration: 5–8 minutes including entry and exit.",
      "Any dance form is permitted — classical, contemporary, folk or fusion.",
      "Music must be submitted to the stage manager at least 1 hour before the event.",
      "Props and set pieces are allowed but must not damage the stage or floor.",
      "All team members must be registered individually under the team entry.",
      "Costumes must be uniform in theme and appropriate for a public audience.",
    ],
    eligibility: [
      "Open to all currently enrolled college / university students.",
      "All team members must be from the same academic institution.",
      "Team leader must carry IDs of all participating members.",
      "Prior registration and full fee payment required before the event.",
    ],
    prizes: [
      { position: "1st", label: "Gold", amount: "₹10,000" },
      { position: "2nd", label: "Silver", amount: "₹6,000" },
      { position: "3rd", label: "Bronze", amount: "₹3,000" },
    ],
    tags: ["5–15 Members", "5–8 Min", "Any Style", "Same College"],
    coordinator: "J. Bhavani",
    coordinatorPhone: "7013159259",
  },

  /* ─────────────────────────────────────────────── 4. BATTLE OF BANDS ── */
  {
    slug: "battle-of-bands",
    title: "Battle of Bands",
    subtitle: "Turn Up the Amplifiers. Let Blood Run.",
    category: "Music",
    venue: "Main Stage",
    date: "VANSH 2K26",
    teamSize: "3–8 Members",
    registrationFee: "₹600 / Band",
    description:
      "The ultimate battle for sonic supremacy. Bands clash on VANSH's most electrifying stage — only the most alive band walks away with the trophy.",
    longDescription:
      "Battle of Bands is where raw musical power collides with showmanship and originality. Bring your full band, plug in, and deliver a set that makes the walls shake. From indie alt-rock to progressive metal, fusion to pop — every genre gets its moment under the floodlights. The crowd is the jury, and the stage is the court.",
    accent: "#EF4444",
    accentDim: "#7F1D1D",
    glow: "rgba(239,68,68,0.22)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(239,68,68,0.2) 0%, transparent 70%)",
    rules: [
      "Band size: minimum 3, maximum 8 members.",
      "Performance set: 12–20 minutes (strictly enforced).",
      "At least one original composition is required in the set.",
      "All instruments must be live — no fully pre-recorded instrumental backing.",
      "Venue provides a standard PA system, drum kit, and monitor mix. Bring your own guitars, basses, and keyboards.",
      "Soundcheck slots will be allocated 2 hours before the event on a first-registered basis.",
      "Pyrotechnics, open fire, or hazardous stage effects are strictly prohibited.",
    ],
    eligibility: [
      "Open to all currently enrolled college / university students.",
      "All band members must be from the same academic institution.",
      "Valid ID for every member must be presented at registration desk.",
      "Full band registration and fee payment required at least 48 hours before the event.",
    ],
    prizes: [
      { position: "1st", label: "Gold", amount: "₹15,000" },
      { position: "2nd", label: "Silver", amount: "₹8,000" },
      { position: "3rd", label: "Bronze", amount: "₹4,000" },
    ],
    tags: ["3–8 Members", "12–20 Min", "Live Instruments", "1 Original"],
    coordinator: "K. Manjunadha Reddy",
    coordinatorPhone: "9177639022",
  },

  /* ─────────────────────────────────────────────── 5. PHOTOGRAPHY ── */
  {
    slug: "photography",
    title: "Photography",
    subtitle: "One Frame. One Story. One Shot.",
    category: "Creative",
    venue: "Campus",
    date: "VANSH 2K26",
    teamSize: "Solo",
    registrationFee: "₹100",
    description:
      "The theme is revealed on the day. Your camera is loaded. The campus is your canvas. You have limited time — make every click count at VANSH 2K26.",
    longDescription:
      "On-spot photography at VANSH 2K26 is a test of artistic instinct under pressure. When the theme drops, you have a set window to wander the campus and hunt for the perfect frame. Composition, lighting, timing, and storytelling — all judged against a theme you'll only know when the clock starts. Are you ready to shoot?",
    accent: "#06B6D4",
    accentDim: "#164E63",
    glow: "rgba(6,182,212,0.22)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.18) 0%, transparent 70%)",
    rules: [
      "This is an on-the-spot event — the theme will be announced only at the start.",
      "Participants will have 3 hours to capture photos across the campus.",
      "Submit exactly 3 final photographs at the end of the allotted time.",
      "Permitted devices: DSLR, mirrorless cameras, and modern smartphones.",
      "Photos must be original and taken on the event day — stock images are disqualified.",
      "Basic post-processing (color grade, crop, contrast) is allowed; heavy compositing or AI generation is not.",
      "All submissions must be in JPG format, minimum 2 MP resolution.",
    ],
    eligibility: [
      "Open to all currently enrolled college / university students.",
      "Participants must bring their own camera device — no rentals provided.",
      "Each participant may submit only one entry (3 photos as a set).",
      "Prior online registration and fee payment is mandatory.",
    ],
    prizes: [
      { position: "1st", label: "Gold", amount: "₹4,000" },
      { position: "2nd", label: "Silver", amount: "₹2,500" },
      { position: "3rd", label: "Bronze", amount: "₹1,000" },
    ],
    tags: ["Solo", "On-Spot Theme", "3 Hours", "Submit 3 Shots"],
    coordinator: "M. Dheeraj",
    coordinatorPhone: "9848981465",
  },

  /* ─────────────────────────────────────────────── 6. SHORT FILM ── */
  {
    slug: "short-film",
    title: "Short Film",
    subtitle: "Compress a Universe Into Minutes.",
    category: "Creative",
    venue: "Screening Hall",
    date: "VANSH 2K26",
    teamSize: "1–5 Members",
    registrationFee: "₹200 / Team",
    description:
      "A curated screening event for student filmmakers. Pre-submitted films will be projected and evaluated by a panel of industry professionals at VANSH 2K26.",
    longDescription:
      "Great stories don't need two hours — the best ones leave you breathless in five minutes. Short Film at VANSH 2K26 is a celebration of student cinema: writing, direction, cinematography, sound design, and editing all distilled into a tight runtime. Submit your work before the deadline and see it on the big screen.",
    accent: "#6366F1",
    accentDim: "#312E81",
    glow: "rgba(99,102,241,0.22)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.2) 0%, transparent 70%)",
    rules: [
      "Film duration: 3–10 minutes (including credits).",
      "Films must be submitted at least 5 days before the event date via the designated portal.",
      "Content must be original — no plagiarism, no copyrighted third-party material without licenses.",
      "Any language is permitted, provided English or Telugu subtitles are embedded.",
      "Profanity, graphic violence, or sexually explicit content is strictly prohibited.",
      "Genre is open: drama, documentary, animation, comedy, thriller, etc.",
      "Teams may have 1 credited director; additional crew members may be acknowledged in credits.",
    ],
    eligibility: [
      "Open to all currently enrolled college / university students.",
      "Team size: 1 to 5 members (all must be students).",
      "Submission portal deadline must be met — late entries will not be screened.",
      "Prior registration and fee payment required before submission is accepted.",
    ],
    prizes: [
      { position: "1st", label: "Gold", amount: "₹7,000" },
      { position: "2nd", label: "Silver", amount: "₹4,000" },
      { position: "3rd", label: "Bronze", amount: "₹2,000" },
    ],
    tags: ["1–5 Members", "3–10 Min Film", "Pre-Submission", "Any Genre"],
    coordinator: "B. Iswaryya",
    coordinatorPhone: "9110546818",
  },

  /* ─────────────────────────────────────────────── 7. GAME ZONE ── */
  {
    slug: "game-zone",
    title: "Game Zone",
    subtitle: "BGMI & Free Fire. Last Squad Standing.",
    category: "Gaming",
    venue: "Esports Arena",
    date: "VANSH 2K26",
    teamSize: "4 Members / Squad",
    registrationFee: "₹200 / Squad",
    description:
      "Two games, two battlefields, one champion squad. BGMI and Free Fire tournaments run simultaneously at VANSH 2K26's dedicated Esports Arena.",
    longDescription:
      "The Esports Arena comes alive with back-to-back squad battles in BGMI and Free Fire. Tactical play, split-second decisions, and squad synergy — it all counts. Register your squad, choose your game, and push for that Chicken Dinner. Seeding rounds, quarterfinals, semis, and a Grand Final: only the best survive.",
    accent: "#22C55E",
    accentDim: "#14532D",
    glow: "rgba(34,197,94,0.22)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.18) 0%, transparent 70%)",
    rules: [
      "Squad size: exactly 4 members per squad.",
      "Squads must register for either BGMI or Free Fire — not both under one entry.",
      "Each squad member must bring their own device (mobile/tablet).",
      "Hacking, modding, emulators, or any third-party software is grounds for instant disqualification.",
      "Tournament format: classic squad matches — highest aggregate points across rounds advances.",
      "In-game audio: earphones/headphones allowed; external speakers or audio feed-through prohibited.",
      "Any technical issues on a player's personal device will not pause or delay the match.",
    ],
    eligibility: [
      "Open to all currently enrolled college / university students.",
      "All squad members must be from the same academic institution.",
      "Each participant may compete in only one squad.",
      "Valid student ID required; all registrations and payments must be completed online.",
    ],
    prizes: [
      { position: "1st", label: "Gold", amount: "₹5,000" },
      { position: "2nd", label: "Silver", amount: "₹3,000" },
      { position: "3rd", label: "Bronze", amount: "₹1,500" },
    ],
    tags: ["Squad of 4", "BGMI", "Free Fire", "Esports Arena"],
    coordinator: "Srikanth Reddy",
    coordinatorPhone: "7382020763",
  },

  /* ─────────────────────────────────────────────── 8. MUN ── */
  {
    slug: "mun",
    title: "Model United Nations",
    subtitle: "Debate. Resolve. Lead the World.",
    category: "Academic",
    venue: "Seminar Hall",
    date: "VANSH 2K26",
    teamSize: "Solo Delegate",
    registrationFee: "₹150",
    description:
      "Assume the identity of a world leader, represent a nation, and steer global policy debates through diplomacy, strategy, and rhetoric at VANSH 2K26 MUN.",
    longDescription:
      "Model United Nations challenges delegates to research complex geopolitical agendas, draft position papers, build alliances, and negotiate resolutions under the pressure of formal parliamentary procedure. At VANSH 2K26's MUN, committees span pressing international issues — from climate finance to cyber warfare. This is where future leaders sharpen their edge.",
    accent: "#38BDF8",
    accentDim: "#0C4A6E",
    glow: "rgba(56,189,248,0.22)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.18) 0%, transparent 70%)",
    rules: [
      "All delegates must submit a Position Paper before the stated deadline.",
      "MUN procedure follows standard Rules of Procedure (RoP) — delegates must adhere strictly.",
      "Formal English must be used in all committee sessions and submitted documents.",
      "Electronic devices are not permitted during formal sessions unless authorised by the Chair.",
      "Bloc negotiation, lobbying, and placard usage must follow Committee Chair guidelines.",
      "Any delegate found misrepresenting bloc positions or disrupting order will be expelled.",
      "The dais decisions on all procedural and substantive matters are final.",
    ],
    eligibility: [
      "Open to all currently enrolled college / university students.",
      "No prior MUN experience is required, but basic understanding of RoP is strongly recommended.",
      "Each delegate represents a single assigned country in their designated committee.",
      "Position paper submission and registration payment must be completed before the cutoff.",
    ],
    prizes: [
      { position: "Best Delegate", label: "Top Award", amount: "Plaque + Certificate" },
      { position: "High Commendation", label: "Runner-Up", amount: "Certificate" },
      { position: "Verbal Mention", label: "Honourable", amount: "Certificate" },
    ],
    tags: ["Solo Delegate", "2-Day Event", "Position Paper", "Formal English"],
    coordinator: "MUN Committee",
    coordinatorPhone: "Contact Admin",
  },
];

export function getEventBySlug(slug: string): EventData | undefined {
  return EVENTS_DATA.find((e) => e.slug === slug);
}

export function getAllEventSlugs(): string[] {
  return EVENTS_DATA.map((e) => e.slug);
}
