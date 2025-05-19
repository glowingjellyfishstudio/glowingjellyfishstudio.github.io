const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CLIENT_ID = 'Ov23li5y3RylHXSS7sLD';
const CLIENT_SECRET = 'bd48e3f4cb75aec062b37d666231a8e780f9c510';

// Endpoint to exchange code for access_token
app.post('/exchange_token', async (req, res) => {
  const code = req.body.code;
  if (!code) return res.status(400).json({ error: 'Missing code' });

  try {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
    });

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: params,
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Token exchange failed', details: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
