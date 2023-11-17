
// import と export ができなかったので、require と module.exports で代用したができない
const { gifn, gif_send, mydata, bestsc } = require('./scor.cjs');
// import  {gifn}  from './scor.cjs';


require('dotenv').config();
const GitHubStrategy = require('passport-github').Strategy;

const passport = require('passport');
const session = require('express-session');

const { svgData } = require('./svg.cjs');

const { Pool } = require('pg');
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

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());



const con = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST || process.env.DB_,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

con.connect();



con.query(`CREATE TABLE IF NOT EXISTS data (
    id SERIAL NOT NULL ,
    name varchar(255) NOT NULL,
    keycount int NOT NULL,
    entercount  int NOT NULL,
    backcount  int NOT NULL,
    seconds decimal(65,2) NOT NULL,
    dt timestamp WITH TIME ZONE  DEFAULT CURRENT_TIMESTAMP ,
    score decimal(65,2) DEFAULT NULL,
    PRIMARY KEY (id)
  )`);

con.query('SET SESSION timezone TO "Asia/Tokyo"');
// body-parserを使う設定
app.use(bodyParser.json());

passport.use(new GitHubStrategy({
    clientID: '2e7f80967e286fc1e950',
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'https://tappil-web.onrender.com/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    // 認証後の処理
    console.log(profile);
    console.log(profile.username);
    console.log(profile.id);
    console.log(profile.displayName);
    console.log(profile.photos[0].value);
    con.query(`
    INSERT INTO users (id, name, display_name, avatar_url)
     VALUES (
        '${profile.id}',
         '${profile.username}', 
         '${profile.displayName}',
          '${profile.photos[0].value}')
           ON CONFLICT (id) DO UPDATE SET name = 
           '${profile.username}', 
           display_name = '${profile.displayName}',
            avatar_url = '${profile.photos[0].value}'`
            , (err, result) => {

        return done(null, profile);
    })
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/login/conect', (req, res) => {
    res.send('認証成功');

});

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // 認証成功時の処理
        res.redirect('/login/conect');
    });



// postされたデータを受け取る設定
app.post('/api/data', (req, res) => {

    console.log(req.body);

    let name_data = req.body.name;

    let key_data = req.body.keycount;
    let enter_data = req.body.entercount;
    let back_data = req.body.backcount;
    let sec_data = req.body.seconds;

    let score_data = key_data / sec_data;


    console.log(name_data);


    const sql = `INSERT INTO data (
        name,
        keycount,
        entercount,
        backcount,
        seconds,
        score
    )VALUES(
        '${name_data}',
        ${key_data},
        ${enter_data},
        ${back_data},
        ${sec_data},
        ${score_data}
        )
        `;
    console.log(sql);
    con.query(
        sql, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json({
                    mesage: "err",
                    err: err
                });
            } else {
                console.log(result);
                console.log("成功");
                res.status(200).json({
                    mesage: "ok"
                });

            }
        }
    );

});


// gif画像を返すapi
app.get('/api/gif', (req, res) => {
    let user = req.query.name;
    // dbからデータを取得する設定 nameがwwのデータを取得
    con.query("SELECT name,seconds,keycount FROM data;", function (err, result) {
        if (err) throw err;
        console.log(result.rows);



        gif_num = gifn(result.rows, user);

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
                res.header('Cache-Control', 'no-cache');
                // res.header('Cache-Control', 'no-cache');
                res.status(200).send(data);

            }
        });
    });
});

// svg画像を返すapi
app.get('/api/myscore', (req, res) => {

    let user = req.query.name;

    // dbからデータを取得する設定 nameがwwのデータを取得
    con.query("SELECT * FROM data WHERE name = $1", [user], function (err, result) {
        if (err) throw err;

        console.log("svg_test");
        console.log(result.rows);


        console.log(result.score);

        let svg = svgData(result, user);



        res.set('Content-Type', 'image/svg+xml');
        res.type('svg').send(svg);
    });



});


app.get('/gif', (req, res) => {

    // サーバー上のGIF画像を読み込み、ブラウザに送信
    let gif_data = 'gif/robo.gif';
    fs.readFile(gif_data, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.header('Content-Type', 'image/gif');
            res.status(200).send(data);
        }
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));