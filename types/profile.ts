export enum LanguageProficiency {
  Native = "Native",
  Fluent = "Fluent",
  Professional = "Professional",
  Intermediate = "Intermediate",
  Elementary = "Elementary",
  Beginner = "Beginner"
}

/**
 * Interface for user profile based on current CV layout
 */
export interface UserProfile {
  phone: string;
  linkedin: string;
  email: string;
  name: string;
  title: string;
  location: string;
  profileImageUrl: string;
  summary: string;
  languages: Array<{
    name: string;
    proficiency: LanguageProficiency;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    dateRange: string;
  }>;
  certifications: Array<{
    name: string;
    issuer?: string;
    date?: string;
  }>;
}
