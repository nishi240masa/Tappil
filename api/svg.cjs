

const {canvas } = require('canvas');

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
    scoreMax = sco[req.rows.length - 1];
    console.log("MAX");
    console.log(scoreMax);
    console.log("MAX2");
    console.log(sco[req.rows.length - 1]);

    keyco.sort((a, b) => a - b);
    keycountMax = keyco[req.rows.length - 1];

    sec.sort((a, b) => a - b);

    secondsMax = sec[req.rows.length - 1];

    let scoreOll = 0;
    for (i = 0; i < req.rows.length; i++) {
      scoreOll += parseFloat(req.rows[i].score);
    }

    scoreOll_two =   parseFloat(scoreOll.toFixed(2))

    const username = user || 'User';

    const scoreValue1 = scoreMax || 'null';

    const scoreValue2 = keycountMax || 'null';

    const scoreValue3 = secondsMax || 'null';

    const scoreValue4 = scoreOll_two || 'null';

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
  

    const svgString =`
    <svg width="220" height="200" xmlns="http://www.w3.org/2000/svg">

      <!-- 背景 -->
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- ユーザー名 -->
      <text x="30" y="30" font-family="PixelMplus10-Regular" font-size="16" fill="black">User: ${user}</text>

      <!-- スコア -->
      ${scores.map((score, index) => `
        <text x="30" y="${60 + index * 30}" font-family="PixelMplus10-Regular" font-size="16" fill="black">${score.name}: ${score.value}</text>
      `).join('')}

    </svg>
  `;
    //  const svg_data = canvas.toDataURL('image/svg+xml');

    return svgString;

}