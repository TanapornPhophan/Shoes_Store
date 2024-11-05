const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use('/img', express.static('img'));

const db = new sqlite3.Database('./L.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the L database.');
    }
});


// Routes
app.get('/all-data', (req, res) => {
    const tables = ['Customers', 'Employees', 'OrderDetails', 'Orders', 'Products', 'Promotions'];
    const data = {};
    let completedQueries = 0;


    tables.forEach((table) => {
        const query = `SELECT * FROM ${table}`;
        db.all(query, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            data[table] = rows;
            completedQueries++;
            if (completedQueries === tables.length) {
                res.json(data);
            }
        });
    });
});

app.get('/Products', (req, res) => {
    db.all('SELECT * FROM Products', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


app.post('/Products', (req, res) => {
    const { Image, ProductName, Price } = req.body;
    const query = `INSERT INTO Products (Image, ProductName, Price) VALUES (?, ?, ?)`;
    db.run(query, [Image, ProductName, Price], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, Image, ProductName, Price });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
