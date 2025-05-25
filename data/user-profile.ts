import { LanguageProficiency, UserProfile } from "@/types/profile";

export const userProfile: UserProfile = {
  name: "Preslav Panayotov",
  title: "Software Delivery Manager",
  phone: "+359 883 41 44 99",
  location: "Sofia, Sofia City, Bulgaria",
  profileImageUrl:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1516874128583.jpg-JojP3apvxPBlqKPnuVkdWOZUuhfvnW.jpeg",
  profileImageWebUrl:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1516874128583.jpg-JojP3apvxPBlqKPnuVkdWOZUuhfvnW.jpeg",
  profileImagePdfUrl: "/uploads/profile-1748210995909-pdf.webp",
  summary:
    "Software Delivery Manager with over 10 years of experience in the IT industry, including 5 years in leading delivery and engineering teams. Proven expertise in software development, project execution, and process optimization, ensuring on-time delivery, high-quality outcomes, and continuous team performance improvement.",
  email: "preslav.panayotov@gmail.com",
  linkedin: "www.linkedin.com/in/preslav-panayotov",
  languages: [
    {
      name: "Bulgarian",
      proficiency: "Native"
    },
    {
      name: "English",
      proficiency: "Professional"
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
