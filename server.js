const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000; // Changed to match your error output
import dotenv from "dotenv";
dotenv.config();
// Middleware - MUST come before routes
app.use(cors({
  origin: 'http://localhost:3001', // Your React app's URL
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies

console.log('Using connection to: aws-1-ap-southeast-1.pooler.supabase.com:6543');

// Database connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { 
    rejectUnauthorized: false 
  },
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// Test DB connection with better error handling
const testConnection = async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('✅ Connected to PostgreSQL successfully!');
    
    // Test query to verify everything works
    const result = await client.query('SELECT NOW()');
    console.log('Database time:', result.rows[0].now);
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    console.error('Error details:', err);
  } finally {
    if (client) client.release();
  }
};

testConnection();

// Pool error handling (important!)
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

// Routes
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`PostgreSQL connected! Server time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Database error: ' + err.message);
  }
});

// API Routes
app.get('/api/workers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workers ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/workers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM workers WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/workers', async (req, res) => {
  try {
    const { name, skill, location, rating, contact } = req.body;
    const result = await pool.query(
      'INSERT INTO workers (name, skill, location, rating, contact) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, skill, location, rating, contact]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const { worker_id, title, description, price_range } = req.body;
    const result = await pool.query(
      'INSERT INTO services (worker_id, title, description, price_range) VALUES ($1, $2, $3, $4) RETURNING *',
      [worker_id, title, description, price_range]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await pool.end();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});