import { BarChart3, BrainCircuit, Database, LineChart, Microscope, Wrench } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillBadge } from "@/components/SkillBadge";

const focusAreas = [
  {
    title: "Machine Learning Projects",
    text: "Practical model development, data preparation, experimentation, and measurable performance improvement.",
    icon: BrainCircuit
  },
  {
    title: "Deep Learning Experience",
    text: "Image segmentation competition work with PyTorch, iterative training, benchmarking, and evaluation.",
    icon: Microscope
  },
  {
    title: "Data Analysis & Visualization",
    text: "Data cleaning, exploratory analysis, plots, reporting, and readable communication of results.",
    icon: BarChart3
  },
  {
    title: "Model Evaluation",
    text: "Accuracy, regression metrics, error analysis, and structured comparison between model iterations.",
    icon: LineChart
  },
  {
    title: "Current Learning Focus",
    text: "Full AI project lifecycle: problem framing, data quality, model choice, deployment awareness, and iterative improvement.",
    icon: Database
  },
  {
    title: "Tools & Frameworks",
    text: "A growing toolkit across Python-based AI, scientific computing, computer vision, and optimization.",
    icon: Wrench
  }
];

const tools = [
  "Python",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "SciPy",
  "Statsmodels",
  "TensorFlow/Keras",
  "PyTorch",
  "OpenCV",
  "Matplotlib",
  "Seaborn",
  "Plotly",
  "BeautifulSoup",
  "Gym-OpenAI",
  "NetworkX",
  "OR-Tools"
];

export function AIDataSection() {
  return (
    <section id="ai-data" className="bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="AI & Data Engineering"
            title="AI & Data Engineering"
            description="I work on machine-learning models, data-driven systems, and intelligent workflows. I am especially interested in the full lifecycle of AI projects: understanding the problem, preparing data, choosing the right model, evaluating performance, communicating results, and improving the system iteratively."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <Reveal key={area.title} delay={index * 0.04}>
                <article className="surface-card h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-sky/30 bg-sky/10 text-sky">
                    <Icon aria-hidden size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-text">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{area.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 surface-card p-6">
          <h3 className="text-lg font-semibold text-text">Tools & Frameworks</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <SkillBadge key={tool}>{tool}</SkillBadge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
