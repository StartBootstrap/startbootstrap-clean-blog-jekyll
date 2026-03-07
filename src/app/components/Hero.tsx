import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
      {/* Dynamic abstract background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="relative mb-8">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-slate-700 shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-transform duration-500 hover:scale-105 hover:border-primary">
          <Image
            src="/img/my_img.jpeg"
            alt="Ashutosh Kushwaha"
            width={160}
            height={160}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-sm">
        Ashutosh Kushwaha
      </h1>

      <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl">
        Data Scientist | IIT Bombay | Predictive Modelling
      </p>

      <div className="mt-8 flex gap-4">
        <a href="#about" className="btn-primary">
          About Me
        </a>
        <a 
          href="/contact" 
          className="px-6 py-2.5 rounded-full border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transition-all font-medium"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
