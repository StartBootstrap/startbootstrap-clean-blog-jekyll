import Image from "next/image";

const techStack = [
  { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", width: 40 },
  { name: "PyTorch", icon: "https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg", width: 40 },
  { name: "Tensorflow", icon: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg", width: 40 },
  { name: "Scikit-Learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg", width: 60 },
  { name: "Apache Spark", icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg", width: 70 },
  { name: "Pandas", icon: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg", width: 90 },
  { name: "Git", icon: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg", width: 45 },
  { name: "AWS SageMaker", icon: "https://upload.wikimedia.org/wikipedia/commons/5/5c/AWS_Simple_Icons_AWS_Cloud.svg", width: 45 },
  { name: "Docker", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", width: 60 },
  { name: "FastAPI", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg", width: 60 },
];

export default function TechStack() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="relative mb-16 text-center md:text-left">
          <h2 className="absolute top-0 md:left-0 left-1/2 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 text-[3rem] md:text-[5rem] lg:text-[7rem] font-bold text-slate-800 opacity-50 whitespace-nowrap z-0 select-none">
            Tech Stack
          </h2>
          <h3 className="relative text-4xl md:text-5xl font-heading font-bold text-white z-10 pt-4 md:pt-8">
            Tech I'm familiar with
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="glass-card flex flex-col items-center justify-center p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-[0_10px_20px_rgba(59,130,246,0.15)] group"
            >
              <div className="h-16 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  style={{ width: `${tech.width}px` }}
                  className="max-h-12 object-contain filter drop-shadow-md"
                />
              </div>
              <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
