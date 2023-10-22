const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());





const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qweasdzxc',
    database: 'admin'
  });

connection.connect();


app.get("/",(req,res)=>{
    res.send("Hello Worldsdadsadasd");
});


app.get('/api/courses',(rep,res)=>{
    res.send([1,2,3,4,5]);
})

app.get('/getData', (req, res) => {
    connection.query('SELECT * FROM adminInfo', (err, results) => {
      if (err) {
        console.error('Error fetching data: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });

  app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and Password are required' });
    }

    connection.query('SELECT * FROM admininfo WHERE adminEmail = ? AND adminPassword = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            const user = results[0]; // assuming email is unique in your DB, so we take the first result
            return res.json(user);
        } else {
            return res.status(401).json({ error: 'Invalid login credentials.' });
        }
    });
});


app.listen(3000, ()=>console.log('Listening on port 3000...'));
