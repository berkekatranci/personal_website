import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillBadge } from "@/components/SkillBadge";

const focusAreas = [
  {
    title: "Machine Learning Projects",
    text: "Practical model development, data preparation, experimentation, and measurable performance improvement."
  },
  {
    title: "Deep Learning Experience",
    text: "Image segmentation competition work with PyTorch, iterative training, benchmarking, and evaluation."
  },
  {
    title: "Data Analysis & Visualization",
    text: "Data cleaning, exploratory analysis, plots, reporting, and readable communication of results."
  },
  {
    title: "Model Evaluation",
    text: "Accuracy, regression metrics, error analysis, and structured comparison between model iterations."
  },
  {
    title: "Current Learning Focus",
    text: "Full AI project lifecycle: problem framing, data quality, model choice, deployment awareness, and iterative improvement."
  },
  {
    title: "Tools & Frameworks",
    text: "A growing toolkit across Python-based AI, scientific computing, computer vision, and optimization."
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
    <section id="ai-data" className="border-b border-white/10 bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="AI & Data Engineering"
            title="AI & Data Engineering"
            description="I work on machine-learning models, data-driven systems, and intelligent workflows. I am especially interested in the full lifecycle of AI projects: understanding the problem, preparing data, choosing the right model, evaluating performance, communicating results, and improving the system iteratively."
          />
        </Reveal>

        <div className="mt-14 grid gap-8">
          <Reveal>
            <div className="border-l border-sky/40 pl-5 lg:sticky lg:top-24">
              <p className="font-mono text-[10px] uppercase text-muted">
                Working loop / 01—06
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ol className="border-b border-white/10">
              {focusAreas.map((area, index) => (
                <li
                  key={area.title}
                  className="text-row grid gap-3 border-t border-white/10 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-5"
                >
                  <span className="font-mono text-[10px] text-sky sm:row-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-text">{area.title}</h3>
                  <p className="prose-copy text-muted">{area.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="mt-14" delay={0.06}>
          <div className="grid gap-5 border-t border-white/10 pt-6 lg:grid-cols-12 lg:gap-8">
            <h3 className="font-mono text-[10px] uppercase text-text lg:col-span-3">
              Tools & Frameworks
            </h3>
            <div className="flex flex-wrap gap-x-5 gap-y-3 lg:col-span-9">
              {tools.map((tool) => (
                <SkillBadge key={tool}>{tool}</SkillBadge>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
