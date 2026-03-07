export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-800/20 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="relative mb-16 text-center md:text-left">
          <h2 className="absolute top-0 md:left-0 left-1/2 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 text-[4rem] md:text-[6rem] font-bold text-slate-800 opacity-50 whitespace-nowrap z-0 select-none">
            About Me
          </h2>
          <h3 className="relative text-4xl md:text-5xl font-heading font-bold text-white z-10 pt-4">
            A little about me,
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p className="text-xl font-medium text-white">Hello, I'm Ashutosh!</p>
            <p>
              Data Scientist with 6.5+ years of experience building large-scale ML
              systems across fintech and ecommerce. Specialized in Uplift/propensity
              modeling, risk & fraud detection, and personalization/ranking.
            </p>
            <p>
              I have a proven track record of taking models from EDA to production
              with measurable business impact (CTR, GMV, conversion). I possess a
              strong background in distributed systems, MLOps, and
              experimentation-driven development.
            </p>
            <p>
              Regarding my education background, I did my <strong>Masters in Technology</strong> in{" "}
              <a
                href="https://www.ieor.iitb.ac.in/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary-hover underline decoration-primary/30 underline-offset-4"
              >
                Industrial Engineering and Operations Research (IEOR)
              </a>
              , at the prestigious <strong>Indian Institute of Technology (IIT) Bombay</strong>.
            </p>
          </div>

          <div className="md:mt-0 mt-8">
            <h3 className="text-3xl font-heading font-bold mb-8 text-white">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Python",
                "SQL",
                "PySpark",
                "Databricks",
                "MLflow",
                "FastAPI",
                "Docker",
                "AWS (S3, EC2, SageMaker)",
                "Azure",
                "PostgreSQL",
                "Git",
                "Machine Learning",
                "Propensity Modeling",
                "A/B Testing",
                "Distributed Systems",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-slate-800 text-slate-200 border border-slate-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-1 shadow-sm hover:shadow-md hover:shadow-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
