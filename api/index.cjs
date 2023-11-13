
// import と export ができなかったので、require と module.exports で代用したができない
const { gifn, gif_send,mydata,bestsc } = require('./scor.cjs');
// import  {gifn}  from './scor.cjs';
const { svgData } = require('./svg.cjs');

const { createCanvas } = require('canvas');
const SVG = require('svg-canvas');
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

    let score_data = key_data / sec_data;


    res.status(200).json({
        mesage: "ok"
    });

    con.query(
        sql,
        { name: name_data, keycount: key_data, entercount: enter_data, backcount: back_data, seconds: sec_data ,score:score_data},
        function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        }
    );
});


// gif画像を返すapi
app.get('/api/gif', (req, res) => {
    let user = req.query.name;
    // dbからデータを取得する設定 nameがwwのデータを取得
    con.query("SELECT name,seconds,keycount FROM data /*WHERE name = 'ww */", function (err, result) {
        if (err) throw err;
        console.log(result);



        gif_num = gifn(result, user);

        let gs = gif_send(gif_num);




        // サーバー上のGIF画像を読み込み、ブラウザに送信
        fs.readFile(gs, (err, data) => {
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
});

con.query("SELECT name, keycount FROM data ORDER BY keycount DESC", function (err, result) {
    if (err) throw err;
    console.log("test");
    for (i = 0; i < result.length; i++) {
        if (result[i].name == "ww") {
            console.log(result[i]);
        }
    }
    console.log(result);


});

let test_name = "ww";
con.query("SELECT name,keycount,score,seconds FROM data WHERE name = ? ORDER BY keycount DESC",[test_name], function (err, result) {
    if (err) throw err;

    console.log("test2");
    console.log(result);

    gif_nam = gifn(result, "ww");

    console.log(gif_nam);

});
app.get('/api/myscore', (req, res) => {

    let user = req.query.name;

    // dbからデータを取得する設定 nameがwwのデータを取得
    con.query("SELECT * FROM data WHERE name = ? ",[user], function (err, result) {
        if (err) throw err;

        console.log("svg_test");
        console.log(result);


        console.log(result.score);

        svg = svgData(result, user);

        res.type('svg').send(svg);


    });

});



app.listen(port, () => console.log(`Listening on port ${port}`));