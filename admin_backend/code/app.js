const express = require('express');
const mysql = require('mysql2');
const argon2 = require('argon2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'qweasdzxc',
  database: 'admin'
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4, 5]);
});

app.get('/getData', (req, res) => {
    pool.query('SELECT * FROM adminInfo', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    pool.query('SELECT * FROM admininfo WHERE adminEmail = ?', [email], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            const user = results[0];
            argon2.verify(user.adminPassword, password)
                .then(valid => {
                    if (valid) {
                        res.json({ message: 'Login successful', user });
                    } else {
                        res.status(401).json({ error: 'Invalid credentials' });
                    }
                })
                .catch(verifyError => {
                    console.error('Error during password verification:', verifyError);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
