export type CaseStudySection = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  category: string;
  role: string;
  context: string;
  status: "Finished";
  overview: string;
  techStack: string[];
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "weather-forecasting",
    title: "Machine learning for weather sensor forecasting",
    description:
      "Berke Katrancı's TU Braunschweig weather forecasting project: custom sensor data, machine learning, team leadership and model evaluation.",
    category: "AI & Data Engineering",
    role: "AI development and team leadership",
    context: "Practical project at TU Braunschweig",
    status: "Finished",
    overview:
      "A predictive modelling project built around custom weather sensor data. My work combined AI development with team leadership, connecting data preparation and transmission with iterative model improvement.",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow/Keras",
      "Matplotlib"
    ],
    sections: [
      {
        id: "problem",
        title: "The problem",
        paragraphs: [
          "The project required a predictive model for custom weather sensor readings. Working with the model also meant handling the surrounding data workflow: reading, cleaning, preparing and transmitting the sensor data.",
          "This made the task a combination of data engineering and machine learning. A useful outcome depended on preparing the inputs as well as evaluating the model's predictions."
        ]
      },
      {
        id: "approach",
        title: "My contribution and approach",
        paragraphs: [
          "I worked on AI development and team leadership during the practical project at TU Braunschweig. The implementation used a Python stack covering data processing, machine learning and visualization."
        ],
        points: [
          "Read and prepare custom weather sensor data for predictive modelling.",
          "Work with Pandas and NumPy for data processing, and Scikit-learn and TensorFlow/Keras in the modelling stack.",
          "Iterate on the model and evaluate the resulting predictions, using Matplotlib for visualization.",
          "Combine technical development with coordination of the team's work."
        ]
      },
      {
        id: "results",
        title: "Results and how to interpret them",
        paragraphs: [
          "The project summary reports an improvement in model accuracy from 22% to 67%. It also reports R² above 95% and mean squared error below 1 for some evaluated targets.",
          "These figures describe different aspects of the evaluation and should not be treated as interchangeable scores. Their interpretation depends on the prediction target, the definition of accuracy, the target's scale and the evaluation split. They are project-specific results rather than a general weather forecasting benchmark."
        ]
      },
      {
        id: "scope",
        title: "Scope and limitations",
        paragraphs: [
          "The outcome demonstrates experience in sensor-data preparation, predictive modelling, evaluation and team leadership. It does not establish performance across other sensors, locations or forecasting horizons.",
          "Comparing this work with another forecasting system would require the same target, data conditions and evaluation protocol."
        ]
      }
    ]
  },
  {
    slug: "lane-detection",
    title: "Real-time lane detection with Python and OpenCV",
    description:
      "Explore Berke Katrancı's completed lane detection pipeline using Python, OpenCV, edge detection, Hough transforms and road video processing.",
    category: "Computer Vision",
    role: "Computer vision development and AI engineering",
    context: "Road image and video processing",
    status: "Finished",
    overview:
      "A completed computer vision pipeline that detects lane markings in road images and video frames, then visualizes the detected lane boundaries in real time. The project focuses on classical image processing for driving perception.",
    techStack: [
      "Python",
      "OpenCV",
      "NumPy",
      "Matplotlib",
      "Edge Detection",
      "Hough Transform",
      "Perspective Transform",
      "Region of Interest Masking"
    ],
    sections: [
      {
        id: "problem",
        title: "The problem",
        paragraphs: [
          "Lane markings provide information about road structure. The task was to extract those markings from road images and video frames and make the detected boundaries visible as a perception output.",
          "The project addresses one component of autonomous driving and driver-assistance workflows: recognizing lane geometry in visual input."
        ]
      },
      {
        id: "approach",
        title: "The computer vision approach",
        paragraphs: [
          "I built the pipeline in Python with OpenCV, using classical image-processing and geometric methods. The work covered image preprocessing, region-of-interest filtering, lane-boundary extraction and visualization."
        ],
        points: [
          "Process road images and individual video frames.",
          "Use region-of-interest masking to focus the lane analysis on a selected part of the image.",
          "Apply edge detection and Hough-transform methods to extract line structure associated with lane markings.",
          "Work with perspective transforms and geometric processing as part of the vision toolkit.",
          "Visualize the detected lane boundaries in the processed output."
        ]
      },
      {
        id: "results",
        title: "What the completed system delivers",
        paragraphs: [
          "The completed pipeline processes road images and video, extracts lane markings, detects lane boundaries and visualizes them in real time. It demonstrates practical work with OpenCV, image preprocessing, geometric transformations and video processing.",
          "The reported result is a working lane-perception pipeline. No numerical accuracy or frame-rate benchmark is reported here, so real-time operation should be understood in the context of the project's tested setup."
        ]
      },
      {
        id: "scope",
        title: "Scope and limitations",
        paragraphs: [
          "Lane detection is one part of a driving system. This project does not by itself demonstrate vehicle control, obstacle handling or safe autonomous navigation.",
          "Performance in rain, darkness, roadworks or with faded lane markings would need separate evaluation before making claims about those conditions."
        ]
      }
    ]
  },
  {
    slug: "hardware-aware-gpt",
    title: "Hardware-aware GPT models for photonic computing",
    description:
      "Berke Katrancı's GPT-style language model simulation explores quantization and analog noise in photonic/electronic neuromorphic computing.",
    category: "AI Engineering / Neuromorphic Computing",
    role: "AI engineering, machine learning and neuromorphic computing research",
    context: "Hardware-aware simulation of GPT-style language models",
    status: "Finished",
    overview:
      "A hardware-aware causal language modelling pipeline that simulates photonic/electronic constraints inside selected linear layers of GPT-style models. The goal was to investigate how quantization and analog noise affect the viability of language models on alternative computing hardware.",
    techStack: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "GPT-2",
      "Quantization-Aware Training",
      "Neuromorphic Computing",
      "Photonic Computing",
      "NumPy",
      "Pandas"
    ],
    sections: [
      {
        id: "problem",
        title: "The research question",
        paragraphs: [
          "Can GPT-style language models tolerate hardware-inspired constraints from photonic/electronic neuromorphic systems? The project explored this question through simulation, examining model behaviour beyond conventional digital accelerator assumptions.",
          "The broader motivation was to evaluate whether language models could remain workable under constraints relevant to future energy-efficient computing substrates."
        ]
      },
      {
        id: "approach",
        title: "What the simulation models",
        paragraphs: [
          "I designed and implemented a causal language modelling pipeline that applies hardware-inspired effects inside selected linear layers during training. The implementation used PyTorch, Hugging Face Transformers and small GPT-2-style models."
        ],
        points: [
          "Limited spatial light modulator (SLM) weight precision, represented through weight quantization.",
          "microLED/digital-to-analog converter (DAC) activation quantization.",
          "Analog-to-digital converter (ADC) readout quantization at the layer output.",
          "Analog noise introduced alongside the quantization effects during training."
        ]
      },
      {
        id: "results",
        title: "Findings from the tested setup",
        paragraphs: [
          "Experiments with small GPT-2-style models showed that 8-bit hardware-aware settings remained workable in the tested setup. More aggressive low-bit quantization caused significant degradation.",
          "The results also suggested that feed-forward network layers may be a promising initial target for future photonic AI acceleration. This is a direction indicated by the experiments, rather than a demonstrated hardware deployment."
        ]
      },
      {
        id: "scope",
        title: "Scope and limitations",
        paragraphs: [
          "These findings come from a hardware-inspired software simulation with small GPT-style models. They do not establish measured energy savings, physical-device performance or equivalent behaviour in larger language models.",
          "The bit-width observations are specific to the tested model and simulated constraints. Extending the conclusions would require further experiments and validation against physical hardware."
        ]
      }
    ]
  }
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
