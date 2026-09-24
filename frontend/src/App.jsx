import { useEffect, useState } from 'react';
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
  const [inAppNotif, setInAppNotif] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW:', err));
    }

    let channel = null;

    function subscribeToNotifications(session) {
      if (!session) return;

      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }

      // Clean up any previous channel before creating a new one
      if (channel) supabase.removeChannel(channel);

      channel = supabase.channel(`notif:${session.user.id}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${session.user.id}`
        }, (payload) => {
          const msg = payload.new.message;
          // 1. In-App toast (always works, even on mobile)
          setInAppNotif(msg);
          setTimeout(() => setInAppNotif(null), 8000);
          // 2. Native OS notification (desktop only)
          if ('Notification' in window && Notification.permission === 'granted') {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.ready.then(reg => reg.showNotification('BASK Agency', { body: msg, icon: '/logo.png' }));
            } else {
              new Notification('BASK Agency', { body: msg, icon: '/logo.png' });
            }
          }
        })
        .subscribe((status) => console.log('Realtime status:', status));
    }

    // Subscribe immediately if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => subscribeToNotifications(session));

    // Also subscribe on login, unsubscribe on logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) {
        subscribeToNotifications(session);
      } else {
        if (channel) { supabase.removeChannel(channel); channel = null; }
      }
    });

    return () => {
      subscription.unsubscribe();
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  return (
    <BrowserRouter>
      {inAppNotif && (
        <div style={{
          position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 99999,
          background: '#09090b', color: '#fff', padding: '16px 24px', borderRadius: 16,
          boxShadow: '0 16px 40px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 16,
          minWidth: 320, animation: 'fadeDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <img src="/logo.png" alt="BASK" style={{ width: 24, height: 24, borderRadius: '50%' }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Admin Broadcast</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{inAppNotif}</div>
          </div>
          <button onClick={() => setInAppNotif(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', fontSize: 20 }}>✕</button>
        </div>
      )}
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
