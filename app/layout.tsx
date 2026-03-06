import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NanoPredict AI | Material Analysis',
  description: 'AI-Powered Nanomaterial property prediction engine',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-blue-500/30">
        <main>{children}</main>
      </body>
    </html>
  );
}
