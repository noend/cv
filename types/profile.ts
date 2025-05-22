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
