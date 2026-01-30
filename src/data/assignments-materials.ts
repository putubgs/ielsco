// IELS Goals - Personalized Assignments & Materials System

export interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'reading' | 'writing' | 'speaking' | 'listening' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  dueInDays?: number;
  instructions: string[];
  submissionFormat: 'text' | 'file' | 'link' | 'recording';
  rubric: {
    criteria: string;
    points: number;
  }[];
  tags: string[];
}

export interface Material {
  id: string;
  title: string;
  type: 'article' | 'video' | 'podcast' | 'ebook' | 'worksheet' | 'guide';
  description: string;
  url?: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  isLocked: boolean; // For Pro content
}

// ============================================
// IELTS-FOCUSED ASSIGNMENTS
// ============================================

export const IELTS_ASSIGNMENTS: Assignment[] = [
  {
    id: 'ielts-write-1',
    title: 'IELTS Writing Task 1: Line Graph Analysis',
    description: 'Describe trends in UK tourism statistics (2015-2025)',
    type: 'writing',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    dueInDays: 3,
    instructions: [
      'Analyze the line graph showing tourist arrivals to the UK over 10 years',
      'Write a minimum of 150 words',
      'Use appropriate tenses (past for historical data, present perfect for recent trends)',
      'Include an overview paragraph summarizing the main trends',
      'Use linking words (however, moreover, in contrast)',
      'Spend no more than 20 minutes on this task'
    ],
    submissionFormat: 'file',
    rubric: [
      { criteria: 'Task Achievement (overview + key features)', points: 25 },
      { criteria: 'Coherence & Cohesion (logical flow)', points: 25 },
      { criteria: 'Lexical Resource (vocabulary range)', points: 25 },
      { criteria: 'Grammatical Range & Accuracy', points: 25 }
    ],
    tags: ['IELTS', 'Academic Writing', 'Data Description']
  },
  {
    id: 'ielts-write-2',
    title: 'IELTS Writing Task 2: Opinion Essay',
    description: 'Should governments invest more in public transportation?',
    type: 'writing',
    difficulty: 'intermediate',
    estimatedMinutes: 60,
    dueInDays: 5,
    instructions: [
      'Write at least 250 words presenting your opinion',
      'Include: Introduction, 2 body paragraphs, Conclusion',
      'Support arguments with relevant examples',
      'Use formal academic language',
      'Spend no more than 40 minutes on this task',
      'Proofread for grammar and spelling errors'
    ],
    submissionFormat: 'file',
    rubric: [
      { criteria: 'Task Response (clear position + development)', points: 25 },
      { criteria: 'Coherence & Cohesion (paragraph structure)', points: 25 },
      { criteria: 'Lexical Resource (topic-specific vocabulary)', points: 25 },
      { criteria: 'Grammatical Range & Accuracy', points: 25 }
    ],
    tags: ['IELTS', 'Opinion Essay', 'Academic Writing']
  },
  {
    id: 'ielts-speak-1',
    title: 'IELTS Speaking Part 2: Describe a Person',
    description: 'Record yourself describing someone who influenced you',
    type: 'speaking',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    dueInDays: 4,
    instructions: [
      'Prepare for 1 minute using the cue card',
      'Speak for 2 minutes without stopping',
      'Cover: Who they are, How you met them, What they did, Why they influenced you',
      'Use past tenses appropriately',
      'Practice pronunciation and fluency',
      'Record and submit your audio/video'
    ],
    submissionFormat: 'link',
    rubric: [
      { criteria: 'Fluency & Coherence (smooth delivery)', points: 25 },
      { criteria: 'Lexical Resource (vocabulary variety)', points: 25 },
      { criteria: 'Grammatical Range & Accuracy', points: 25 },
      { criteria: 'Pronunciation (clarity & intonation)', points: 25 }
    ],
    tags: ['IELTS', 'Speaking Practice', 'Monologue']
  },
  {
    id: 'ielts-read-1',
    title: 'IELTS Reading: Academic Passage Practice',
    description: 'Complete 3 passages with True/False/Not Given questions',
    type: 'reading',
    difficulty: 'intermediate',
    estimatedMinutes: 60,
    dueInDays: 2,
    instructions: [
      'Read 3 passages (approximately 900 words each)',
      'Answer 40 questions in 60 minutes',
      'Practice skimming and scanning techniques',
      'Underline keywords in questions before reading',
      'Manage time: 20 minutes per passage',
      'Submit your answer sheet'
    ],
    submissionFormat: 'file',
    rubric: [
      { criteria: 'Accuracy (correct answers)', points: 60 },
      { criteria: 'Time Management (completed within limit)', points: 20 },
      { criteria: 'Strategy Application (showed skimming/scanning)', points: 20 }
    ],
    tags: ['IELTS', 'Reading Comprehension', 'Time Management']
  },
  {
    id: 'ielts-listen-1',
    title: 'IELTS Listening: Note Completion Practice',
    description: 'Listen to academic lecture and complete notes',
    type: 'listening',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    dueInDays: 3,
    instructions: [
      'Listen to the audio ONCE (no replay during test)',
      'Complete the notes with NO MORE THAN THREE WORDS',
      'Check spelling carefully',
      'Practice predicting missing information before listening',
      'Transfer answers to answer sheet accurately'
    ],
    submissionFormat: 'file',
    rubric: [
      { criteria: 'Accuracy (correct answers)', points: 50 },
      { criteria: 'Spelling & Grammar (exact as heard)', points: 30 },
      { criteria: 'Following Instructions (word limit)', points: 20 }
    ],
    tags: ['IELTS', 'Listening Skills', 'Note-taking']
  }
];

// ============================================
// BUSINESS ENGLISH ASSIGNMENTS
// ============================================

export const BUSINESS_ASSIGNMENTS: Assignment[] = [
  {
    id: 'biz-email-1',
    title: 'Professional Email: Responding to Client Complaint',
    description: 'Write a professional apology and solution email',
    type: 'writing',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    dueInDays: 3,
    instructions: [
      'Read the complaint scenario provided',
      'Acknowledge the issue professionally',
      'Apologize sincerely without over-explaining',
      'Offer a concrete solution',
      'Maintain professional tone throughout',
      'Keep it concise (150-200 words)'
    ],
    submissionFormat: 'text',
    rubric: [
      { criteria: 'Professional Tone & Register', points: 30 },
      { criteria: 'Problem Recognition & Empathy', points: 25 },
      { criteria: 'Solution Clarity', points: 25 },
      { criteria: 'Grammar & Formatting', points: 20 }
    ],
    tags: ['Business English', 'Email Writing', 'Customer Service']
  },
  {
    id: 'biz-present-1',
    title: 'Elevator Pitch: Introduce Your Startup Idea',
    description: 'Record a 60-second pitch in English',
    type: 'speaking',
    difficulty: 'advanced',
    estimatedMinutes: 50,
    dueInDays: 5,
    instructions: [
      'Create a 60-second pitch for a product/service',
      'Include: Problem, Solution, Market, Unique Value',
      'Use confident, persuasive language',
      'Practice vocal variety (pace, tone, emphasis)',
      'Record yourself and submit video/audio link'
    ],
    submissionFormat: 'link',
    rubric: [
      { criteria: 'Content Structure (problem-solution)', points: 30 },
      { criteria: 'Persuasiveness & Confidence', points: 25 },
      { criteria: 'Language Accuracy', points: 20 },
      { criteria: 'Delivery (pace, clarity, engagement)', points: 25 }
    ],
    tags: ['Business English', 'Presentations', 'Public Speaking']
  },
  {
    id: 'biz-vocab-1',
    title: 'Business Vocabulary: Meeting Minutes Practice',
    description: 'Watch a meeting recording and write minutes',
    type: 'mixed',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    dueInDays: 4,
    instructions: [
      'Watch the 15-minute meeting recording',
      'Document: Attendees, Agenda, Decisions, Action Items',
      'Use formal business language',
      'Format: Professional meeting minutes template',
      'Identify and use at least 10 business collocations'
    ],
    submissionFormat: 'file',
    rubric: [
      { criteria: 'Accuracy (captured all key points)', points: 30 },
      { criteria: 'Professional Format & Structure', points: 25 },
      { criteria: 'Business Vocabulary Usage', points: 25 },
      { criteria: 'Grammar & Clarity', points: 20 }
    ],
    tags: ['Business English', 'Meetings', 'Professional Writing']
  }
];

// ============================================
// CONVERSATIONAL ENGLISH ASSIGNMENTS
// ============================================

export const CONVERSATION_ASSIGNMENTS: Assignment[] = [
  {
    id: 'conv-social-1',
    title: 'Small Talk Scenarios: Coffee Shop Conversation',
    description: 'Role-play ordering coffee and making small talk',
    type: 'speaking',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    dueInDays: 2,
    instructions: [
      'Find a study partner or record yourself playing both roles',
      'Scenario: Order coffee + chat with barista about weather/weekend',
      'Use natural expressions (How\'s it going?, What brings you here?)',
      'Practice polite intonation',
      'Aim for 3-5 minute conversation'
    ],
    submissionFormat: 'link',
    rubric: [
      { criteria: 'Natural Language Use (idioms, fillers)', points: 30 },
      { criteria: 'Fluency & Smoothness', points: 30 },
      { criteria: 'Appropriate Register (casual)', points: 20 },
      { criteria: 'Pronunciation & Intonation', points: 20 }
    ],
    tags: ['Conversation', 'Small Talk', 'Social English']
  },
  {
    id: 'conv-story-1',
    title: 'Personal Storytelling: My Best Travel Experience',
    description: 'Tell an engaging story about your travels',
    type: 'speaking',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    dueInDays: 4,
    instructions: [
      'Structure: Setting, Characters, Problem, Resolution',
      'Use past tenses naturally (simple, continuous, perfect)',
      'Include descriptive language for vividness',
      'Practice narrative pace (don\'t rush!)',
      'Record 3-4 minute story'
    ],
    submissionFormat: 'link',
    rubric: [
      { criteria: 'Story Structure & Engagement', points: 30 },
      { criteria: 'Descriptive Language & Vocabulary', points: 25 },
      { criteria: 'Grammar (past tenses)', points: 20 },
      { criteria: 'Delivery & Expression', points: 25 }
    ],
    tags: ['Conversation', 'Storytelling', 'Fluency']
  }
];

// ============================================
// MATERIALS LIBRARY
// ============================================

export const IELTS_MATERIALS: Material[] = [
  {
    id: 'mat-ielts-1',
    title: 'IELTS Writing Task 1 Complete Guide',
    type: 'guide',
    description: 'Comprehensive guide covering all graph types with sample answers',
    url: '/materials/ielts-writing-task1-guide.pdf',
    difficulty: 'intermediate',
    category: 'IELTS Writing',
    tags: ['IELTS', 'Writing', 'Task 1', 'Graphs'],
    isLocked: false
  },
  {
    id: 'mat-ielts-2',
    title: 'Simon\'s IELTS Speaking Part 2 Ideas',
    type: 'ebook',
    description: '100+ sample answers for common topics with vocabulary lists',
    url: '/materials/ielts-speaking-ideas.pdf',
    difficulty: 'intermediate',
    category: 'IELTS Speaking',
    tags: ['IELTS', 'Speaking', 'Part 2', 'Ideas'],
    isLocked: false
  },
  {
    id: 'mat-ielts-3',
    title: 'Academic Vocabulary Masterclass (Video Series)',
    type: 'video',
    description: '12-part series on advanced vocabulary for IELTS 7.0+',
    url: 'https://youtube.com/playlist/...',
    duration: '6 hours',
    difficulty: 'advanced',
    category: 'Vocabulary',
    tags: ['IELTS', 'Vocabulary', 'Academic English'],
    isLocked: true // Pro only
  },
  {
    id: 'mat-ielts-4',
    title: 'IELTS Listening Practice Tests (Cambridge 18)',
    type: 'worksheet',
    description: '4 full practice tests with answer keys and audio',
    url: '/materials/cambridge-18-listening.zip',
    difficulty: 'intermediate',
    category: 'IELTS Listening',
    tags: ['IELTS', 'Listening', 'Practice Tests'],
    isLocked: false
  },
  {
    id: 'mat-ielts-5',
    title: 'Common IELTS Grammar Mistakes (and How to Fix Them)',
    type: 'article',
    description: 'Analysis of top 20 grammar errors in IELTS writing with exercises',
    url: '/materials/ielts-grammar-mistakes.pdf',
    difficulty: 'intermediate',
    category: 'Grammar',
    tags: ['IELTS', 'Grammar', 'Writing', 'Common Mistakes'],
    isLocked: false
  }
];

export const BUSINESS_MATERIALS: Material[] = [
  {
    id: 'mat-biz-1',
    title: 'Business Email Templates Library',
    type: 'guide',
    description: '50+ templates for common business scenarios',
    url: '/materials/business-email-templates.pdf',
    difficulty: 'intermediate',
    category: 'Business Writing',
    tags: ['Business English', 'Emails', 'Templates'],
    isLocked: false
  },
  {
    id: 'mat-biz-2',
    title: 'Negotiation English Podcast Series',
    type: 'podcast',
    description: 'Real negotiation scenarios with native speakers',
    url: 'https://podcast.com/negotiation-english',
    duration: '10 episodes × 30 mins',
    difficulty: 'advanced',
    category: 'Business Communication',
    tags: ['Business English', 'Negotiation', 'Podcast'],
    isLocked: true
  },
  {
    id: 'mat-biz-3',
    title: 'Presentation Skills Masterclass',
    type: 'video',
    description: 'Learn to structure and deliver confident presentations',
    url: '/materials/presentation-skills.mp4',
    duration: '2.5 hours',
    difficulty: 'intermediate',
    category: 'Presentations',
    tags: ['Business English', 'Presentations', 'Public Speaking'],
    isLocked: false
  }
];

export const CONVERSATION_MATERIALS: Material[] = [
  {
    id: 'mat-conv-1',
    title: '100 Common Idioms in Everyday English',
    type: 'ebook',
    description: 'Illustrated guide with context and examples',
    url: '/materials/common-idioms.pdf',
    difficulty: 'intermediate',
    category: 'Vocabulary',
    tags: ['Conversation', 'Idioms', 'Expressions'],
    isLocked: false
  },
  {
    id: 'mat-conv-2',
    title: 'Netflix & Learn: English Through Series',
    type: 'guide',
    description: 'How to improve English by watching TV shows strategically',
    url: '/materials/netflix-learning-guide.pdf',
    difficulty: 'beginner',
    category: 'Self-Study',
    tags: ['Conversation', 'Listening', 'Entertainment'],
    isLocked: false
  },
  {
    id: 'mat-conv-3',
    title: 'Pronunciation Drills: American vs British',
    type: 'video',
    description: 'Side-by-side comparison of 200 common words',
    url: '/materials/pronunciation-drills.mp4',
    duration: '1.5 hours',
    difficulty: 'beginner',
    category: 'Pronunciation',
    tags: ['Pronunciation', 'Accent', 'Listening'],
    isLocked: true
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get personalized assignments based on goal objective
 */
export function getPersonalizedAssignments(objective: string, limit: number = 5): Assignment[] {
  const objectiveLower = objective.toLowerCase();
  
  if (objectiveLower.includes('ielts') || objectiveLower.includes('toefl')) {
    return IELTS_ASSIGNMENTS.slice(0, limit);
  } else if (objectiveLower.includes('job') || objectiveLower.includes('work') || objectiveLower.includes('business')) {
    return BUSINESS_ASSIGNMENTS.slice(0, limit);
  } else {
    return CONVERSATION_ASSIGNMENTS.slice(0, limit);
  }
}

/**
 * Get personalized materials based on goal objective
 */
export function getPersonalizedMaterials(objective: string, userTier: 'basic' | 'pro' = 'basic'): Material[] {
  const objectiveLower = objective.toLowerCase();
  let materials: Material[] = [];
  
  if (objectiveLower.includes('ielts') || objectiveLower.includes('toefl')) {
    materials = IELTS_MATERIALS;
  } else if (objectiveLower.includes('job') || objectiveLower.includes('work') || objectiveLower.includes('business')) {
    materials = BUSINESS_MATERIALS;
  } else {
    materials = CONVERSATION_MATERIALS;
  }
  
  // Filter out locked materials for Basic users
  if (userTier === 'basic') {
    return materials.filter(m => !m.isLocked);
  }
  
  return materials;
}