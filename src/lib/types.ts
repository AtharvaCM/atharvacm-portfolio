export type ProjectCategory = "web" | "mobile" | "ai" | "branding" | "other";

export type ProjectMeta = {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  year: number;
  client?: string;
  role: string;
  services: string[];
  techStack: string[];
  category: ProjectCategory;
  duration?: string;
  outcomes: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
};

export type Project = ProjectMeta & {
  content: string;
};

export type BlogPostMeta = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  featured: boolean;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export type ContactFormInput = {
  name: string;
  email: string;
  opportunityType: string;
  companyContext: string;
  connectTimeline: string;
  message: string;
  website?: string;
};

export type ContactResponse =
  | { ok: true; submissionId: string }
  | { ok: false; error: string };
