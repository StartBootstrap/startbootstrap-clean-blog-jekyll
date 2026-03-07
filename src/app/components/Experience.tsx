"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      id: "tata-digital",
      company: "Tata Digital (Tata Neu)",
      website: "https://www.tatadigital.com/",
      role: "Data Scientist - II",
      duration: "June 2024 \u2013 Present",
      location: "Bengaluru, India",
      details: [
        "Designed a multi-stage propensity modeling framework with funnel-aware feature engineering and stage-wise intent prediction for Insurance, Investments, and Credit Cards, enabling precision targeting for 50M+ users and improving funnel conversion by 19 BPS.",
        "Operationalized weekly scoring pipelines for propensity models (stacked ensemble of XGBoost + DNN) and integrated outputs with the outbound CRM platform/call center to enable automated, timely targeting of high-intent users.",
        "Led end-to-end development of a zone-aware trend discovery and product ranking system for Tata CLiQ merchandising, partnering with product and engineering to define requirements, productionize models, and run live A/B experiments, resulting in +0.34% carousel CTR uplift across regions.",
        "Built a scalable, configurable training framework with automated large-scale feature selection (10k+ features), variance filtering, and multi-model voting-based feature subset selection.",
        "Developed flexible Spark/AutoGluon training pipelines with integrated MLflow model registry support on Databricks, enabling automated packaging, versioning, and inference-ready deployment.",
        "Architected and productionized a high-throughput Insurance Anti-Fraud service using FastAPI, achieving a P99 latency of 115ms for real-time screening."
      ]
    },
    {
      id: "hdfc-life",
      company: "HDFC Life Insurance",
      website: "https://www.hdfclife.com/",
      role: "Senior Data Scientist",
      duration: "Sep 2021 \u2013 June 2024",
      location: "Bengaluru, India",
      details: [
        "Developed Automated Underwriting Model for Term Products using advanced ML techniques, accelerating policy issuance and significantly reducing turnaround time through end-to-end pipeline from EDA to production deployment.",
        "Built Term Withdrawal Aversion segmentation model achieving 7% reduction in cancellations and 5% increase in issuance rates by leveraging customer demographic, geographic, and credit bureau profiles.",
        "Revamped 13th month Persistency Model to predict second premium payment probability, improving persistency rate by 1.3%."
      ]
    },
    {
      id: "flytxt",
      company: "Flytxt",
      website: "https://www.flytxt.com/",
      role: "Data Scientist",
      duration: "July 2019 \u2013 Sep 2021",
      location: "Mumbai, India",
      details: [
        "Developed scalable Cross-Sell and Up-Sell recommender systems leveraging domain KPIs with Random Forests, deployed for telecom clients.",
        "Implemented distributed Mixture Models for customer segmentation using Spark RDDs, achieving significant performance speedup over single-node implementations.",
        "Built Aspect-based Sentiment Analysis pipeline using CRFs and embeddings for processing telecom customer reviews at scale."
      ]
    }
  ];

  const [activeId, setActiveId] = useState(experiences[0].id);

  const activeExp = experiences.find(e => e.id === activeId)!;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="relative mb-16 text-center">
          <h2 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] md:text-[6rem] font-bold text-slate-800 opacity-50 whitespace-nowrap z-0 select-none pointer-events-none">
            Experience
          </h2>
          <h3 className="relative text-4xl md:text-5xl font-heading font-bold text-white z-10 pt-4">
            Where I've worked
          </h3>
        </div>

        {/* Terminal Window Design */}
        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50 bg-[#0f111a] font-mono hover:border-slate-600 transition-colors duration-500">
          
          {/* Terminal Header */}
          <div className="bg-[#1a1c23] px-4 py-3 flex items-center gap-2 border-b border-slate-700/50 relative">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-400 text-sm font-medium">
              <Terminal size={14} className="text-slate-500" />
              <span>bash - ashutosh@portfolio ~</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="flex flex-col md:flex-row min-h-[450px]">
            
            {/* Sidebar / File List */}
            <div className="md:w-[35%] lg:w-1/3 border-b md:border-b-0 md:border-r border-slate-800/80 p-4 md:p-6 bg-[#0f111a]">
              <div className="text-slate-400 mb-6 flex items-center gap-2 text-sm md:text-base">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400 hidden lg:inline">~/experience</span>
                <span className="text-blue-400 lg:hidden">~</span>
                <span className="text-slate-300">ls -1</span>
              </div>
              
              <ul className="space-y-2">
                {experiences.map((exp) => (
                  <li key={exp.id}>
                    <button
                      onClick={() => setActiveId(exp.id)}
                      className={`w-full text-left px-3 py-2.5 rounded transition-all duration-200 group flex items-baseline gap-2 text-sm md:text-base
                        ${activeId === exp.id 
                          ? 'bg-slate-800/80 text-emerald-400 font-semibold' 
                          : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}
                      `}
                    >
                      <span className={`text-xs opacity-50 group-hover:opacity-100 transition-opacity ${activeId === exp.id ? 'text-emerald-400 opacity-100' : ''}`}>
                        &gt;
                      </span>
                      {exp.id}.md
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content Area */}
            <div className="md:w-[65%] lg:w-2/3 p-4 md:p-6 bg-[#0a0c10] overflow-y-auto max-h-[500px] md:max-h-[600px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <div className="text-slate-400 mb-6 flex items-center gap-2 text-sm md:text-base">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400 hidden lg:inline">~/experience</span>
                <span className="text-blue-400 lg:hidden">~</span>
                <span className="text-slate-300">cat <span className="text-emerald-300">{activeExp.id}.md</span></span>
              </div>

              {/* Added key based on ID to force re-animation when switching tabs */}
              <div key={activeExp.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h4 className="text-2xl font-bold text-slate-100 mb-2 font-sans tracking-tight">{activeExp.role}</h4>
                <div className="flex items-center gap-2 text-primary mb-4 text-sm md:text-base font-sans">
                  <span className="text-emerald-400 font-mono">@</span>
                  <a 
                    href={activeExp.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-lg hover:underline decoration-primary/50 underline-offset-4 transition-all"
                  >
                    {activeExp.company}
                  </a>
                </div>
                
                <div className="text-slate-500 text-sm mb-6 flex flex-wrap gap-x-6 gap-y-2 font-sans border-b border-slate-800 pb-4">
                  <span><span className="text-slate-600 font-mono text-xs uppercase tracking-wider">Date </span> <br className="md:hidden"/> {activeExp.duration}</span>
                  <span><span className="text-slate-600 font-mono text-xs uppercase tracking-wider">Loc </span> <br className="md:hidden"/> {activeExp.location}</span>
                </div>

                <div className="text-slate-300 leading-relaxed font-sans space-y-4 text-sm md:text-base">
                  {activeExp.details.map((detail, idx) => (
                    <div key={idx} className="flex gap-3 group">
                      <span className="text-slate-600 select-none group-hover:text-primary transition-colors">-</span>
                      <p className="group-hover:text-slate-200 transition-colors">{detail}</p>
                    </div>
                  ))}
                </div>
                
                {/* Blinking cursor at the end */}
                <div className="mt-8 flex items-center gap-2 text-sm md:text-base">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400 hidden lg:inline">~/experience</span>
                  <span className="text-blue-400 lg:hidden">~</span>
                  <span className="w-2.5 h-5 bg-slate-400/80 animate-pulse inline-block align-middle ml-1"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
