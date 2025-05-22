export interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  about: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    other?: string;
  };
}

/**
 * Interface for user profile based on current CV layout
 */
export interface UserProfile {
  name: string;
  title: string;
  location: string;
  profileImageUrl: string;
  summary: string;
}
