const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const mysql = require('mysql');

const sql = 'INSERT INTO users SET ?';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'N04090411n%',
    database: 'express_db'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected');
});

app.use(bodyParser.json());

app.post('/api/data', (req, res) => {

    console.log(req.body);

    let name_data = req.body.name;

    let email_data = req.body.email;

    res.status(200).json({
        mesage: "ok"
    });

    con.query(
        sql,
        { name: name_data, email: email_data },
        function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        }
      );
});









app.get('/api/gif', (req, res) => {
    // サーバー上のGIF画像を読み込み、ブラウザに送信
    fs.readFile(gifPath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            // レスポンスヘッダーを設定してGIF画像を送信
            // レスポンスヘッダーのContent-Typeにimage/gifを設定することで、gif画像を送信できる
            res.header('Content-Type', 'image/gif');
            // レスポンスヘッダーのContent-Lengthに画像のサイズを設定することで、画像のサイズをブラウザに伝えることができる
            res.header('Content-Length', data.length);
            // レスポンスヘッダーのCache-Controlにno-cacheを設定することで、ブラウザがキャッシュをしないようにできる
            // res.header('Cache-Control', 'no-cache');
            res.status(200).send(data);
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));