import './globals.css';
import Navbar from '../components/Navbar';
import { ClarixProvider } from '../context/ClarixContext';

export const metadata = {
  title: 'Clarix AI | Enterprise Document Intelligence',
  description: 'AI-powered PDF summarizer and MCQ generator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClarixProvider>
          <Navbar />
          <main className="min-h-screen pt-16 flex flex-col">
            {children}
          </main>
        </ClarixProvider>
      </body>
    </html>
  );
}
