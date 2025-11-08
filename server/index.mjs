import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import jwt from 'jsonwebtoken';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { z } from 'zod';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// Config
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const CORS_ALLOWLIST = (process.env.CORS_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean);
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS ? Number(process.env.RATE_LIMIT_WINDOW_MS) : 60_000;
const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX ? Number(process.env.RATE_LIMIT_MAX) : 100;
const COOKIE_SECURE = String(process.env.COOKIE_SECURE || 'true').toLowerCase() === 'true';

// App
const app = express();
app.set('trust proxy', 1);

// Security headers
app.use(helmet({
  crossOriginOpenerPolicy: { policy: 'same-origin' },
  crossOriginEmbedderPolicy: true
}));

// JSON body limit
app.use(express.json({ limit: '1mb', type: 'application/json' }));

// Structured logging
app.use(pinoHttp({ logger }));

// CORS allowlist
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (CORS_ALLOWLIST.includes(origin)) return cb(null, true);
    return cb(new Error('CORS blocked'));
  },
  credentials: true
};
app.use(cors(corsOptions));

// Cookies & CSRF (only relevant when using cookie-based auth)
app.use(cookieParser());
const csrfProtection = csrf({ cookie: {
  key: '_csrf',
  httpOnly: true,
  sameSite: 'strict',
  secure: COOKIE_SECURE,
  path: '/'
}});

// Health & readiness
app.get('/health', (req, res) => res.status(200).json({ ok: true }));
app.get('/ready', (req, res) => res.status(200).json({ ready: true }));

// Rate limiting
const limiter = rateLimit({ windowMs: RATE_LIMIT_WINDOW_MS, max: RATE_LIMIT_MAX, standardHeaders: true, legacyHeaders: false });
app.use(limiter);

// Auth (demo)
// Login issues a JWT and sets httpOnly cookie
const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6)
});

app.post('/v1/auth/login', csrfProtection, (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'invalid_credentials' });
  }
  // Demo only (no real user check)
  const token = jwt.sign({ sub: parsed.data.username }, JWT_SECRET, { expiresIn: '15m' });
  res.cookie('session', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: COOKIE_SECURE,
    path: '/'
  });
  res.status(200).json({ ok: true });
});

// CSRF token endpoint for client to fetch token when using cookies
app.get('/v1/csrf', csrfProtection, (req, res) => {
  // The token is available via req.csrfToken()
  res.status(200).json({ csrfToken: req.csrfToken() });
});

// Auth middleware: check Authorization Bearer or cookie
function requireAuth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const cookieToken = req.cookies?.session;
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : cookieToken;
  if (!token) return res.status(401).json({ error: 'unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'unauthorized' });
  }
}

// Reservation schema (mirror of frontend Zod)
const ReservationInputSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  guests: z.number().int().min(1).max(10),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().optional()
});

// Reservations endpoint (protected demo)
app.post('/v1/reservations', requireAuth, (req, res) => {
  const parsed = ReservationInputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'invalid_input', details: parsed.error.issues });
  }
  // Demo business logic
  const id = `${parsed.data.date}_${parsed.data.time.replace(':','')}`;
  return res.status(201).json({ id });
});

// Error handling (last)
app.use((err, req, res, next) => {
  logger.error({ err }, 'Unhandled error');
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'internal_error' });
});

// Start
app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server started');
});