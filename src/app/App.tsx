import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Analytics } from './pages/Analytics';
import { Reviews } from './pages/Reviews';
import { ReviewDetail } from './pages/ReviewDetail';
import { CommentaryDetail } from './pages/CommentaryDetail';
import { Challenges } from './pages/Challenges';
import { About } from './pages/About';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Toaster position="top-right" richColors />
        <Navigation />
        <main className="p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archives" element={<Analytics />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/review/:id" element={<ReviewDetail />} />
            <Route path="/commentary/:id" element={<CommentaryDetail />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}