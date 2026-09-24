import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { supabase } from '../supabaseClient';

const TABS = ['Dashboard', 'Proposals', 'Users', 'Notifications', 'Blogs', 'Services', 'Careers', 'Applications'];

function StatCard({ icon, label, value, sub }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 16, padding: 24, display: 'flex', gap: 20, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', transition: 'transform 0.2s', cursor: 'default' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
      <div style={{ width: 56, height: 56, background: '#f4f4f5', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, color: '#09090b' }}>{icon}</div>
      <div>
        <p style={{ fontSize: 32, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: '#09090b', marginBottom: 4 }}>{value}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#71717a' }}>{label}</p>
        {sub && <p style={{ fontSize: 11, color: '#a1a1aa', marginTop: 4 }}>{sub}</p>}
      </div>
    </div>
  );
}

function AlertBanner({ type, msg, onClose }) {
  if (!msg) return null;
  const isErr = type === 'error';
  return (
    <div style={{ background: isErr ? '#fef2f2' : '#f0fdf4', border: `1px solid ${isErr ? '#fecaca' : '#bbf7d0'}`, borderRadius: 12, padding: '14px 16px', marginBottom: 24, color: isErr ? '#dc2626' : '#16a34a', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 500 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-icons" style={{ fontSize: 20 }}>{isErr ? 'error_outline' : 'check_circle'}</span> 
        {msg}
      </span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'inherit', opacity: .6 }}>✕</button>
    </div>
  );
}

// ── Dashboard Tab ──────────────────────────────────────────────────────────────
function DashboardTab() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    async function loadStats() {
      const [{ count: proposals }, { count: blogs }, { count: careers }, { count: applications }] = await Promise.all([
        supabase.from('proposals').select('*', { count: 'exact', head: true }),
        supabase.from('blogs').select('*', { count: 'exact', head: true }),
        supabase.from('careers').select('*', { count: 'exact', head: true }),
        supabase.from('applications').select('*', { count: 'exact', head: true }),
      ]);
      setStats({ proposals, blogs, careers, applications, subscribers: 0 });
    }
    loadStats();
  }, []);
  if (!stats) return <div style={{ color: '#a1a1aa', padding: 40, fontFamily: 'monospace' }}>Loading telemetry…</div>;
  return (
    <div>
      <h2 style={{ marginBottom: 28, fontSize: 28, letterSpacing: '-0.03em' }}>Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
        <StatCard icon={<span className="material-icons" style={{ fontSize: 28 }}>description</span>} label="Proposals" value={stats.proposals} sub="Form submissions" />
        <StatCard icon={<span className="material-icons" style={{ fontSize: 28 }}>article</span>} label="Blog Posts" value={stats.blogs} sub="Published articles" />
        <StatCard icon={<span className="material-icons" style={{ fontSize: 28 }}>work</span>} label="Open Roles" value={stats.careers} sub="Active listings" />
        <StatCard icon={<span className="material-icons" style={{ fontSize: 28 }}>inbox</span>} label="Applications" value={stats.applications} sub="Job applications" />
        <StatCard icon={<span className="material-icons" style={{ fontSize: 28 }}>group</span>} label="Subscribers" value={stats.subscribers} sub="Newsletter list" />
      </div>
    </div>
  );
}

// ── Proposals Tab ──────────────────────────────────────────────────────────────
function ProposalsTab() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    supabase.from('proposals').select('*').order('submitted_at', { ascending: false }).then(({ data }) => {
      if (data) setItems(data.map(p => ({ ...p, submittedAt: p.submitted_at })));
    });
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 28, fontSize: 28, letterSpacing: '-0.03em' }}>Contact Form Submissions <span style={{ color: '#a1a1aa', fontWeight: 500, fontSize: 20 }}>({items.length})</span></h2>
      {items.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed #e4e4e7', borderRadius: 16, textAlign: 'center', padding: 60, color: '#a1a1aa' }}>No submissions yet.</div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#fafafa', borderBottom: '1px solid #e4e4e7' }}>
                  {['Name/Contact', 'Email', 'Service', 'Budget', 'Source', 'Submitted'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '16px', fontWeight: 600, fontSize: 12, color: '#71717a' }}>{h}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f4f4f5' }}>
                    <td style={{ padding: '16px', fontWeight: 600 }}>{p.contact || p.company || '—'}</td>
                    <td style={{ padding: '16px' }}><a href={`mailto:${p.email}`} style={{ color: '#0ea5e9', textDecoration: 'none' }}>{p.email}</a></td>
                    <td style={{ padding: '16px' }}>{p.service || p.goal || '—'}</td>
                    <td style={{ padding: '16px' }}>{p.budget || '—'}</td>
                    <td style={{ padding: '16px' }}>{p.source || '—'}</td>
                    <td style={{ padding: '16px', color: '#a1a1aa', whiteSpace: 'nowrap' }}>{new Date(p.submittedAt).toLocaleDateString('en-IN')}</td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button style={{ background: '#f4f4f5', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#3f3f46', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = '#e4e4e7'} onMouseLeave={e => e.target.style.background = '#f4f4f5'} onClick={() => setSelected(p)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(9,9,11,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto', borderRadius: 24, boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid #e4e4e7' }}>
              <h3 style={{ margin: 0, fontSize: 20 }}>Brief / Proposal Details</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#a1a1aa' }}>✕</button>
            </div>
            <div style={{ padding: '24px 32px' }}>
              {[['Contact Name', selected.contact], ['Email', selected.email], ['Phone', selected.phone], ['Service Needed', selected.service || selected.goal], ['Budget', selected.budget], ['Source', selected.source], ['Company', selected.company], ['Company Size', selected.size], ['Timeline', selected.timeline], ['Description', selected.description], ['Submitted', new Date(selected.submittedAt).toLocaleString('en-IN')]]
                .filter(([_, v]) => v) // filter out empty values since new form doesn't use company/size/timeline
                .map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, padding: '12px 0', borderBottom: '1px solid #f4f4f5', fontSize: 14 }}>
                  <span style={{ fontWeight: 500, color: '#71717a' }}>{k}</span>
                  <span style={{ wordBreak: 'break-word', color: '#09090b' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ... BlogsTab, ServicesTab, CareersTab, ApplicationsTab with similar modern styling applied
// Updating just the container and common elements for brevity, applying similar logic.

// ── Users Tab ────────────────────────────────────────────────────────────────
function UsersTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 28, letterSpacing: '-0.03em' }}>Registered Users</h2>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e4e4e7', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: '1px solid #e4e4e7' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: '#71717a' }}>User</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: '#71717a' }}>Email</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: '#71717a' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" style={{ padding: '32px 24px', textAlign: 'center', color: '#a1a1aa' }}>Loading users...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan="3" style={{ padding: '32px 24px', textAlign: 'center', color: '#a1a1aa' }}>No users found.</td></tr>
            ) : (
              items.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #f4f4f5' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {u.avatar_url ? (
                        <img src={u.avatar_url} alt="Profile" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                          {(u.full_name?.[0] || u.email?.[0] || 'U').toUpperCase()}
                        </div>
                      )}
                      <span style={{ fontWeight: 600, color: '#09090b', fontSize: 14 }}>{u.full_name || 'Anonymous'}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#3f3f46' }}>{u.email}</td>
                  <td style={{ padding: '16px 24px', color: '#71717a' }}>{new Date(u.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Notifications Tab (Realtime Web Pushes) ──────────────────────────────────
function NotificationsTab() {
  const [msg, setMsg] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    supabase.from('profiles').select('id, email, full_name').then(({ data }) => setUsers(data || []));
  }, []);

  const toggleUser = (id) => {
    const next = new Set(selectedUserIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedUserIds(next);
  };
  const selectAll = () => setSelectedUserIds(new Set(users.map(u => u.id)));
  const clearAll = () => setSelectedUserIds(new Set());

  const sendNotification = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return setStatus('⚠️ Please enter a message.');
    if (selectedUserIds.size === 0) return setStatus('⚠️ Please select at least one user.');
    setSending(true); setStatus('');
    
    const inserts = Array.from(selectedUserIds).map(id => ({ user_id: id, message: msg.trim() }));
    const { error } = await supabase.from('notifications').insert(inserts);
    
    setSending(false);
    if (error) setStatus('❌ Failed to send notifications.');
    else {
      setStatus(`✅ Sent notification to ${selectedUserIds.size} user(s)!`);
      setMsg('');
      setSelectedUserIds(new Set());
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 28, fontSize: 28, letterSpacing: '-0.03em' }}>Push Notifications</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 32 }}>
        <form onSubmit={sendNotification} style={{ background: '#fff', padding: 32, borderRadius: 16, border: '1px solid #e4e4e7', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#09090b', marginBottom: 8 }}>Message Body</label>
          <textarea value={msg} onChange={e => setMsg(e.target.value)} rows="5" placeholder="Type notification message here..."
            style={{ width: '100%', padding: '16px', border: '1.5px solid #e4e4e7', borderRadius: 12, fontSize: 14, fontFamily: 'inherit', resize: 'vertical', display: 'block', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
            <span style={{ fontSize: 13, color: '#3f3f46', fontWeight: 500 }}>{selectedUserIds.size} recipient(s) selected</span>
            <button type="submit" disabled={sending} style={{ padding: '12px 24px', background: sending ? '#d4d4d8' : '#09090b', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer' }}>
              {sending ? 'Sending...' : 'Send Web Push 🚀'}
            </button>
          </div>
          {status && <div style={{ marginTop: 16, fontSize: 14, fontWeight: 500, color: status.includes('✅') ? '#16a34a' : '#dc2626' }}>{status}</div>}
        </form>

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e4e4e7', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '400px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#09090b' }}>Recipients</span>
            <div style={{ display: 'flex', gap: 8 }}>
               <button type="button" onClick={selectAll} style={{ fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 600 }}>All</button>
               <button type="button" onClick={clearAll} style={{ fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', fontWeight: 600 }}>Clear</button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {users.length === 0 ? (
               <div style={{ padding: 24, textAlign: 'center', color: '#a1a1aa', fontSize: 13 }}>No users found</div>
            ) : (
               users.map(u => (
                 <label key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #f4f4f5', cursor: 'pointer' }}>
                   <input type="checkbox" checked={selectedUserIds.has(u.id)} onChange={() => toggleUser(u.id)} style={{ cursor: 'pointer', width: 16, height: 16 }} />
                   <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <span style={{ fontSize: 13, fontWeight: 600, color: '#09090b', lineHeight: 1.2 }}>{u.full_name || 'Anonymous User'}</span>
                     <span style={{ fontSize: 11, color: '#71717a' }}>{u.email}</span>
                   </div>
                 </label>
               ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Blogs Tab ──────────────────────────────────────────────────────────────────
function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [banner, setBanner] = useState({ type: '', msg: '' });
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', category: '', excerpt: '', content: '', author: 'BASK Team', coverImage: '' });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => api.admin.getBlogs().then(setBlogs).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  function openNew() { setForm({ title: '', slug: '', category: '', excerpt: '', content: '', author: 'BASK Team', coverImage: '' }); setEditItem(null); setFormErrors({}); setShowForm(true); }
  function openEdit(b) { setForm({ title: b.title, slug: b.slug, category: b.category, excerpt: b.excerpt || '', content: b.content, author: b.author, coverImage: b.coverImage || '' }); setEditItem(b); setFormErrors({}); setShowForm(true); }

  function autoSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function setF(k, v) {
    setForm(f => {
      const updated = { ...f, [k]: v };
      if (k === 'title' && !editItem) updated.slug = autoSlug(v);
      return updated;
    });
    setFormErrors(e => ({ ...e, [k]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.slug.trim()) e.slug = 'Slug is required';
    if (!form.content.trim()) e.content = 'Content is required';
    return e;
  }

  async function save() {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setSaving(true);
    try {
      if (editItem) await api.admin.updateBlog(editItem.id, form);
      else await api.admin.createBlog(form);
      setBanner({ type: 'success', msg: editItem ? 'Blog updated successfully.' : 'Blog post published.' });
      setShowForm(false);
      load();
    } catch (err) {
      if (err.data?.errors) setFormErrors(err.data.errors);
      else setBanner({ type: 'error', msg: err.message || 'Save failed. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  async function del(id) {
    if (!confirm('Delete this blog post?')) return;
    try {
      await api.admin.deleteBlog(id);
      setBanner({ type: 'success', msg: 'Blog post deleted.' });
      load();
    } catch { setBanner({ type: 'error', msg: 'Delete failed.' }); }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h2 style={{ fontSize: 28, letterSpacing: '-0.03em', margin: 0 }}>Blog Posts <span style={{ color: '#a1a1aa', fontWeight: 500, fontSize: 20 }}>({blogs.length})</span></h2>
        <button onClick={openNew} style={{ background: '#09090b', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }}>+ New Post</button>
      </div>
      <AlertBanner type={banner.type} msg={banner.msg} onClose={() => setBanner({ type: '', msg: '' })} />

      {blogs.length === 0 && !showForm ? (
        <div style={{ background: '#fff', border: '1px dashed #e4e4e7', borderRadius: 16, textAlign: 'center', padding: 60, color: '#a1a1aa' }}>No blog posts yet. Create your first post.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {blogs.map(b => (
            <div key={b.id} style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 16, padding: '20px', display: 'flex', gap: 20, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              {b.coverImage ? (
                 <img src={b.coverImage} alt={b.title} style={{ width: 100, height: 72, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
              ) : (
                 <div style={{ width: 100, height: 72, background: '#f4f4f5', borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa', fontSize: 12 }}>No Image</div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 4, color: '#09090b' }}>{b.title}</p>
                <p style={{ fontSize: 13, color: '#71717a' }}>{b.category} · /{b.slug} · {new Date(b.publishedAt).toLocaleDateString('en-IN')}</p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                <a href={`/blog/${b.slug}`} target="_blank" rel="noreferrer" style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, background: '#f4f4f5', border: 'none', borderRadius: 8, color: '#3f3f46', textDecoration: 'none' }}>View</a>
                <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, background: '#f4f4f5', border: 'none', borderRadius: 8, color: '#3f3f46', cursor: 'pointer' }} onClick={() => openEdit(b)}>Edit</button>
                <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', borderRadius: 8, cursor: 'pointer' }} onClick={() => del(b.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(9,9,11,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 680, maxHeight: '90vh', overflowY: 'auto', borderRadius: 24, boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid #e4e4e7' }}>
              <h3 style={{ margin: 0, fontSize: 20 }}>{editItem ? 'Edit Post' : 'New Blog Post'}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#a1a1aa' }}>✕</button>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Title <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.title} onChange={e => setF('title', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${formErrors.title ? '#ef4444' : '#e4e4e7'}`, borderRadius: 8, fontSize: 14 }} />
                {formErrors.title && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>⚠ {formErrors.title}</p>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Slug <span style={{ color: '#ef4444' }}>*</span></label>
                  <input value={form.slug} onChange={e => setF('slug', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${formErrors.slug ? '#ef4444' : '#e4e4e7'}`, borderRadius: 8, fontSize: 14 }} />
                  {formErrors.slug && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>⚠ {formErrors.slug}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Category</label>
                  <input value={form.category} onChange={e => setF('category', e.target.value)} placeholder="e.g., SEO & Content" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 14 }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Author</label>
                  <input value={form.author} onChange={e => setF('author', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Cover Image URL</label>
                  <input value={form.coverImage} onChange={e => setF('coverImage', e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '12px 16px', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 14 }} />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Excerpt</label>
                <input value={form.excerpt} onChange={e => setF('excerpt', e.target.value)} placeholder="Short summary shown on blog listing" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 14 }} />
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Content <span style={{ color: '#ef4444' }}>*</span></label>
                <textarea rows={10} value={form.content} onChange={e => setF('content', e.target.value)} placeholder="Write your blog content here. Use ## for headings, - for bullet points." style={{ width: '100%', padding: '12px 16px', border: `1px solid ${formErrors.content ? '#ef4444' : '#e4e4e7'}`, borderRadius: 8, fontSize: 14, fontFamily: 'monospace' }} />
                {formErrors.content && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>⚠ {formErrors.content}</p>}
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={save} disabled={saving} style={{ padding: '14px 24px', background: '#09090b', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving…' : editItem ? 'Update Post' : 'Publish Post'}</button>
                <button onClick={() => setShowForm(false)} style={{ padding: '14px 24px', background: '#fff', color: '#09090b', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Services Tab ───────────────────────────────────────────────────────────────
function ServicesTab() {
  const [services, setServices] = useState([]);
  const [banner, setBanner] = useState({ type: '', msg: '' });
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', icon: 'star' });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => api.admin.getServices().then(setServices).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  function openNew() { setForm({ title: '', description: '', icon: 'star' }); setEditItem(null); setFormErrors({}); setShowForm(true); }
  function openEdit(s) { setForm({ title: s.title, description: s.description, icon: s.icon || 'star' }); setEditItem(s); setFormErrors({}); setShowForm(true); }
  function setF(k, v) { setForm(f => ({ ...f, [k]: v })); setFormErrors(e => ({ ...e, [k]: '' })); }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  }

  async function save() {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setSaving(true);
    try {
      if (editItem) await api.admin.updateService(editItem.id, form);
      else await api.admin.createService(form);
      setBanner({ type: 'success', msg: editItem ? 'Service updated.' : 'Service created.' });
      setShowForm(false);
      load();
    } catch (err) {
      setBanner({ type: 'error', msg: err.message || 'Save failed.' });
    } finally {
      setSaving(false);
    }
  }

  async function del(id) {
    if (!confirm('Delete this service?')) return;
    try {
      await api.admin.deleteService(id);
      setBanner({ type: 'success', msg: 'Service deleted.' });
      load();
    } catch { setBanner({ type: 'error', msg: 'Delete failed.' }); }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h2 style={{ fontSize: 28, letterSpacing: '-0.03em', margin: 0 }}>Services <span style={{ color: '#a1a1aa', fontWeight: 500, fontSize: 20 }}>({services.length})</span></h2>
        <button onClick={openNew} style={{ background: '#09090b', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>+ Add Service</button>
      </div>
      <AlertBanner type={banner.type} msg={banner.msg} onClose={() => setBanner({ type: '', msg: '' })} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {services.map(s => (
          <div key={s.id} style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, background: '#f4f4f5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-icons" style={{ fontSize: 24, color: '#3f3f46' }}>{s.icon}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: '6px 12px', fontSize: 12, fontWeight: 500, background: '#f4f4f5', border: 'none', borderRadius: 6, color: '#3f3f46', cursor: 'pointer' }} onClick={() => openEdit(s)}>Edit</button>
                <button style={{ padding: '6px 12px', fontSize: 12, fontWeight: 500, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', borderRadius: 6, cursor: 'pointer' }} onClick={() => del(s.id)}>Delete</button>
              </div>
            </div>
            <p style={{ fontWeight: 600, fontSize: 18, marginBottom: 8, color: '#09090b' }}>{s.title}</p>
            <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.6 }}>{s.description}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(9,9,11,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 520, borderRadius: 24, boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid #e4e4e7' }}>
              <h3 style={{ margin: 0, fontSize: 20 }}>{editItem ? 'Edit Service' : 'New Service'}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#a1a1aa' }}>✕</button>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Title <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.title} onChange={e => setF('title', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${formErrors.title ? '#ef4444' : '#e4e4e7'}`, borderRadius: 8, fontSize: 14 }} />
                {formErrors.title && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>⚠ {formErrors.title}</p>}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Description <span style={{ color: '#ef4444' }}>*</span></label>
                <textarea rows={3} value={form.description} onChange={e => setF('description', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${formErrors.description ? '#ef4444' : '#e4e4e7'}`, borderRadius: 8, fontSize: 14 }} />
                {formErrors.description && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>⚠ {formErrors.description}</p>}
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Material Icon Name</label>
                <input value={form.icon} onChange={e => setF('icon', e.target.value)} placeholder="e.g., trending_up, campaign, search" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 14 }} />
                <p style={{ fontSize: 12, color: '#a1a1aa', marginTop: 8 }}>Find icons at <a href="https://fonts.google.com/icons" target="_blank" rel="noreferrer" style={{ color: '#0ea5e9' }}>fonts.google.com/icons</a></p>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={save} disabled={saving} style={{ padding: '14px 24px', background: '#09090b', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving…' : editItem ? 'Update' : 'Create'}</button>
                <button onClick={() => setShowForm(false)} style={{ padding: '14px 24px', background: '#fff', color: '#09090b', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Careers Tab ────────────────────────────────────────────────────────────────
function CareersTab() {
  const [jobs, setJobs] = useState([]);
  const [banner, setBanner] = useState({ type: '', msg: '' });
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', department: '', type: 'Full-time', location: 'Remote', description: '', requirements: '' });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => api.admin.getCareers().then(setJobs).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  function openNew() { setForm({ title: '', department: '', type: 'Full-time', location: 'Remote', description: '', requirements: '' }); setEditItem(null); setFormErrors({}); setShowForm(true); }
  function openEdit(j) {
    setForm({ title: j.title, department: j.department || '', type: j.type || 'Full-time', location: j.location || 'Remote', description: j.description, requirements: (j.requirements || []).join('\n') });
    setEditItem(j); setFormErrors({}); setShowForm(true);
  }
  function setF(k, v) { setForm(f => ({ ...f, [k]: v })); setFormErrors(e => ({ ...e, [k]: '' })); }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  }

  async function save() {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setSaving(true);
    const payload = { ...form, requirements: form.requirements.split('\n').map(r => r.trim()).filter(Boolean), active: true };
    try {
      if (editItem) await api.admin.updateCareer(editItem.id, payload);
      else await api.admin.createCareer(payload);
      setBanner({ type: 'success', msg: editItem ? 'Job updated.' : 'Job listing created.' });
      setShowForm(false);
      load();
    } catch (err) {
      setBanner({ type: 'error', msg: err.message || 'Save failed.' });
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(job) {
    try {
      await api.admin.updateCareer(job.id, { active: !job.active });
      load();
    } catch { setBanner({ type: 'error', msg: 'Update failed.' }); }
  }

  async function del(id) {
    if (!confirm('Delete this job listing?')) return;
    try {
      await api.admin.deleteCareer(id);
      setBanner({ type: 'success', msg: 'Job listing deleted.' });
      load();
    } catch { setBanner({ type: 'error', msg: 'Delete failed.' }); }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h2 style={{ fontSize: 28, letterSpacing: '-0.03em', margin: 0 }}>Job Listings <span style={{ color: '#a1a1aa', fontWeight: 500, fontSize: 20 }}>({jobs.length})</span></h2>
        <button onClick={openNew} style={{ background: '#09090b', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>+ Post Job</button>
      </div>
      <AlertBanner type={banner.type} msg={banner.msg} onClose={() => setBanner({ type: '', msg: '' })} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {jobs.map(j => (
          <div key={j.id} style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <p style={{ fontWeight: 600, fontSize: 18, color: '#09090b', margin: 0 }}>{j.title}</p>
                <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: j.active ? '#dcfce7' : '#fee2e2', color: j.active ? '#15803d' : '#b91c1c', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{j.active ? 'Active' : 'Inactive'}</span>
              </div>
              <p style={{ fontSize: 14, color: '#71717a' }}>{j.department} · {j.type} · {j.location}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, background: '#f4f4f5', border: 'none', borderRadius: 8, color: '#3f3f46', cursor: 'pointer' }} onClick={() => toggleActive(j)}>{j.active ? 'Deactivate' : 'Activate'}</button>
              <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, background: '#f4f4f5', border: 'none', borderRadius: 8, color: '#3f3f46', cursor: 'pointer' }} onClick={() => openEdit(j)}>Edit</button>
              <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', borderRadius: 8, cursor: 'pointer' }} onClick={() => del(j.id)}>Delete</button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && <div style={{ background: '#fff', border: '1px dashed #e4e4e7', borderRadius: 16, textAlign: 'center', padding: 60, color: '#a1a1aa' }}>No job listings. Post your first role.</div>}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(9,9,11,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto', borderRadius: 24, boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid #e4e4e7' }}>
              <h3 style={{ margin: 0, fontSize: 20 }}>{editItem ? 'Edit Job' : 'Post New Job'}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#a1a1aa' }}>✕</button>
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Job Title <span style={{ color: '#ef4444' }}>*</span></label>
                <input value={form.title} onChange={e => setF('title', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${formErrors.title ? '#ef4444' : '#e4e4e7'}`, borderRadius: 8, fontSize: 14 }} />
                {formErrors.title && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>⚠ {formErrors.title}</p>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Department</label>
                  <input value={form.department} onChange={e => setF('department', e.target.value)} placeholder="e.g., Marketing" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Type</label>
                  <select value={form.type} onChange={e => setF('type', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 14, backgroundColor: '#fff' }}>
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Location</label>
                <input value={form.location} onChange={e => setF('location', e.target.value)} placeholder="Remote / Bangalore / Hybrid" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 14 }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Job Description <span style={{ color: '#ef4444' }}>*</span></label>
                <textarea rows={4} value={form.description} onChange={e => setF('description', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${formErrors.description ? '#ef4444' : '#e4e4e7'}`, borderRadius: 8, fontSize: 14 }} />
                {formErrors.description && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>⚠ {formErrors.description}</p>}
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3f3f46', marginBottom: 8 }}>Requirements (one per line)</label>
                <textarea rows={4} value={form.requirements} onChange={e => setF('requirements', e.target.value)} placeholder="3+ years experience&#10;Strong analytical skills" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 14 }} />
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={save} disabled={saving} style={{ padding: '14px 24px', background: '#09090b', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving…' : editItem ? 'Update' : 'Post Job'}</button>
                <button onClick={() => setShowForm(false)} style={{ padding: '14px 24px', background: '#fff', color: '#09090b', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Applications Tab ───────────────────────────────────────────────────────────
function ApplicationsTab() {
  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    Promise.all([api.admin.getApplications(), api.admin.getCareers()])
      .then(([a, j]) => { setApps(a); setJobs(j); })
      .catch(() => {});
  }, []);

  function jobTitle(id) { const j = jobs.find(j => j.id == id); return j ? j.title : `Job #${id}`; }

  return (
    <div>
      <h2 style={{ marginBottom: 28, fontSize: 28, letterSpacing: '-0.03em' }}>Job Applications <span style={{ color: '#a1a1aa', fontWeight: 500, fontSize: 20 }}>({apps.length})</span></h2>
      {apps.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed #e4e4e7', borderRadius: 16, textAlign: 'center', padding: 60, color: '#a1a1aa' }}>No applications yet.</div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#fafafa', borderBottom: '1px solid #e4e4e7' }}>
                  {['Name', 'Email', 'Phone', 'Job Applied For', 'Applied'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '16px', fontWeight: 600, fontSize: 12, color: '#71717a' }}>{h}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {apps.map(a => (
                  <tr key={a.id} style={{ borderBottom: '1px solid #f4f4f5' }}>
                    <td style={{ padding: '16px', fontWeight: 600 }}>{a.name}</td>
                    <td style={{ padding: '16px' }}><a href={`mailto:${a.email}`} style={{ color: '#0ea5e9', textDecoration: 'none' }}>{a.email}</a></td>
                    <td style={{ padding: '16px' }}>{a.phone || '—'}</td>
                    <td style={{ padding: '16px' }}>{jobTitle(a.careerId)}</td>
                    <td style={{ padding: '16px', color: '#a1a1aa' }}>{new Date(a.appliedAt).toLocaleDateString('en-IN')}</td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button style={{ background: '#f4f4f5', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#3f3f46', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = '#e4e4e7'} onMouseLeave={e => e.target.style.background = '#f4f4f5'} onClick={() => setSelected(a)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(9,9,11,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto', borderRadius: 24, boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid #e4e4e7' }}>
              <h3 style={{ margin: 0, fontSize: 20 }}>Application Details</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#a1a1aa' }}>✕</button>
            </div>
            <div style={{ padding: '24px 32px' }}>
              {[['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone || '—'], ['Role', jobTitle(selected.careerId)], ['Applied', new Date(selected.appliedAt).toLocaleString('en-IN')]].map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, padding: '12px 0', borderBottom: '1px solid #f4f4f5', fontSize: 14 }}>
                  <span style={{ fontWeight: 500, color: '#71717a' }}>{k}</span><span style={{ color: '#09090b' }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#09090b' }}>Cover Letter</p>
                <div style={{ fontSize: 14, color: '#3f3f46', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: '#fafafa', border: '1px solid #e4e4e7', padding: 16, borderRadius: 12 }}>{selected.coverLetter}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Root Dashboard ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [tab, setTab] = useState('Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin');
    });
  }, [navigate]);

  function logout() {
    supabase.auth.signOut().then(() => navigate('/admin'));
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fafafa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar - Clean light mode sidebar */}
      <div style={{ width: 260, background: '#fff', flexShrink: 0, padding: '32px 0', display: 'flex', flexDirection: 'column', color: '#09090b', borderRight: '1px solid #e4e4e7' }}>
        <div style={{ padding: '0 24px 32px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <img src="/logo.png" alt="BASK Agency" style={{ height: 48 }} />
        </div>
        
        <div style={{ padding: '0 16px', flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, paddingLeft: 12 }}>Menu</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px', 
                  background: tab === t ? '#f4f4f5' : 'transparent', 
                  border: 'none', borderRadius: 12, cursor: 'pointer', 
                  color: tab === t ? '#09090b' : '#71717a', 
                  fontSize: 14, fontWeight: tab === t ? 600 : 500, textAlign: 'left', 
                  transition: 'all .15s' 
                }}>
                <span className="material-icons" style={{ fontSize: 18, color: tab === t ? '#09090b' : '#a1a1aa' }}>
                  {t === 'Dashboard' ? 'dashboard' : t === 'Proposals' ? 'description' : t === 'Blogs' ? 'article' : t === 'Services' ? 'build' : t === 'Careers' ? 'work' : 'assignment'}
                </span>
                {t}
              </button>
            ))}
          </nav>
        </div>
        
        <div style={{ padding: '24px 24px', borderTop: '1px solid #e4e4e7', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <a href="/" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#71717a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#09090b'} onMouseLeave={e => e.target.style.color = '#71717a'}>
            <span className="material-icons" style={{ fontSize: 16 }}>open_in_new</span> View Live Site
          </a>
          <button onClick={logout} style={{ fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = '#fee2e2'} onMouseLeave={e => e.target.style.background = '#fef2f2'}>
            <span className="material-icons" style={{ fontSize: 16 }}>logout</span> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '48px 56px', overflowY: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {tab === 'Dashboard' && <DashboardTab />}
          {tab === 'Proposals' && <ProposalsTab />}
          {tab === 'Users' && <UsersTab />}
          {tab === 'Notifications' && <NotificationsTab />}
          {tab === 'Blogs' && <BlogsTab />}
          {tab === 'Services' && <ServicesTab />}
          {tab === 'Careers' && <CareersTab />}
          {tab === 'Applications' && <ApplicationsTab />}
        </div>
      </div>
    </div>
  );
}
