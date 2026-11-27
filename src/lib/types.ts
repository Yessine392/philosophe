export type EraId =
  | "antiquite"
  | "medieval"
  | "renaissance"
  | "lumieres"
  | "xixe"
  | "contemporain";

export type TraditionId = "occident" | "orient" | "islam" | "afrique";

export interface Era {
  id: EraId;
  name: string;
  range: string;
  description: string;
  hue: number;
}

export interface Tradition {
  id: TraditionId;
  name: string;
}

export interface Philosopher {
  slug: string;
  name: string;
  /** Années affichées, ex. « 469 – 399 av. J.-C. » */
  dates: string;
  /** Année de naissance (négative avant J.-C.), pour trier la frise. */
  born: number;
  era: EraId;
  tradition: TraditionId;
  place: string;
  school: string;
  tagline: string;
  bio: string;
  ideas: string[];
  works: string[];
  quotes: string[];
  concepts: string[];
  /** Comment la personne parle : ton, méthode, manies. Sert au persona. */
  voice: string;
  starters: string[];
  hue: number;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Lesson {
  slug: string;
  title: string;
  minutes: number;
  philosophers: string[];
  intro: string;
  sections: { title: string; body: string }[];
  keyIdeas: string[];
  meditation: string;
  quiz: QuizQuestion[];
}

export interface Path {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  hue: number;
  icon: string;
  lessons: Lesson[];
}

export interface Concept {
  slug: string;
  name: string;
  short: string;
  body: string;
  philosophers: string[];
  related: string[];
}
