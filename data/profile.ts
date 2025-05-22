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

export const profileData: ProfileData = {
  "name": "Your Name",
  "title": "Your Title",
  "location": "Your Location",
  "email": "your.email@example.com",
  "about": "Write a brief description about yourself, your experience, and your professional interests.",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "twitter": "https://twitter.com/yourhandle"
  }
};
