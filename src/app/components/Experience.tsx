import { MapPin, CheckCircle2 } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      company: "Tata Digital (Tata Neu)",
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
      company: "HDFC Life Insurance",
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
      company: "Flytxt",
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

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="relative mb-16 text-center">
          <h2 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] md:text-[6rem] font-bold text-slate-800 opacity-50 whitespace-nowrap z-0 select-none">
            Experience
          </h2>
          <h3 className="relative text-4xl md:text-5xl font-heading font-bold text-white z-10 pt-4">
            Where I've worked
          </h3>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-700 group-hover:bg-primary group-hover:border-primary/30 text-slate-300 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300 ml-0 md:ml-0 md:absolute md:left-1/2 shadow-lg shadow-black/50">
                <CheckCircle2 size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 md:p-8 relative overflow-hidden group-hover:border-slate-500 transition-colors duration-300">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                
                <div className="flex flex-col mb-4">
                  <h4 className="text-2xl font-bold text-white mb-1 font-heading">{exp.company}</h4>
                  <p className="text-primary font-medium text-lg leading-tight mb-3">{exp.role}</p>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-slate-300 font-medium bg-slate-800/80 px-3 py-1 rounded-full text-xs font-mono border border-slate-700 shadow-sm">{exp.duration}</span>
                    <span className="text-slate-400 text-sm flex items-center gap-1">
                      <MapPin size={14} className="text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-3 mt-6">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-300 leading-relaxed text-sm md:text-base group/item">
                      <span className="text-slate-600 group-hover/item:text-primary mt-1 flex-shrink-0 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span className="group-hover/item:text-slate-200 transition-colors">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
