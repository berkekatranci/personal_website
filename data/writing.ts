export type WritingItem = {
  title: string;
  type: string;
  description: string;
  href?: string;
};

export const writingItems: WritingItem[] = [
  {
    title: "Medium Articles",
    type: "Writing",
    description:
      "Technical and reflective articles about AI, projects, learning, and systems thinking."
  },
  {
    title: "AI & Machine Learning Videos",
    type: "Media",
    description:
      "Project videos and learning documentation about machine learning experiments."
  },
  {
    title: "LinkedIn Updates",
    type: "Network",
    description:
      "Professional updates, student association work, project progress, and technical milestones.",
    href: "https://www.linkedin.com/in/berke-katranc%C4%B1/"
  },
  {
    title: "Instagram",
    type: "Creative",
    description:
      "Personal and creative updates around technology, design, and learning.",
    href: "https://www.instagram.com/berkekatranc/"
  }
];
