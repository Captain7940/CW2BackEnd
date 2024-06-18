// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: 'postgres://xzkoofob:UXdvl-w8UBW9W6gIqoH4c3oUPtdbMRw6@john.db.elephantsql.com/xzkoofob',
});

app.post('/api/pet', async (req, res) => {
  const { title, variety, gender, age, info, location, imageurl } = req.body;
  try {
    const query = `
      INSERT INTO pet(title, variety, gender, age, info, location, imageurl)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [title, variety, gender, age, info, location, imageurl];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error object:', err);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
