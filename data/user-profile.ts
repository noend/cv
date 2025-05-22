import { LanguageProficiency, UserProfile } from "@/types/profile";

export const userProfile: UserProfile = {
  name: "Preslav Panayotov",
  title: "Software Delivery Manager",
  location: "Sofia, Sofia City, Bulgaria",
  profileImageUrl:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1516874128583.jpg-JojP3apvxPBlqKPnuVkdWOZUuhfvnW.jpeg",
  summary:
    "Software Delivery Manager with over years of experience in software engineering and team management. Expertise in Software Development, and Process Improvement ensures seamless delivery and high-performance outcomes.",
  email: "preslav.panayotov@gmail.com",
  linkedin: "www.linkedin.com/in/preslav-panayotov",
  languages: [
    {
      name: "Bulgarian",
      proficiency: LanguageProficiency.Native
    },
    {
      name: "English",
      proficiency: LanguageProficiency.Professional
    }
  ],
  education: [
    {
      institution: "Sofia University St. Kliment Ohridski",
      degree: "Bachelor's degree",
      field: "Mathematics and Computer Science",
      dateRange: "2010 - 2013"
    }
  ],
  certifications: [
    {
      name: "Security Awareness Essentials"
    },
    {
      name: "Business English"
    },
    {
      name: "Shaping up with Angular.js"
    }
  ]
};
