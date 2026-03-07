"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/akushwaha9808@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
                  name="name"
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
                  name="email"
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
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 border-b-2 border-b-slate-600 rounded-lg px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-b-primary focus:bg-slate-800 focus:ring-0 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-400 ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Enter your message"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 border-b-2 border-b-slate-600 rounded-lg px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-b-primary focus:bg-slate-800 focus:ring-0 transition-all font-medium resize-none"
                ></textarea>
              </div>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg text-center font-medium">
                  Thanks for reaching out! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-center font-medium">
                  Oops, something went wrong. Please try again or email me directly.
                </div>
              )}

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto md:px-12 py-4 text-lg shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
