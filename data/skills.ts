export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    skills: ["Java", "Python", "C++", "C#"]
  },
  {
    title: "Databases & Cloud",
    skills: ["SQL", "MariaDB", "MongoDB", "AWS"]
  },
  {
    title: "AI / Data / ML",
    skills: [
      "Pandas",
      "Scikit-learn",
      "SciPy",
      "Statsmodels",
      "TensorFlow/Keras",
      "PyTorch",
      "OpenCV",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Gym-OpenAI",
      "BeautifulSoup",
      "RDKit"
    ]
  },
  {
    title: "Software / Engineering",
    skills: ["Java Swing", "Java AWT", "Maven", "NetworkX", "OR-Tools"]
  },
  {
    title: "Creative & Applications",
    skills: [
      "Unity",
      "Android Studio",
      "Blender",
      "Adobe Photoshop",
      "Adobe After Effects",
      "MS Office"
    ]
  }
];
