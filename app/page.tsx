"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { MobileMenu } from "@/components/mobile-menu"
import { FiMail, FiLinkedin, FiMenu, FiX, FiPrinter } from "react-icons/fi"
import { ExperienceEntry } from "@/components/experience-entry"
import { SectionHeading } from "@/components/section-heading"
import { SkillTag } from "@/components/skill-tag"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handlePrint = () => {
    window.print()
  }

  // Experience data
  const experiences =[
  {
    "title": "Delivery Manager",
    "company": "MentorMate",
    "dateRange": "November 2020 - Present",
    "location": "Sofia, Sofia City, Bulgaria",
    "description": "In my role as a Delivery Manager, I focus not only on the technical side of things but also on building strong relationships and helping every project succeed. I usually work on large-scale projects and am trusted by clients to organize, lead, and empower teams to deliver high-quality software. While I don’t have direct reports, I often take on responsibilities related to people management and team development. My top priority is delivering successful outcomes and making sure our clients are happy, which is why I rely on both my technical expertise and strong interpersonal skills.",
    "tags": [
      "Solution Architecture", "Software Quality", "Scrum", "Team Collaboration", "Microservices",
      "Team Management", "Coaching & Mentoring", "Web Architecture", "Software as a Service (SaaS)",
      "Product Strategy", "Software Project Management", "Databases", "Programming", "Project Management",
      "Engineering Management", "Project Plans", "Code Review", "Project Delivery", "Defect Management",
      "Technical Design", "Communication", "Problem Solving", "Hands-on Technical Leadership",
      "Interpersonal Communication", "Coaching", "Client Requirements", "Leadership", "Program Management",
      "Service-Oriented Architecture (SOA)", "Capacity Planning", "Knowledge Sharing", "Team Leadership",
      "Delivery Management", "Postman API", "Coding Standards", "Deployment Management"
    ]
  },
  {
    "title": "Senior Software Developer",
    "company": "MentorMate",
    "dateRange": "February 2018 - November 2020",
    "location": "Sofia",
    "description": "As a Senior Software Developer, I became a go-to person for all things architecture and development. I worked across various technologies, often jumping into different projects to lend my expertise. I played a key role in defining application architecture and code review processes to ensure product quality. I also helped guide both teams and clients toward the right technical solutions, which meant leaning heavily on both my technical skills and soft skills.",
    "tags": [
      "Solution Architecture", "Software Quality", "Team Collaboration", "Microservices", "Team Management",
      "Coaching & Mentoring", "Grunt (Software)", "Web Architecture", "Software as a Service (SaaS)",
      "React.js", "Product Strategy", "Databases", "Programming", "Project Plans", "Code Review", "JavaScript",
      "Project Delivery", "Technical Design", "Communication", "PHP", "Problem Solving", "Java", "PgSQL",
      "Hands-on Technical Leadership", "Cascading Style Sheets (CSS)", "Coaching", "Amazon Web Services (AWS)",
      "Client Requirements", "Leadership", "Program Management", "Service-Oriented Architecture (SOA)",
      "Capacity Planning", "Knowledge Sharing", "Postman API", "ESLint", "Coding Standards"
    ]
  },
  {
    "title": "Software Developer",
    "company": "MentorMate",
    "dateRange": "June 2016 - February 2018",
    "description": "During this time, I worked mostly independently on moderately complex tasks. I focused on building complete software—not just writing code. I followed best practices, improved quality, and made sure I understood the full development lifecycle. It was a big step in applying what I knew to real problems and choosing the right approach for each situation.",
    "tags": [
      "Solution Architecture", "CSS", "Software Quality", "Scrum", "Team Collaboration", "Microservices",
      "Grunt (Software)", "Web Architecture", "Software as a Service (SaaS)", "Databases", "Programming",
      "Project Plans", "Code Review", "Technical Design", "Communication", "PHP", "Problem Solving",
      "Agile Methodologies", "PgSQL", "Hands-on Technical Leadership", "Cascading Style Sheets (CSS)",
      "Client Requirements", "Service-Oriented Architecture (SOA)", "Postman API", "ESLint", "Coding Standards"
    ]
  },
  {
    "title": "Web Developer",
    "company": "IT-Cover",
    "dateRange": "December 2015 - June 2016",
    "description": "At IT-Cover, I worked on a variety of web development projects. We focused on building solid CRM systems, back-office tools, and B2C websites. It was a fast-paced environment where I had the chance to work across the full stack and contribute to meaningful projects.",
    "tags": [
      "Software Quality", "Team Collaboration", "Grunt (Software)", "Web Architecture", "Databases",
      "Programming", "Project Plans", "Code Review", "Technical Design", "Communication", "Problem Solving",
      "Postman API", "ESLint"
    ]
  },
  {
    "title": "Web Developer",
    "company": "Career Town",
    "dateRange": "June 2015 - December 2015",
    "location": "Sofia",
    "description": "I joined CareerTown, a startup focused on building an HR job portal with a ton of functionality. I was part of the core development team and contributed to both front-end and back-end features.",
    "tags": [
      "Software Quality", "Team Collaboration", "Grunt (Software)", "Web Architecture",
      "Software as a Service (SaaS)", "Databases", "Programming", "Project Plans", "Code Review",
      "Problem Solving", "Client Requirements", "Postman API"
    ]
  },
  {
    "title": "Web Developer",
    "company": "BSBM",
    "dateRange": "July 2014 - June 2015",
    "location": "София",
    "description": "I worked with clients of @Signature digital agency, developing new web-based applications and maintaining existing ones. I mainly used PHP, MySQL, PostgreSQL, nginx, Apache, and extJS. BSBM later became CareerTown.",
    "tags": [
      "Software Quality", "Team Collaboration", "Web Architecture", "Databases", "Programming",
      "Problem Solving", "Client Requirements", "Postman API"
    ]
  },
  {
    "title": "Free Lancer",
    "company": "",
    "dateRange": "2006 - 2015",
    "description": "During this time, I worked as a freelancer, taking on a variety of projects. I gained hands-on experience in full-stack development, working with different clients, solving problems, and delivering value through clean, maintainable code.",
    "tags": [
      "Software Quality", "Grunt (Software)", "Databases", "Programming", "Communication", "Problem Solving",
      "Client Requirements", "Knowledge Sharing", "Postman API", "ESLint", "Coding Standards"
    ]
  },
  {
    "title": "Web Developer",
    "company": "Interactive Share Ltd",
    "dateRange": "July 2013 - February 2014",
    "location": "Sofia",
    "description": "At Interactive Share, I worked on various web development projects and supported client needs. I focused on delivering high-quality code and collaborating closely with the team.",
    "tags": ["Software Quality", "Team Collaboration", "Programming", "Client Requirements"]
  }
]

  // Top skills based on frequency in experience tags
  const topSkills = [
    "Software Quality",
    "Team Collaboration",
    "Programming",
    "Problem Solving",
    "Client Requirements",
    "Databases",
    "Web Architecture",
    "Communication",
    "Hands-on Technical Leadership",
    "Deployment Management",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hidden metadata for ATS */}
      <div className="hidden print:block">
        <div aria-hidden="true" className="text-[0.1px] text-white overflow-hidden h-[0.1px]">
          <h1>Preslav Panayotov - Software Delivery Manager</h1>
          <p>Contact: preslav.panayotov@gmail.com, www.linkedin.com/in/preslav-panayotov</p>
          <p>Skills: {Array.from(new Set(experiences.flatMap((exp) => exp.tags))).join(", ")}</p>
        </div>
      </div>

      <header className="container mx-auto px-4 py-6 print:hidden">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-black"></div>
            <span className="text-lg font-semibold">Preslav Panayotov</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#summary" className="text-sm hover:text-gray-600">
              Summary
            </Link>
            <Link href="#experience" className="text-sm hover:text-gray-600">
              Experience
            </Link>
            <Link href="#skills" className="text-sm hover:text-gray-600">
              Skills
            </Link>
            <Link href="#education" className="text-sm hover:text-gray-600">
              Education
            </Link>
            <Link href="#certifications" className="text-sm hover:text-gray-600">
              Certifications
            </Link>
            <Link href="#contact" className="text-sm hover:text-gray-600">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 border border-gray-300 rounded flex items-center text-sm"
              aria-label="Print CV"
            >
              <FiPrinter size={16} className="mr-1" />
              <span className="hidden sm:inline">Print CV</span>
            </button>
            <button
              className="p-2 border border-gray-300 rounded md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />

      <main className="container mx-auto px-4 py-8 max-w-4xl print:py-2 print:max-w-none">
        <section className="flex flex-col items-center mb-12 print:mb-6 print:items-start print:flex-row print:gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 print:mb-0 print:w-24 print:h-24">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1516874128583.jpg-JojP3apvxPBlqKPnuVkdWOZUuhfvnW.jpeg"
              alt="Profile picture of Preslav Panayotov"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div className="text-center print:text-left">
            <h1 className="text-2xl font-bold mb-1">Preslav Panayotov</h1>
            <h2 className="text-gray-600 mb-1">Software Delivery Manager</h2>
            <p className="text-gray-500">Sofia, Sofia City, Bulgaria</p>
          </div>
        </section>

        <section id="summary" className="mb-10 print:mb-6">
          <SectionHeading title="Summary" />
          <p className="text-gray-700">
            Software Delivery Manager with over years of experience in software engineering and team management.
            Expertise in Software Development, and Process Improvement ensures seamless delivery and high-performance
            outcomes.
          </p>

            <p className="print:hidden text-gray-700">Skills: {Array.from(new Set(experiences.flatMap((exp) => exp.tags))).join(", ")}</p>
        </section>

        <section id="experience" className="mb-10 print:mb-6">
          <SectionHeading title="Experience" />

          {experiences.map((exp, index) => (
            <ExperienceEntry
              key={index}
              title={exp.title}
              company={exp.company}
              dateRange={exp.dateRange}
              location={exp.location}
              description={exp.description}
              tags={exp.tags}
            />
          ))}
        </section>

        <section id="skills" className="mb-10 print:mb-6">
          <SectionHeading title="Skills" />
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill, index) => (
              <SkillTag key={index} name={skill} />
            ))}
          </div>

          {/* Hidden text for ATS - comprehensive skills list */}
          <div className="hidden print:block mt-4">
            <h3 className="font-semibold mb-2">Additional Skills</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(experiences.flatMap((exp) => exp.tags)))
                .filter((skill) => !topSkills.includes(skill))
                .map((skill, index) => (
                  <SkillTag key={index} name={skill} />
                ))}
            </div>
          </div>
        </section>

        <section id="languages" className="mb-10 print:mb-6">
          <SectionHeading title="Languages" />
          <div className="space-y-2">
            <div>
              <span className="font-medium">Bulgarian:</span> Native or Bilingual
            </div>
            <div>
              <span className="font-medium">English:</span> Professional Working
            </div>
          </div>
        </section>

        <section id="education" className="mb-10 print:mb-6">
          <SectionHeading title="Education" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
            <h3 className="font-semibold">Sofia University St. Kliment Ohridski</h3>
            <span className="text-gray-500 text-sm">2010 - 2013</span>
          </div>
          <p className="text-gray-700">Bachelor's degree, Mathematics and Computer Science</p>
        </section>

        <section id="certifications" className="mb-10 print:mb-6">
          <SectionHeading title="Certifications" />
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Security Awareness Essentials</li>
            <li>Business English</li>
            <li>Shaping up with Angular.js</li>
          </ul>
        </section>

        <section id="contact" className="print:mb-6">
          <SectionHeading title="Contact" />
          <div className="space-y-2 print:flex print:space-y-0 print:space-x-6">
            <div className="flex items-center">
              <FiMail className="w-5 h-5 mr-2 print:w-4 print:h-4" />
              <span>Email: preslav.panayotov@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FiLinkedin className="w-5 h-5 mr-2 print:w-4 print:h-4" />
              <span>LinkedIn: www.linkedin.com/in/preslav-panayotov</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm print:hidden">
        <p>© {new Date().getFullYear()} Preslav Panayotov. All rights reserved.</p>
      </footer>
    </div>
  )
}
