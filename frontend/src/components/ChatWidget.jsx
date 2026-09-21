import { useState, useRef, useEffect } from 'react';
import { api } from '../api';
import ReactMarkdown from 'react-markdown';
import defaultGif from '../assets/ai/default.gif';
import notificationGif from '../assets/ai/notification.gif';
import seeingTypeGif from '../assets/ai/seeing_type.gif';
import thinkingGif from '../assets/ai/thinking.gif';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I am BASK. Ask me anything about our services, pricing, or methodology.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const PRESETS = [
    { label: 'About Services', reply: 'We manage full-funnel digital growth: Paid Media (Meta, Google, TikTok, LinkedIn), Technical SEO, CRO (Landing Pages), and advanced Email Lifecycle marketing.' },
    { label: 'Pricing Model', reply: 'We don\'t do cookie-cutter pricing. We run custom fixed-fee pilots first, and then transition to a flat retainer plus a performance bonus tied directly to revenue growth.' },
    { label: 'Why BASK?', reply: 'We offer zero long-term contracts, radical dashboard transparency, and we never execute blindly without building a 90-day action plan with you first.' }
  ];

  const handleQuickReply = (preset) => {
    setMessages(prev => [
      ...prev,
      { role: 'user', content: preset.label },
      { role: 'assistant', content: preset.reply }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    
    setInput('');
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('https://bask-final.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      
      setMessages([...newMessages, { role: 'assistant', content: data.reply || "Sorry, I couldn't compute that." }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "Network error trying to reach my brain. Ensure the backend is running." }]);
    }
    setLoading(false);
  }

  let currentGif = defaultGif;
  if (loading) currentGif = thinkingGif;
  else if (input.trim().length > 0) currentGif = seeingTypeGif;

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-window animate-fade-up">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src={currentGif} alt="AI Avatar" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', transform: 'scale(1.2)' }} />
              <span style={{ fontWeight: 700 }}>BASK AI</span>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>
              <span className="material-icons" style={{ fontSize: 18 }}>close</span>
            </button>
          </div>
          
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message chat-message--${m.role}`}>
                {m.role === 'assistant'
                  ? <ReactMarkdown>{m.content}</ReactMarkdown>
                  : m.content
                }
              </div>
            ))}
            {loading && (
              <div className="chat-message chat-message--assistant" style={{ padding: '4px 12px', background: 'transparent' }}>
                <img src={thinkingGif} alt="Thinking..." style={{ height: 24, borderRadius: 4 }} />
              </div>
            )}
            
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              {PRESETS.map((p, i) => (
                <button 
                  key={i} 
                  onClick={() => handleQuickReply(p)}
                  disabled={loading}
                  style={{ background: 'var(--gray-200)', border: 'none', borderRadius: 16, padding: '6px 12px', fontSize: 12, cursor: loading ? 'not-allowed' : 'pointer', color: 'var(--black)' }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-footer" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask about pricing, audits..." 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              <span className="material-icons" style={{ fontSize: 18 }}>send</span>
            </button>
          </form>
        </div>
      )}

      {!open && (
        <button className="chat-fab animate-fade-up delay-400" onClick={() => setOpen(true)} style={{ background: 'var(--black)', color: 'var(--white)', padding: 0, overflow: 'hidden' }}>
          <img src={notificationGif} alt="Chat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      )}
    </div>
  );
}
