
// import と export ができなかったので、require と module.exports で代用したができない
const { gifn } = require('./scor.cjs');
// import  {gifn}  from './scor.cjs';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
// ファイルシステムを読み込み
const fs = require('fs');
const { request } = require('http');
//corsを使う設定
app.use(cors());

// const gn = ('./scor.js');

const mysql = require('mysql');
// sqlにデータを入れる為の変数
const sql = 'INSERT INTO data SET ?';
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'N04090411n%',
    database: 'keydata_db'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected');
});

// body-parserを使う設定
app.use(bodyParser.json());

// postされたデータを受け取る設定
app.post('/api/data', (req, res) => {

    console.log(req.body);

    let name_data = req.body.name;

    let key_data = req.body.keycount;
    let enter_data = req.body.entercount;
    let back_data = req.body.backcount;
    let sec_data = req.body.seconds;


    res.status(200).json({
        mesage: "ok"
    });

    con.query(
        sql,
        { name: name_data, keycount: key_data, entercount: enter_data, backcount: back_data, seconds: sec_data},
        function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        }
      );
});



// dbからデータを取得する設定 nameがwwのデータを取得
con.query("SELECT name,seconds,keycount FROM data /*WHERE name = 'ww */", function (err, result, fields,gif_nam) {
    if (err) throw err;
    console.log(result);

    for(i = 0; i < result.length; i++){
    console.log(gifn(result));
    }
    // gn.func();
    // console.log(result[0].keycount);

    // console.log( gn.gifn(result[0].name));
    // gifnamber.gn(result[0].name);

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