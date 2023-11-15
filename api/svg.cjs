
const { createCanvas } = require('canvas');
const SVG = require('svg-canvas');
const fs = require('fs'); 

exports.svgData = function (req, user) {
  console.log("test_svg");
  console.log(req.rows);
  
    let sco = [];
    let keyco = [];
    let sec = [];

    console.log("test");

    for (i = 0; i < req.rows.length; i++) {

        sco.push(req.rows[i].score);

        keyco.push(req.rows[i].keycount);

        sec.push(req.rows[i].seconds);
    }
    sco.sort((a, b) => a - b);
    scoreMax = sco[0];

    keyco.sort((a, b) => a - b);
    keycountMax = keyco[0];

    sec.sort((a, b) => a.seconds - b.seconds);

    secondsMax = sec[0];

    let scoreOll = 0;
    for (i = 0; i < req.rows.length; i++) {
        scoreOll += req.rows[i].score;
    }


    const username = user || 'User';

    const scoreValue1 = scoreMax || 'null';

    const scoreValue2 = keycountMax || 'null';

    const scoreValue3 = secondsMax || 'null';

    const scoreValue4 = scoreOll || 'null';

    // const canvas = createCanvas(400, 200);
    // const ctx = canvas.getContext('2d');

    // ctx.font = '20px Arial';
    // ctx.fillStyle = 'black';

    // ctx.fillText(`User: ${username}`, 10, 30);

    // ctx.fillText(`最大スコア: ${scoreValue1}`, 10, 60);
    // ctx.fillText(`最大タップ数: ${scoreValue2}`, 10, 90);
    // ctx.fillText(`最大作業時間: ${scoreValue3}`, 10, 120);
    // ctx.fillText(`累計スコア: ${scoreValue4}`, 10, 150);


    const scores = [
        { name: "最大スコア", value: scoreValue1 },
        { name: "最大タップ数", value: scoreValue2 },
        { name: "最大作業時間", value: scoreValue3 },
        { name: "累計スコア", value: scoreValue4 }
      ];

      let gif 
    fs.readFile('gif/five_gif.gif', (err, data) => {
      if (err) { 
        console.error(err);
        res.status(500).send('Internal Server Error');
      }else{
        console.log(data);
        gif = data;
      }
    });
  

    const svgString = `
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">

      <!-- 背景 -->
      <rect width="100%" height="100%" fill="#f0f0f0"/>

      <!-- ユーザー名 -->
      <text x="50" y="30" font-family="Arial" font-size="16" fill="black">User: ${user}</text>

      <!-- スコア -->
      ${scores.map((score, index) => `
        <text x="50" y="${60 + index * 30}" font-family="Arial" font-size="16" fill="black">${score.name}: ${score.value}</text>
      `).join('')}

      <foreignObject width="100" height="100">
      <div xmlns="http://www.w3.org/1999/xhtml">
          <img src="https://tappil-web.onrender.com/api/gif?name=${user}" alt="GIF" style="width:100; height:200;" />
      </div>
  </foreignObject>

    </svg>
  `;
    //  const svg_data = canvas.toDataURL('image/svg+xml');

    return svgString;

}