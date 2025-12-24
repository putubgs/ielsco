
// /lib/resources.ts

export type ResourceType = "E-Book" | "Template" | "Audio" | "Guide";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  thumbnail?: string;
  tags?: string[];
}

export const CATEGORIES: (ResourceType | "All")[] = [
  "All",
  "E-Book",
  "Template",
  "Audio",
  "Guide",
];

export const PAGE_SIZE = 6;

export const RESOURCES: Resource[] = [
  {
    id: "r1",
    title: "IELTS Speaking Cue Card Pack",
    description:
      "50+ real speaking cue cards with model answers and topic prompts.",
    type: "E-Book",
    url: "/docs/ielts-speaking-cards.pdf",
    thumbnail: "/images/resources/ielts_speaking.png",
    tags: ["IELTS", "Speaking"],
  },
  {
    id: "r2",
    title: "Academic Essay Structure Template",
    description:
      "Step-by-step template for clear academic essays (Google Doc).",
    type: "Template",
    url: "https://docs.google.com/",
    thumbnail: "/images/resources/essay_template.png",
    tags: ["Essay", "Academic"],
  },
  {
    id: "r3",
    title: "English Grammar Essentials",
    description: "40-page grammar reference from A1 to C1.",
    type: "E-Book",
    url: "/docs/grammar-essentials.pdf",
    thumbnail: "/images/resources/grammar_book.png",
    tags: ["Grammar"],
  },
  {
    id: "r4",
    title: "Listening Mini Test Series",
    description: "Audio test simulations with transcripts and answers.",
    type: "Audio",
    url: "/resources/listening-series",
    thumbnail: "/images/resources/listening.png",
    tags: ["Listening", "Test"],
  },
  {
    id: "r5",
    title: "Scholarship CV Template",
    description: "Editable CV template for scholarship applications.",
    type: "Template",
    url: "/docs/scholarship-cv-template.docx",
    thumbnail: "/images/resources/cv_template.png",
    tags: ["CV", "Scholarship"],
  },
  {
    id: "r6",
    title: "Professional Email Writing Guide",
    description: "20 ready-to-use formal email templates.",
    type: "Guide",
    url: "/docs/email-guide.pdf",
    thumbnail: "/images/resources/email_guide.png",
    tags: ["Email", "Professional"],
  },
];