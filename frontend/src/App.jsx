import { useEffect } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import Contact from './pages/Contact';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Faq from './pages/Faq';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ChatWidget from './components/ChatWidget';
import CookieBanner from './components/CookieBanner';
import { supabase } from './supabaseClient';

import Showcase from './pages/Showcase';
import SeoLanding from './pages/services/SeoLanding';
import GoogleAdsLanding from './pages/services/GoogleAdsLanding';
import MetaAdsLanding from './pages/services/MetaAdsLanding';

function WithLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ChatWidget />
      <CookieBanner />
      <Footer />
    </>
  );
}

export default function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission();
        }
        
        const channel = supabase.channel('realtime:notifications')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${session.user.id}` }, (payload) => {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('BASK Agency', { body: payload.new.message, icon: '/logo.png' });
            } else {
              alert(`From Admin: ${payload.new.message}`);
            }
          })
          .subscribe();
          
        return () => supabase.removeChannel(channel);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) return;
      if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin — no navbar/footer */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Public pages */}
        <Route path="/" element={<WithLayout><Home /></WithLayout>} />
        <Route path="/showcase" element={<WithLayout><Showcase /></WithLayout>} />
        <Route path="/services" element={<WithLayout><Services /></WithLayout>} />
        <Route path="/services/seo-company-bangalore" element={<WithLayout><SeoLanding /></WithLayout>} />
        <Route path="/services/google-ads-agency-bangalore" element={<WithLayout><GoogleAdsLanding /></WithLayout>} />
        <Route path="/services/meta-ads-agency-bangalore" element={<WithLayout><MetaAdsLanding /></WithLayout>} />
        <Route path="/case-studies" element={<WithLayout><CaseStudies /></WithLayout>} />
        <Route path="/about" element={<WithLayout><About /></WithLayout>} />
        <Route path="/contact" element={<WithLayout><Contact /></WithLayout>} />
        <Route path="/onboarding" element={<WithLayout><Onboarding /></WithLayout>} />
        <Route path="/login" element={<WithLayout><Login /></WithLayout>} />
        <Route path="/faq" element={<WithLayout><Faq /></WithLayout>} />
        <Route path="/blog" element={<WithLayout><Blog /></WithLayout>} />
        <Route path="/blog/:slug" element={<WithLayout><BlogPost /></WithLayout>} />
        <Route path="/careers" element={<WithLayout><Careers /></WithLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
