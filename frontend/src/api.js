const BASE = import.meta.env.VITE_API_URL || 'https://bask-final.onrender.com';

function authHeaders() {
  const token = localStorage.getItem('admin_token');
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

async function req(method, path, body, isAdmin = false) {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: isAdmin ? authHeaders() : { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(data.error || `API ${path} failed`), { data, status: r.status });
  return data;
}

const get = (path) => req('GET', path);
const post = (path, body) => req('POST', path, body);
const adminGet = (path) => req('GET', path, undefined, true);
const adminPost = (path, body) => req('POST', path, body, true);
const adminPut = (path, body) => req('PUT', path, body, true);
const adminDel = (path) => req('DELETE', path, undefined, true);

export const api = {
  // Public
  getServices: () => get('/api/services'),
  getCaseStudies: () => get('/api/case-studies'),
  getTeam: () => get('/api/team'),
  submitProposal: (data) => post('/api/proposals', data),
  subscribe: (email) => post('/api/subscribe', { email }),
  getBlogs: () => get('/api/blogs'),
  getBlog: (slug) => get(`/api/blogs/${slug}`),
  getCareers: () => get('/api/careers'),
  applyToJob: (data) => post('/api/careers/apply', data),
  chat: (messages) => post('/api/chat', { messages }),

  // Admin
  admin: {
    login: (username, password) => post('/api/admin/login', { username, password }),
    getStats: () => adminGet('/api/admin/stats'),
    getProposals: () => adminGet('/api/admin/proposals'),
    getSubscribers: () => adminGet('/api/admin/subscribers'),
    getApplications: () => adminGet('/api/admin/applications'),
    // Blogs
    getBlogs: () => adminGet('/api/admin/blogs'),
    createBlog: (data) => adminPost('/api/admin/blogs', data),
    updateBlog: (id, data) => adminPut(`/api/admin/blogs/${id}`, data),
    deleteBlog: (id) => adminDel(`/api/admin/blogs/${id}`),
    // Services
    getServices: () => adminGet('/api/admin/services'),
    createService: (data) => adminPost('/api/admin/services', data),
    updateService: (id, data) => adminPut(`/api/admin/services/${id}`, data),
    deleteService: (id) => adminDel(`/api/admin/services/${id}`),
    // Careers
    getCareers: () => adminGet('/api/admin/careers'),
    createCareer: (data) => adminPost('/api/admin/careers', data),
    updateCareer: (id, data) => adminPut(`/api/admin/careers/${id}`, data),
    deleteCareer: (id) => adminDel(`/api/admin/careers/${id}`),
  },
};
