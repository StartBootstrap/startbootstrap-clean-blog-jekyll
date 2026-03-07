"use client";

import Navbar from "../components/Navbar";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "M.Tech Thesis",
    description: "Classifying Diabetic Retinopathy Images using induced deep region of interest extraction.",
    image: "/img/these_presentation.png",
    type: "modal",
  },
  {
    id: 2,
    title: "Distributed Bayesian Gaussian Mixture Model",
    description: "Custom Scikit-Learn implementation of distributed GMM.",
    image: "/img/distributed.png",
    type: "link",
    links: [
      { label: "GitHub Repo", url: "https://github.com/ashkush/Bayesian-Gaussian-Mixture-Model" }
    ]
  },
  {
    id: 3,
    title: "Variational Inference Gaussian Mixture Model",
    description: "In-depth study and implementation of VI applied to GMMs.",
    image: "/img/Variational_inference.png",
    type: "link",
    links: [
      { label: "GitHub Repo", url: "https://github.com/ashkush/Variational-inference-Gaussian-mixture-model" },
      { label: "Medium Article", url: "https://ashkush.medium.com/variational-inference-gaussian-mixture-model-52595074247b" }
    ]
  }
];

export default function Projects() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Projects</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">This is what I do.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project) => (
              <div key={project.id} className="glass-card flex flex-col overflow-hidden h-full transform transition duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(59,130,246,0.15)] hover:border-primary/50">
                <div className={`relative h-56 w-full ${project.id === 3 ? "bg-white p-4" : ""}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-${project.id === 3 ? "contain" : "cover"}`}
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-1 border-t border-slate-700/50">
                  <h3 className="text-xl font-heading font-bold text-white mb-3 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-6 flex-1 text-sm leading-relaxed border-b border-slate-700 pb-6">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto flex flex-wrap gap-3 justify-center">
                    {project.type === "modal" ? (
                      <button 
                        onClick={() => setModalImage(project.image)}
                        className="btn-primary w-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-desktop"></i> Presentation
                      </button>
                    ) : (
                      project.links?.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`${idx === 0 ? "btn-primary w-full" : "w-full text-center px-6 py-2.5 rounded-full border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors"} font-medium`}
                        >
                          {link.label}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {modalImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
            <div className="relative max-w-5xl w-full bg-slate-800 rounded-xl border border-slate-700 shadow-2xl p-2 animate-in fade-in zoom-in duration-300">
              <button 
                onClick={() => setModalImage(null)}
                className="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
              <div className="relative h-[40vh] md:h-[80vh] w-full rounded-lg overflow-hidden">
                <Image
                  src={modalImage}
                  alt="Presentation Modal"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
