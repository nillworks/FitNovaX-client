import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/Shared/Navbar';
import Footer from '@/Components/HomePageUi/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'FitNova - Premium Fitness Platform',
  description: 'Join the ultimate community of expert trainers and passionate members. Transform your body and mind with personalized programs and top-tier classes.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" richColors />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
