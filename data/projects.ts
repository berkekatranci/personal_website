export type ProjectStatus =
  | "Finished"
  | "In Progress"
  | "Research"
  | "Experimental";

export type Project = {
  title: string;
  category: string;
  problem: string;
  role: string;
  techStack: string[];
  result: string;
  status: ProjectStatus;
  links?: Array<{
    label: "GitHub" | "Demo" | "Article" | "Video" | "Thesis" | "";
    href?: string;
  }>;
};

export const featuredProjects: Project[] = [
  {
    title: "Machine Learning Weather Forecasting Model",
    category: "AI & Data Engineering",
    problem:
      "Building a predictive model for custom weather sensor data, including reading, cleaning, polishing, and transmitting data.",
    role:
      "AI development and team leadership during a practical project at TU Braunschweig.",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow/Keras",
      "Matplotlib"
    ],
    result:
      "Improved model accuracy from an initial 22% to 67%. Achieved strong regression metrics including R² above 95% and MSE below 1 depending on the evaluated target.",
    status: "Finished",
    links: [
      { label: "GitHub" },
      { label: "Article", href: "/projects/weather-forecasting" },
      { label: "Video" }
    ]
  },
  {
    title: "Deep Learning Lab Competition",
    category: "AI / Deep Learning",
    problem:
      "Competing in a TU Braunschweig AI challenge on image segmentation and benchmarking against strong models.",
    role: "Model development, experimentation, evaluation, and team collaboration.",
    techStack: ["Python", "PyTorch", "NumPy", "Matplotlib"],
    result:
      "Achieved 3rd place with 72% accuracy. The winning team achieved 76%.",
    status: "Finished",
    links: [{ label: "GitHub" }, { label: "Article" }]
  },
  {
    title: "NP-Hard Problem Solving Project",
    category: "Algorithms / Optimization",
    problem:
      "Working on computationally difficult problems that require algorithmic thinking and optimization strategies.",
    role: "Team member in a project at IBR, TU Braunschweig.",
    techStack: ["Python", "NetworkX", "OR-Tools", "Algorithms", "Graph methods"],
    result:
      "Built practical experience with optimization, complexity, teamwork, and structured problem solving.",
    status: "Finished",
    links: [{ label: "GitHub" }]
  },

{
  title: "Hardware-Aware Simulation of GPT-Style Language Models on Photonic/Electronic Neuromorphic Systems",
  category: "AI Engineering",

  problem:
    "Investigating whether GPT-style language models can tolerate hardware-inspired constraints from a photonic/electronic neuromorphic computing system, including limited SLM weight precision, microLED/DAC activation quantization, ADC readout quantization, and analog noise. The project addresses the broader challenge of evaluating modern AI models for future energy-efficient computing substrates beyond conventional digital accelerators.",

  role:
    "AI Engineer, Machine Learning Engineer, Neuromorphic Computing Researcher",

  techStack: [
    "Python",
    "PyTorch",
    "Hugging Face Transformers",
    "GPT-2",
    "Quantization-Aware Training",
    "Neuromorphic Computing",
    "Photonic Computing",
    "NumPy",
    "Pandas",
  ],

  result:
    "Designed and implemented a hardware-aware GPT-style causal language modeling pipeline that simulates photonic/electronic hardware constraints inside selected linear layers. The system models SLM weight quantization, microLED/DAC activation quantization, ADC output quantization, and analog noise during training. Experiments with small GPT-2 style models showed that 8-bit hardware-aware settings remained workable in the tested setup, while aggressive low-bit quantization caused significant degradation. The results also suggested that feed-forward network layers may be a promising first target for future photonic AI acceleration.",

  status: "Finished",

  links: [{ label: "Article", href: "/projects/hardware-aware-gpt" }]
},

{
  title: "Advanced Self-Driving AI Model",
  category: "AI Engineering",

  problem:
    "Building an AI-powered autonomous driving system that combines computer vision, deep learning, and simulation-based testing to perceive road environments, detect critical objects, recognize lanes, and support real-time driving decisions.",

  role:
    "AI Engineer, Computer Vision Engineer, Machine Learning Engineer",

  techStack: [
    "Python",
    "PyTorch",
    "OpenCV",
    "YOLO",
    "CNNs",
    "Semantic Segmentation",
    "Object Detection",
    "Lane Detection",
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "Matplotlib",
  ],

  result:
    "Developed a self-driving AI prototype capable of analyzing road scenes, detecting vehicles, pedestrians, traffic signs, and lane markings, and generating perception outputs for autonomous navigation. The project highlights applied knowledge in deep learning, real-time computer vision, autonomous vehicle perception, and simulation-driven AI development.",

  status: "In Progress",

  links: [{ label: "Demo" }]
},

{
  title: "Lane Detection System",
  category: "Computer Vision",

  problem:
    "Developed a real-time computer vision system capable of detecting lane markings from road video frames to support autonomous driving perception and driver-assistance workflows.",

  role:
    "Computer Vision Developer, AI Engineer",

  techStack: [
    "Python",
    "OpenCV",
    "NumPy",
    "Matplotlib",
    "Image Processing",
    "Edge Detection",
    "Hough Transform",
    "Perspective Transform",
    "Region of Interest Masking",
    "Video Processing"
  ],

  result:
    "Built a completed lane detection pipeline that processes road images and video frames, extracts lane markings, applies region-of-interest filtering, detects lane boundaries, and visualizes the detected lanes in real time. The project demonstrates practical experience in classical computer vision, image preprocessing, geometric transformations, and autonomous driving perception fundamentals.",

  status: "Finished",

  links: [{ label: "Article", href: "/projects/lane-detection" }]
},
{
  title: "Quick Math Challenge App",
  category: "Mobile Development",

  problem:
    "Created a fast-paced Android math application that helps users improve mental calculation speed, focus, and numerical reflexes through quick arithmetic-based challenges.",

  role:
    "Android Developer, Solo Developer",

  techStack: [
    "Java",
    "Android",
    "Android Studio",
    "XML",
    "Material Design",
    "SharedPreferences",
    "Google Play Console",
    "Git"
  ],

  result:
    "Developed and published a native Android math application on Google Play. The app provides quick calculation exercises, interactive feedback, and a lightweight mobile experience designed to train arithmetic speed and concentration. The project demonstrates full-cycle mobile development experience, from implementation and testing to Play Store release.",

  status: "Finished",

  links: [{ label: "Demo" }]
},
{
  title: "Memory Learning App",
  category: "Mobile Development",

  problem:
    "Built a personalized vocabulary learning application to make foreign language words easier to memorize through repetition, review, and quiz-based learning methods.",

  role:
    "Android Developer, Solo Developer",

  techStack: [
    "Java",
    "Android",
    "Android Studio",
    "XML",
    "Material Design",
    "SQLite",
    "SharedPreferences",
    "Google Play Console",
    "Git"
  ],

  result:
    "Developed and published a native Android vocabulary learning app on Google Play. The application supports word memorization through quiz-style practice, repeated exposure, and a custom learning flow designed from personal language-learning needs. The project demonstrates practical experience in educational app design, local data management, Android UI development, and end-to-end mobile product publishing.",

  status: "Finished",

  links: [{ label: "Demo" }]
},

//------------------------------------------------------------------------------------

  {
    title: "NovaExchangeWorkshop Website and Organization System",
    category: "Leadership / Web / Community",
    problem:
      "Building the digital and organizational foundation for a student association around entrepreneurship and investing.",
    role:
      "1st Chairperson, website builder, organizer, speaker, networker, moderator, and system builder.",
    techStack: [
      "Node.js",
      "npm",
      "Next.js",
      "React",
      "Tailwind",
      "Framer Motion",
      "Chart.js",
      "Prisma",
      "Vercel",
      "Neon"
    ],
    result:
      "Built structures, organized events, connected with speakers, gave presentations, and helped establish the association.",
    status: "In Progress",
    links: [{ label: "Demo", href: "https://new-bs.com" }]
  },
  {
    title: "3D Digital Sculpture Gallery",
    category: "Creative Technology",
    problem:
      "Presenting Blender sculptures and 3D objects in an interactive digital gallery.",
    role: "3D designer, digital sculptor, and visual creator.",
    techStack: ["Blender", "GLB/GLTF", "model-viewer", "Web integration"],
    result:
      "Demonstrates spatial thinking, aesthetics, patience, and creative-technical skill.",
    status: "In Progress",
    links: [{ label: "Demo" }]
  },

{
  title: "AI Model for De Novo Drug Discovery via Large Language Models",
  category: "AI Engineering",

  problem:
    "Developing a large language model–driven pipeline for de novo drug discovery by generating novel molecular structures and optimizing them for desired biological and physicochemical properties, reducing the time and cost of early-stage drug design.",

  role:
    "AI Engineer, Machine Learning Engineer, Data Scientist",

  techStack: [
    "PyTorch",
    "RDKit",
    "NumPy",
    "Pandas",
    "Scikit-learn",
  ],

  result:
    "Designing and implementing an end-to-end AI pipeline capable of generating novel molecular candidates, validating chemical structures, and evaluating key molecular properties. The project demonstrates the application of modern generative AI techniques to computational drug discovery workflows.",

  status: "In Progress",

  links: [{ label: "Demo" }]
},
{
  title: "Mobile Application Project I",
  category: "Mobile Development",

  problem:
    "Developing a mobile-first application focused on improving everyday errands through a clean interface, reliable performance, and practical user-centered functionality.",

  role:
    "Android Developer, Mobile App Developer",

  techStack: [
    "Java",
    "Android",
    "Android Studio",
    "XML",
    "Material Design",
    "SQLite",
    "SharedPreferences",
    "Git"
  ],

  result:
    "Currently developing an Android application with a focus on usability, performance, and maintainable mobile architecture. The project demonstrates hands-on experience in native Android development, interface design, local data handling, and iterative product development.",

  status: "In Progress",

  links: [{ label: "Demo" }]
},

{
  title: "Mobile Application Project II",
  category: "Mobile Development",

  problem:
    "Building a native Android application designed around  networking concept, with emphasis on smooth user interaction, structured functionality, and scalable mobile development practices.",

  role:
    "Android Developer, Software Developer",

  techStack: [
    "Java",
    "Android",
    "Android Studio",
    "XML",
    "Material Design",
    "SQLite",
    "SharedPreferences",
    "UI/UX Design",
    "Git"
  ],

  result:
    "Designed and implemented the core structure of an Android application while keeping the product concept private during development. The project highlights experience in native mobile engineering, interface implementation, data persistence, and building user-focused mobile software from the ground up.",

  status: "In Progress",

  links: [{ label: "Demo" }]
},

{
  title: "Scent Predictor",
  category: "AI Engineering / Data Science",

  problem:
    "Developing a machine learning and a deep neural network system that predicts possible scent descriptors from molecular structure data, connecting cheminformatics, molecular representation learning, and human odor perception modeling.",

  role:
    "AI Engineer, Machine Learning Engineer, Data Scientist",

  techStack: [
    "Python",
    "PyTorch",
    "RDKit",
    "DeepChem",
    "OpenPOM",
    "Pyrfume",
    "SMILES",
    "Molecular Fingerprints",
    "Molecular Descriptors",
    "Graph Neural Networks",
    "Scikit-learn",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Jupyter Notebook",
    "Git"
  ],

  result:
    "Currently building an experimental scent prediction pipeline that processes molecular structures, extracts chemical features, and predicts odor-related descriptors using machine learning models. The project explores how AI can model the relationship between molecular structure and human-perceived smell, demonstrating applied work in cheminformatics, molecular AI, and sensory prediction systems.",

  status: "In Progress",

  links: [{ label: "" }]
},

{
  title: "Finance Research & Investment Analytics Tools",
  category: "Software Development",

  problem:
    "Developing data-driven financial tools to support market research, investment analysis, portfolio tracking, and decision-making through automated data collection, analysis, and visualization.",

  role:
    "Software Developer, Data Analyst",

  techStack: [
    "Python",
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "Plotly",
    "yFinance",
    "Matplotlib",
    "Streamlit",
  ],

  result:
    "Designed and implemented financial analysis tools that automate data gathering, clean and process market data, visualize price movements and trends, and support faster, more structured investment research. The project reduces manual research workload and improves the efficiency of tracking financial assets and evaluating investment opportunities.",

  status: "In Progress",

  links: [{ label: "Demo" }]
}
];

export const completedProjects = featuredProjects.filter(
  (project) => project.status === "Finished"
);

export const ongoingProjects = featuredProjects.filter(
  (project) => project.status !== "Finished"
);
