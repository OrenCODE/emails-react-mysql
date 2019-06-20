const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

let pool;
(async function initializePool() {
    pool = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'Mail',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
})();

// @route   GET /emails/counter
// @desc    email count by group
// @access  public

router.get('/counter', async (req, res) => {
    try {
        const [results] = await pool.execute(`SELECT COUNT(id) as counter, emailGroup FROM Email GROUP BY emailGroup`);
        if (results.length) {
            res.send(results)
        } else {
            res
                .status(404)
                .send('there are no emails in the database')
        }
    } catch (e) {
        res
            .status(500)
            .send('something has gone wrong!')
    }
});

// @route   GET /emails/date
// @desc    search email by date
// @access  public

router.get('/date/:pickedDate', async (req, res) => {
    const {pickedDate} = req.params;
    try {
        const [results] = await pool.execute(`SELECT * FROM Email WHERE date = ?`, [pickedDate]);
        if (results.length) {
            res.send(results)
        } else {
            res
                .status(404)
                .send('there are no emails in the database')
        }
    } catch (e) {
        res
            .status(500)
            .send('something has gone wrong!')
    }
});


// @route   GET /emails/
// @desc    get all mails
// @access  public

router.get('/', async (req, res) => {
    try {
        const [results] = await pool.execute(`SELECT * FROM Email`);
        if (results.length) {
            res.send(results)
        } else {
            res
                .status(404)
                .send('there are no emails in the database')
        }
    } catch (e) {
        res
            .status(500)
            .send('something has gone wrong!')
    }
});

// @route   GET /emails/:group
// @desc    get mails by group
// @access  public

router.get('/:emailGroup', async (req, res) => {

    const {emailGroup} = req.params;
    try {
        const [results] = await pool.execute(`SELECT * FROM Email WHERE emailGroup = ?`, [emailGroup]);
        if (results.length) {
            res.send(results);
        } else {
            res
                .status(404)
                .send(`there are no email for the ${emailGroup} group`);
        }
    } catch (e) {
        res
            .status(500)
            .send('something has gone wrong!');
    }
});

// @route   POST /emails
// @desc    send new email
// @access  public

router.post('/', async (req, res) => {
    const {sentFrom, title, message, date} = req.body;
    if (!title) {
        res
            .status(400)
            .send('expected title in request');
    }
    const [results] = await pool.execute(`INSERT INTO Email (sentFrom,title,message,date) 
    VALUES (
    '${sentFrom}',
    '${title}',
    '${message}',
    '${date}'
    )`);
    if (results.insertId) {
        res.send({id: results.insertId, success: true});
    } else {
        res
            .status(500)
            .send('something went wrong');
    }
});

// @route   DELETE /emails/
// @desc    Delete Email by id
// @access  public

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [results] = await pool.execute(`DELETE FROM Email WHERE id = ?`, [id]);
        res.send(`email ${id} has been deleted`);
    } catch (error) {
        res
            .status(404)
            .send(`email ${id} doesn't exist`);
    }
});


module.exports = router;
