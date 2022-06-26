const express = require('express');
const app = express();

const mysql = require('mysql2');

app.use(express.static("sf"));

app.listen(550);

app.get('/getareaname', (req, resp) => {
    console.log("ajax function called");
    const dbobject = {
        host: 'localhost',
        user: 'root',
        password: 'cdac',
        database: 'juhu',
        port: 3306
    }
    const conn = mysql.createConnection(dbobject);

    let output = { status: false, detail: { account: 0, balance: "" } }
    let account = req.query.account;
    console.log(account);
    conn.query('select account, balance from location where account = ?', [account],
        (error, rows) => {
            if (error) {
                console.log(error);
            }
            else {
                if (rows.length > 0) {
                    output.status = true;
                    output.detail = rows[0];
                }
                else {
                    console.log("balance not available");
                }
            }
            console.log(output);
            resp.send(output);
        });

});

   