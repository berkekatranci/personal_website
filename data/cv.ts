import { salzgitterInternship } from "@/data/profile";

export type CVEntry = {
  period: string;
  title: string;
  organization?: string;
  description?: string;
  type: "education" | "experience" | "activity";
};

export const education: CVEntry[] = [
  {
    period: "Since 2026",
    title: "M.Sc. Informatics",
    organization: "TU Braunschweig",
    description:
      "Studying Informatics with interests in Artificial Intelligence, Software Engineering, Data Science, algorithms, and complex systems.",
    type: "education"
  },
  {
    period: "2022 - 2026",
    title: "B.Sc. Informatics",
    organization: "TU Braunschweig",
    description:
      "Studied Informatics with interests in Artificial Intelligence, Software Engineering, Data Science, algorithms, and complex systems.",
    type: "education"
  },
  {
    period: "09.2021 - 07.2022",
    title: "German Courses",
    organization: "TU Braunschweig",
    description:
      "Completed German language preparation up to C1 level for academic study in Germany.",
    type: "education"
  },
  {
    period: "09.2020 - 09.2021",
    title: "Informatics Studies",
    organization: "Izmir University of Economics",
    description:
      "Completed two semesters of Informatics. Average grade: 3.16/4.0, approximately equivalent to 1.8 in the German grading system.",
    type: "education"
  },
  {
    period: "09.2016 - 06.2020",
    title: "Fethiye Anadolu Lisesi",
    description:
      "Graduated with an average grade of 94.58/100, approximately equivalent to 1.3 in the German grading system.",
    type: "education"
  }
];

export const experience: CVEntry[] = [
  {
    period: `Since ${salzgitterInternship.started}`,
    title: salzgitterInternship.title,
    organization: salzgitterInternship.organization,
    description: salzgitterInternship.description,
    type: "experience"
  },
  {
    period: "Since 07.2025",
    title: "Software / AI Developer, Student Research Assistant",
    organization: "TU Braunschweig HPC",
    description:
      "Working on software and AI-related development tasks in an academic high-performance-computing environment.",
    type: "experience"
  },
  {
    period: "Since 03.2025",
    title: "1st Chairperson",
    organization: "NovaExchangeWorkshop",
    description:
      "Leading a student association focused on entrepreneurship and investing. Responsibilities include website development, speaker networking, organizational system building, event organization, public speaking, and strategic growth.",
    type: "experience"
  },
  {
    period: "04.2024 - 07.2024",
    title: "AI Internship",
    organization: "TU Braunschweig",
    description:
      "Responsible for AI development and team leadership. Developed a weather forecasting model, improved model performance through iterative experimentation, and evaluated performance with strong regression metrics.",
    type: "experience"
  },
  {
    period: "04.2024 - 07.2024",
    title: "Deep Learning Lab",
    organization: "TU Braunschweig",
    description:
      "Participated in an AI competition and achieved 3rd place with 72% accuracy. The winning team achieved 76%.",
    type: "experience"
  },
  {
    period: "10.2023 - 02.2024",
    title: "Team Project on Solving NP-Hard Problems",
    organization: "IBR, TU Braunschweig",
    description:
      "Worked in a team on algorithmic problem solving, optimization, and computationally difficult problems.",
    type: "experience"
  }
];

export const activities: CVEntry[] = [
  {
    period: "2023",
    title: "Business Training Camp",
    organization: "Bogazici University",
    description: "Participated in business and entrepreneurship training.",
    type: "activity"
  },
  {
    period: "2023",
    title: "Teamwork Workshop",
    organization: "Consult-One, TU Braunschweig",
    description:
      "Participated in a workshop focused on teamwork, communication, and collaboration.",
    type: "activity"
  },
  {
    period: "Since 2023",
    title: "Writer on Medium",
    description:
      "Publishing articles and reflections about projects, technology, AI, machine learning, and learning.",
    type: "activity"
  },
  {
    period: "Since 2022",
    title: "YouTube Publications about AI and Machine Learning Projects",
    description:
      "Publishing videos and project-related content about AI, machine learning, and technical experiments.",
    type: "activity"
  },
  {
    period: "Since 2022",
    title: "ParkRun Braunschweig",
    description:
      "Leadership and organizational support in community running events.",
    type: "activity"
  },
  {
    period: "06.2023",
    title: "Organizational Helper",
    organization: "Klasse! Wir singen",
    type: "activity"
  },
  {
    period: "08.2022",
    title: "Event Support",
    organization: "Klasse! Wir singen",
    type: "activity"
  },
  {
    period: "07.04.2020",
    title: "Talk on Quantum Physics for World Chemistry Day",
    type: "activity"
  },
  {
    period: "09.2019 - 06.2020",
    title: "Representative of the Class Honor Committee",
    type: "activity"
  },
  {
    period: "09.2019 - 06.2020",
    title: "Math Club Member",
    type: "activity"
  },
  {
    period: "2018",
    title: "Second Place in Inter-Class Basketball Competition",
    type: "activity"
  },
  {
    period: "11.2019 - 06.2020",
    title: "FETRON Vice President",
    type: "activity"
  },
  {
    period: "09.2018 - 11.2019",
    title: "FETRON Electronics Department Leader",
    type: "activity"
  },
  {
    period: "2018",
    title: "Designed a logo for the tutoring organization Positive Mathe",
    type: "activity"
  }
];

export const cvTimeline = [...experience, ...education, ...activities];
