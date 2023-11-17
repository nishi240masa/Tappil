

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
      <g transform="translate(0.000000,1378.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M2030 2446 c0 -28 -81 -295 -113 -371 -11 -27 -31 -64 -44 -82 -28
-39 -120 -101 -165 -113 -61 -16 -163 -21 -203 -11 -22 5 -58 14 -79 20 -22 5
-43 16 -48 24 -15 28 -155 192 -218 256 l-62 65 -27 -32 c-34 -42 -80 -72
-110 -72 -13 0 -58 -16 -101 -35 -106 -48 -151 -53 -242 -25 -103 31 -145 58
-208 136 -66 82 -169 198 -180 202 -4 2 -11 -14 -14 -34 -18 -93 -50 -169
-114 -266 -38 -57 -76 -109 -85 -117 -16 -12 -17 -90 -17 -1002 l0 -989 6890
0 6890 0 0 989 c0 912 -1 990 -17 1002 -9 8 -47 60 -85 117 -64 97 -96 173
-113 266 -4 20 -11 36 -15 36 -5 0 -41 -39 -82 -87 -40 -48 -102 -118 -138
-154 -60 -62 -71 -69 -151 -93 -103 -31 -122 -32 -194 -5 -82 31 -105 56 -175
190 l-63 122 -39 -83 c-27 -56 -58 -100 -96 -139 -56 -56 -195 -220 -210 -248
-5 -8 -26 -19 -48 -24 -21 -6 -57 -15 -79 -20 -76 -19 -226 6 -273 46 -17 14
-34 25 -40 25 -17 0 -70 67 -92 117 -30 68 -120 359 -120 388 0 37 -10 30 -55
-32 -56 -79 -240 -269 -275 -285 -16 -7 -31 -22 -34 -33 -7 -26 -65 -55 -109
-55 -18 0 -58 9 -90 20 -31 11 -74 20 -95 20 -52 0 -127 39 -199 105 l-60 54
-14 -25 c-7 -14 -42 -41 -76 -61 -35 -19 -71 -47 -81 -61 -9 -14 -36 -45 -58
-69 -32 -33 -49 -43 -73 -43 -17 0 -50 -5 -74 -11 -61 -17 -172 17 -268 82
-39 27 -75 49 -78 49 -3 0 -26 -44 -51 -97 -50 -107 -116 -188 -187 -230 -71
-41 -221 -93 -271 -93 -83 0 -116 26 -246 195 -118 153 -119 154 -145 141 -14
-7 -57 -23 -96 -36 -38 -12 -92 -30 -120 -40 -71 -26 -201 -48 -335 -56 -126
-7 -145 -2 -246 67 -22 15 -53 31 -68 35 -14 3 -35 17 -45 30 -10 12 -63 56
-118 97 -55 41 -119 94 -141 118 -40 43 -41 43 -61 25 -11 -10 -23 -27 -26
-37 -4 -11 -27 -35 -53 -55 -26 -19 -95 -88 -153 -152 -78 -86 -136 -139 -220
-199 -101 -72 -210 -133 -239 -133 -8 0 -33 29 -196 224 -74 89 -114 157 -160
267 -20 49 -40 89 -44 89 -4 0 -24 -40 -44 -89 -46 -110 -86 -178 -160 -267
-32 -38 -87 -104 -122 -146 l-64 -76 -63 -7 c-110 -12 -157 10 -327 151 -60
49 -87 82 -135 161 -32 54 -66 104 -73 112 -8 8 -39 48 -69 88 -31 40 -59 73
-63 73 -4 0 -22 -16 -38 -34 -17 -19 -77 -69 -133 -111 -56 -42 -110 -87 -120
-99 -10 -13 -31 -27 -45 -30 -15 -4 -46 -20 -68 -35 -101 -69 -120 -74 -246
-67 -63 4 -153 14 -200 23 -76 14 -314 88 -359 113 -16 8 -36 -14 -142 -150
-133 -173 -156 -190 -243 -190 -48 0 -200 53 -269 93 -71 42 -137 123 -187
230 -25 53 -48 97 -51 97 -3 0 -39 -22 -78 -49 -96 -65 -207 -99 -268 -82 -24
6 -57 11 -74 11 -24 0 -41 10 -73 43 -22 24 -49 55 -58 69 -9 14 -43 40 -75
58 -32 18 -68 44 -79 58 l-21 26 -54 -48 c-77 -69 -145 -106 -197 -106 -23 0
-68 -9 -99 -20 -32 -11 -73 -20 -91 -20 -46 0 -101 28 -108 54 -3 12 -18 27
-34 35 -35 15 -233 220 -281 290 -38 56 -49 62 -49 27z"/>
</g>

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