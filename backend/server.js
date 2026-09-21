require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'bask_secret_key_2026';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'bask_admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bask_admin';

app.use(cors());
app.use(express.json());

// ── Helpers ──────────────────────────────────────────────────────────────────
const dataPath = (name) => path.join(__dirname, 'data', name);

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(dataPath(file), 'utf8')); }
  catch { return []; }
}

function writeJSON(file, data) {
  fs.writeFileSync(dataPath(file), JSON.stringify(data, null, 2));
}

// ── In-memory / static data ──────────────────────────────────────────────────
const staticServices = require('./data/services');
const team = require('./data/team');
const baskKnowledge = require('./data/bask_knowledge.json');
const proposals = [];
const subscribers = [];

// ── Auth Middleware ───────────────────────────────────────────────────────────
function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ── Public Routes ─────────────────────────────────────────────────────────────
app.get('/api/services', (_req, res) => {
  const custom = readJSON('services_db.json');
  res.json(custom.length ? custom : staticServices);
});

app.get('/api/case-studies', (_req, res) => {
  const caseStudies = require('./data/caseStudies');
  res.json(caseStudies);
});

app.get('/api/team', (_req, res) => res.json(team));

app.get('/api/blogs', (_req, res) => res.json(readJSON('blogs.json')));

app.get('/api/blogs/:slug', (req, res) => {
  const blogs = readJSON('blogs.json');
  const post = blogs.find(b => b.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

app.get('/api/careers', (_req, res) => {
  const careers = readJSON('careers.json').filter(c => c.active !== false);
  res.json(careers);
});

app.post('/api/proposals', (req, res) => {
  const { company, email, contact, phone, size, budget, goal, timeline, description } = req.body;
  if (!company || !email) return res.status(400).json({ error: 'company and email required' });
  const entry = { id: Date.now(), company, email, contact, phone, size, budget, goal, timeline, description, submittedAt: new Date() };
  proposals.push(entry);
  console.log('New proposal:', entry);
  res.status(201).json({ message: 'Proposal received', id: entry.id });
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  if (subscribers.includes(email)) return res.json({ message: 'Already subscribed' });
  subscribers.push(email);
  res.status(201).json({ message: 'Subscribed successfully' });
});

app.post('/api/careers/apply', (req, res) => {
  const { careerId, name, email, phone, coverLetter } = req.body;
  const errors = {};
  if (!name?.trim()) errors.name = 'Name is required';
  if (!email?.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email address';
  if (!coverLetter?.trim()) errors.coverLetter = 'Cover letter is required';
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const apps = readJSON('applications.json');
  const entry = { id: Date.now(), careerId, name, email, phone, coverLetter, appliedAt: new Date() };
  apps.push(entry);
  writeJSON('applications.json', apps);
  res.status(201).json({ message: 'Application received' });
});

// ── Admin Auth ────────────────────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

// ── Admin: Proposals ──────────────────────────────────────────────────────────
app.get('/api/admin/proposals', requireAdmin, (_req, res) => res.json(proposals));

// ── Admin: Subscribers ────────────────────────────────────────────────────────
app.get('/api/admin/subscribers', requireAdmin, (_req, res) => res.json(subscribers));

// ── Admin: Blogs ──────────────────────────────────────────────────────────────
app.get('/api/admin/blogs', requireAdmin, (_req, res) => res.json(readJSON('blogs.json')));

app.post('/api/admin/blogs', requireAdmin, (req, res) => {
  const { title, slug, category, excerpt, content, author, coverImage } = req.body;
  if (!title?.trim() || !slug?.trim() || !content?.trim()) {
    return res.status(400).json({ error: 'title, slug, and content are required' });
  }
  const blogs = readJSON('blogs.json');
  if (blogs.find(b => b.slug === slug)) return res.status(400).json({ error: 'Slug already exists' });
  const post = { id: Date.now(), title, slug, category: category || 'General', excerpt: excerpt || '', content, author: author || 'BASK Team', coverImage: coverImage || '', publishedAt: new Date() };
  blogs.push(post);
  writeJSON('blogs.json', blogs);
  res.status(201).json(post);
});

app.put('/api/admin/blogs/:id', requireAdmin, (req, res) => {
  const blogs = readJSON('blogs.json');
  const idx = blogs.findIndex(b => b.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  blogs[idx] = { ...blogs[idx], ...req.body, id: blogs[idx].id };
  writeJSON('blogs.json', blogs);
  res.json(blogs[idx]);
});

app.delete('/api/admin/blogs/:id', requireAdmin, (req, res) => {
  let blogs = readJSON('blogs.json');
  blogs = blogs.filter(b => b.id != req.params.id);
  writeJSON('blogs.json', blogs);
  res.json({ message: 'Deleted' });
});

// ── Admin: Services ───────────────────────────────────────────────────────────
app.get('/api/admin/services', requireAdmin, (_req, res) => {
  const custom = readJSON('services_db.json');
  res.json(custom.length ? custom : staticServices);
});

app.post('/api/admin/services', requireAdmin, (req, res) => {
  const { title, description, icon } = req.body;
  if (!title?.trim() || !description?.trim()) return res.status(400).json({ error: 'title and description required' });
  const services = readJSON('services_db.json').length ? readJSON('services_db.json') : [...staticServices];
  const entry = { id: Date.now(), label: title, title, description, icon: icon || 'star', deliverables: [], timelines: [], approach: [] };
  services.push(entry);
  writeJSON('services_db.json', services);
  res.status(201).json(entry);
});

app.put('/api/admin/services/:id', requireAdmin, (req, res) => {
  const services = readJSON('services_db.json').length ? readJSON('services_db.json') : [...staticServices];
  const idx = services.findIndex(s => String(s.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  services[idx] = { ...services[idx], ...req.body, id: services[idx].id };
  writeJSON('services_db.json', services);
  res.json(services[idx]);
});

app.delete('/api/admin/services/:id', requireAdmin, (req, res) => {
  let services = readJSON('services_db.json').length ? readJSON('services_db.json') : [...staticServices];
  services = services.filter(s => String(s.id) !== String(req.params.id));
  writeJSON('services_db.json', services);
  res.json({ message: 'Deleted' });
});

// ── Admin: Careers ────────────────────────────────────────────────────────────
app.get('/api/admin/careers', requireAdmin, (_req, res) => res.json(readJSON('careers.json')));

app.post('/api/admin/careers', requireAdmin, (req, res) => {
  const { title, department, type, location, description, requirements } = req.body;
  if (!title?.trim() || !description?.trim()) return res.status(400).json({ error: 'title and description required' });
  const careers = readJSON('careers.json');
  const entry = { id: Date.now(), title, department: department || 'General', type: type || 'Full-time', location: location || 'Remote', description, requirements: requirements || [], postedAt: new Date(), active: true };
  careers.push(entry);
  writeJSON('careers.json', careers);
  res.status(201).json(entry);
});

app.put('/api/admin/careers/:id', requireAdmin, (req, res) => {
  const careers = readJSON('careers.json');
  const idx = careers.findIndex(c => c.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  careers[idx] = { ...careers[idx], ...req.body, id: careers[idx].id };
  writeJSON('careers.json', careers);
  res.json(careers[idx]);
});

app.delete('/api/admin/careers/:id', requireAdmin, (req, res) => {
  let careers = readJSON('careers.json');
  careers = careers.filter(c => c.id != req.params.id);
  writeJSON('careers.json', careers);
  res.json({ message: 'Deleted' });
});

// ── Admin: Applications ───────────────────────────────────────────────────────
app.get('/api/admin/applications', requireAdmin, (_req, res) => res.json(readJSON('applications.json')));

// ── Admin: Stats ──────────────────────────────────────────────────────────────
app.get('/api/admin/stats', requireAdmin, (_req, res) => {
  res.json({
    proposals: proposals.length,
    blogs: readJSON('blogs.json').length,
    careers: readJSON('careers.json').filter(c => c.active).length,
    applications: readJSON('applications.json').length,
    subscribers: subscribers.length,
  });
});

// ── Chat ──────────────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'messages array required' });

  const systemPrompt = `You are 'BASK', the official AI assistant for BASK Agency. You answer questions strictly based on the provided agency data: ${JSON.stringify(baskKnowledge)}`;

  try {
    if (process.env.GROQ_API_KEY) {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const completion = await groq.chat.completions.create({
        messages: [{ role: "system", content: systemPrompt }, ...messages.map(m => ({ role: m.role, content: m.content }))],
        model: "groq/compound-mini",
      });
      return res.json({ reply: completion.choices[0]?.message?.content });
    } else if (process.env.GEMINI_API_KEY) {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPrompt });
      const history = messages.slice(0, -1).map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(messages[messages.length - 1].content);
      return res.json({ reply: result.response.text() });
    } else {
      return res.json({ reply: "I'm currently offline. My API keys (GROQ_API_KEY or GEMINI_API_KEY) are missing in the backend .env file." });
    }
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "Sorry, I encountered a temporary connection issue. Please try again." });
  }
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
