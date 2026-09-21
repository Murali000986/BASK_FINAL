import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ChatWidget from './components/ChatWidget';

function WithLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ChatWidget />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin — no navbar/footer */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Public pages */}
        <Route path="/" element={<WithLayout><Home /></WithLayout>} />
        <Route path="/services" element={<WithLayout><Services /></WithLayout>} />
        <Route path="/case-studies" element={<WithLayout><CaseStudies /></WithLayout>} />
        <Route path="/about" element={<WithLayout><About /></WithLayout>} />
        <Route path="/contact" element={<WithLayout><Contact /></WithLayout>} />
        <Route path="/faq" element={<WithLayout><Faq /></WithLayout>} />
        <Route path="/blog" element={<WithLayout><Blog /></WithLayout>} />
        <Route path="/blog/:slug" element={<WithLayout><BlogPost /></WithLayout>} />
        <Route path="/careers" element={<WithLayout><Careers /></WithLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
