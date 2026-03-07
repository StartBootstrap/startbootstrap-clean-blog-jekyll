import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import TechStack from "./components/TechStack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <TechStack />
      </main>
      <footer className="py-8 text-center text-slate-500 border-t border-slate-800 bg-slate-900/50 mt-12">
        <p>&copy; {new Date().getFullYear()} Ashutosh Kushwaha. Built with Next.js</p>
      </footer>
    </>
  );
}
