"use client";

import Navbar from "../components/Navbar";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally integrate with form processing here
    alert("Form submission simulated.");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 relative flex flex-col justify-center">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
              Contact Me
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Want to get in touch? Fill out the form below to send me a message and
              I will get back to you as soon as possible!
            </p>
          </div>

          <div className="glass-card p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-400 ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 border-b-2 border-b-slate-600 rounded-lg px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-b-primary focus:bg-slate-800 focus:ring-0 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 border-b-2 border-b-slate-600 rounded-lg px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-b-primary focus:bg-slate-800 focus:ring-0 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-slate-400 ml-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 border-b-2 border-b-slate-600 rounded-lg px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-b-primary focus:bg-slate-800 focus:ring-0 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-400 ml-1">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Enter your message"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 border-b-2 border-b-slate-600 rounded-lg px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-b-primary focus:bg-slate-800 focus:ring-0 transition-all font-medium resize-none"
                ></textarea>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto md:px-12 py-4 text-lg shadow-lg shadow-primary/25"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
