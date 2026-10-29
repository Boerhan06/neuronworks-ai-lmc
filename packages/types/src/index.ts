/**
 * Core Domain Types for AI Learning Management & Creator (AI-LMC) Enterprise
 * Adheres strictly to docs/PRD.md and docs/decisions.md specifications.
 */

// ---------------------------------------------------------------------------
// 1. Roles & Permissions (Divisional RBAC)
// ---------------------------------------------------------------------------
export type Role =
  | "SUPER_ADMIN"
  | "LND_CREATOR"
  | "SME_REVIEWER"
  | "DIVISION_MANAGER"
  | "LEARNER";

export interface Division {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  divisionId: string;
  division?: Division;
  avatarUrl?: string;
  authProvider: "local" | "google" | "azure_ad" | "keycloak";
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// 2. Documents & Knowledge Ingestion (Layer 5)
// ---------------------------------------------------------------------------
export type DocumentFormat = "pdf" | "docx" | "pptx";

export type DocumentStatus =
  | "UPLOADED"
  | "PARSING"
  | "EXTRACTED"
  | "INDEXED"
  | "FAILED";

export interface DocumentSource {
  id: string;
  divisionId: string;
  uploadedByUserId: string;
  title: string;
  originalFileName: string;
  fileSizeBytes: number;
  pageCount: number;
  fileFormat: DocumentFormat;
  s3Key: string;
  status: DocumentStatus;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  pageNumber: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// 3. AI Orchestration, Pipeline & SME Review (Layer 3)
// ---------------------------------------------------------------------------
export type PipelineStage =
  | "INGEST"
  | "UNDERSTAND"
  | "OUTLINE"
  | "SCRIPT"
  | "STORYBOARD"
  | "VOICE"
  | "VISUAL"
  | "COMPOSE";

export type ModuleApprovalStatus =
  | "DRAFT"
  | "REVIEW_PENDING"
  | "APPROVED"
  | "REJECTED"
  | "RENDERING"
  | "PUBLISHED";

export interface SceneCitation {
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  paragraphNumber?: number;
  quoteSnippet: string;
}

export interface Scene {
  id: string;
  moduleId: string;
  sceneIndex: number; // 1 to 5 for Strict 3-Minute Micro-Module
  title: string;
  narrationText: string;
  estimatedDurationSeconds: number;
  citation: SceneCitation;
  visualPrompt: string;
  avatarPresenterId: string;
  avatarLayout: "FULL" | "PICTURE_IN_PICTURE" | "SPLIT_SCREEN";
  audioUrl?: string;
  videoClipUrl?: string;
  confidenceScore: number; // 0.00 to 1.00
  createdAt: string;
  updatedAt: string;
}

export interface SMEReview {
  id: string;
  moduleId: string;
  reviewerUserId: string;
  status: ModuleApprovalStatus;
  notes?: string;
  approvedAt?: string;
}

// ---------------------------------------------------------------------------
// 4. LMS Core Courses, Modules & Auto-Quiz (Layer 2)
// ---------------------------------------------------------------------------
export interface Course {
  id: string;
  divisionId: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  isPublished: boolean;
  totalDurationSeconds: number;
  createdAt: string;
  updatedAt: string;
  modules?: CourseModule[];
}

export interface CourseModule {
  id: string;
  courseId: string;
  documentSourceId: string;
  title: string;
  orderIndex: number;
  status: ModuleApprovalStatus;
  videoMasterUrl?: string;
  subtitleVttUrl?: string;
  durationSeconds: number; // exactly 180s for Strict Micro-Module
  scenes?: Scene[];
  quiz?: Quiz;
  createdAt: string;
  updatedAt: string;
}

export interface QuizOption {
  id: string;
  optionKey: "A" | "B" | "C" | "D";
  text: string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  questionNumber: number;
  questionText: string;
  options: QuizOption[];
  correctOptionKey: "A" | "B" | "C" | "D";
  explanation: string;
  referencedTimestampSeconds: number; // Video timestamp anchor
  sourcePageNumber: number;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  passingScorePercentage: number; // Default 80% per decisions.md
  maxRetakesAllowed: number; // Default 3 per decisions.md
  questions?: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  attemptNumber: number;
  scorePercentage: number;
  passed: boolean;
  answers: { questionId: string; selectedOptionKey: string }[];
  completedAt: string;
}

// ---------------------------------------------------------------------------
// 5. xAPI Activity & Learning Record Store (LRS)
// ---------------------------------------------------------------------------
export type XAPIVerb =
  | "experienced"
  | "watched"
  | "interacted"
  | "answered"
  | "passed"
  | "failed"
  | "completed";

export interface XAPIStatement {
  id: string;
  actor: {
    mbox: string;
    name: string;
    divisionId: string;
  };
  verb: {
    id: string;
    display: { "en-US": XAPIVerb; "id-ID": string };
  };
  object: {
    id: string;
    definition: {
      name: { "id-ID": string };
      description?: { "id-ID": string };
      type: string;
    };
  };
  result?: {
    score?: { scaled: number; raw: number; min: number; max: number };
    success?: boolean;
    completion?: boolean;
    duration?: string; // ISO 8601 duration e.g. PT180S
    extensions?: Record<string, unknown>;
  };
  context?: {
    registration?: string;
    contextActivities?: {
      category?: { id: string }[];
      parent?: { id: string }[];
    };
    extensions?: {
      divisionId?: string;
      sceneIndex?: number;
      dropOffTimestamp?: number;
    };
  };
  timestamp: string;
}

// ---------------------------------------------------------------------------
// 6. Analytics & Skill Gap (Closed Loop)
// ---------------------------------------------------------------------------
export interface DivisionComplianceStat {
  divisionId: string;
  divisionName: string;
  totalEnrolled: number;
  completedCount: number;
  complianceRatePercentage: number;
  averageScorePercentage: number;
}

export interface VideoDropOffStat {
  moduleId: string;
  sceneIndex: number;
  secondMarker: number;
  viewerCount: number;
  dropOffRatePercentage: number;
}

export interface SkillGapItem {
  id: string;
  divisionId: string;
  competencyName: string;
  targetLevel: number;
  currentAverageLevel: number;
  gapPercentage: number;
  affectedLearnerCount: number;
  recommendedAction: string;
}

