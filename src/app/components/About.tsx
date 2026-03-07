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
              Currently working as a Senior Data Scientist at HDFC Life with Data
              Labs (Predictive Modelling team). Majority of my work includes
              generating actionable business insights through applied machine
              learning, which involves collecting data from various sources,
              cleaning, pre-processing, outlier detection, feature engineering, ML
              algorithm selection, hyper parameter tuning, algorithm training,
              validation and model deployment for the end users.
            </p>
            <p>
              Previously, I had worked with Flytxt as a Data Scientist, where I
              developed machine learning solutions for clients (Telecom Companies)
              with the application of Applied Machine Learning and Big Data
              fundamentals (Apache Spark, HDFS, Distributed Computing).
            </p>
            <p>
              Regarding my education background, I did my Masters in Technology in{" "}
              <a
                href="https://www.ieor.iitb.ac.in/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary-hover underline decoration-primary/30 underline-offset-4"
              >
                Industrial Engineering and Operations Research (IEOR)
              </a>
              , IIT Bombay, where my research work was on{" "}
              <a
                href="https://ieeexplore.ieee.org/abstract/document/8965695"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary-hover underline decoration-primary/30 underline-offset-4"
              >
                Classifying Retinal Images using Deep learning
              </a>{" "}
              (Computer Vision), which was also published in an{" "}
              <a
                href="http://www.cisp-bmei.cn/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary-hover underline decoration-primary/30 underline-offset-4"
              >
                Image and signal processing conference.
              </a>
            </p>
            <p className="font-medium text-slate-200 border-l-4 border-primary pl-4 py-1">
              My areas of interest lie in Classical and Bayesian machine learning
              techniques, Causal Inference, Explainable AI and Deep learning.
            </p>
          </div>

          <div className="md:mt-0 mt-8">
            <h3 className="text-3xl font-heading font-bold mb-8 text-white">
              My Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Machine Learning",
                "Python",
                "AWS SageMaker",
                "Deep Learning",
                "Computer Vision",
                "Natural Language Processing",
                "Excel Reporting",
                "Data Engineering",
                "Predictive Modeling",
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
