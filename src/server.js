"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// server.js
import express from 'express';
import pg from 'pg';
const { Pool } = pg;
import cors from 'cors';
import session from 'express-session';

const app = express();
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: "true",
};

app.use(cors(corsOptions));


const pool = new Pool({
  connectionString: 'postgres://xzkoofob:UXdvl-w8UBW9W6gIqoH4c3oUPtdbMRw6@john.db.elephantsql.com/xzkoofob'
});

app.post('/api/pet', async (req, res) => {
  const { title, variety, gender, age, info, location, imageurl } = req.body;
  try {
    const query =
      `INSERT INTO pet(title, variety, gender, age, info, location, imageurl)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`;
    const values = [title, variety, gender, age, info, location, imageurl];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/api/pet', async (req, res) => {
  try {
    const query = 
    'SELECT id, title, variety, gender, age, info, location, imageurl FROM pet;';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//Deatil page
app.get('/api/pet/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const queryResult = await pool.query('SELECT id, title, variety, gender, age, info, location, imageurl FROM pet WHERE id = $1', [id]);
    if (queryResult.rows.length > 0) {
      res.json(queryResult.rows[0]);
    } else {
      res.status(404).send('Pet not found');
    }
  } catch (error) {
    console.error('Error fetching pet details:', error);
    res.status(500).send('Server error');
  }
});

/*Login
const express = require('express');
const { Pool } = require('pg');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({
  // Session configuration options
}));

// Connect to ElephantSQL database
const pool = new Pool({
  connectionString: 'postgres://xzkoofob:UXdvl-w8UBW9W6gIqoH4c3oUPtdbMRw6@john.db.elephantsql.com/xzkoofob'
});

// Login route
app.post('/api/pet', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Query the database for user with the provided username
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      // Compare provided password with stored password
      if (password === user.password) { // Replace with proper password hashing and comparison
        // Set user information in session
        req.session.userId = user.id;
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(401).send('User not found');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});
*/
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
