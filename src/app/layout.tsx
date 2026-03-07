import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ashutosh Kushwaha | Data Scientist',
  description: 'Personal Portfolio of Ashutosh Kushwaha - Data Scientist, Predictive Modelling and Machine Learning.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="antialiased bg-slate-900 text-slate-50 font-sans min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
