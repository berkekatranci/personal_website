export type WritingItem = {
  title: string;
  type: string;
  description: string;
  href?: string;
};

export const writingItems: WritingItem[] = [
  {
    title: "Machine Learning for Weather Forecasting",
    type: "Case study",
    description:
      "From custom weather sensor data to model development, team leadership, and evaluation at TU Braunschweig.",
    href: "/projects/weather-forecasting"
  },
  {
    title: "Lane Detection with OpenCV",
    type: "Case study",
    description:
      "A computer vision pipeline for road video using edge detection, region-of-interest filtering, and the Hough transform.",
    href: "/projects/lane-detection"
  },
  {
    title: "Hardware-Aware GPT Quantization",
    type: "Case study",
    description:
      "Simulating quantization and analog noise in GPT-style language models for photonic and electronic neuromorphic systems.",
    href: "/projects/hardware-aware-gpt"
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
