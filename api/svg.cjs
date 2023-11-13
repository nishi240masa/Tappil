
const { createCanvas } = require('canvas');
const SVG = require('svg-canvas');

exports.svgData = function (req, user) {


    let sco = [];
    let keyco = [];
    let sec = [];

    console.log("test");

    for (i = 0; i < req.length; i++) {

        sco.push(req[i].score);

        keyco.push(req[i].keycount);

        sec.push(req[i].seconds);
    }
    sco.sort((a, b) => a - b);
    scoreMax = sco[0];

    keyco.sort((a, b) => a - b);
    keycountMax = keyco[0];

    sec.sort((a, b) => a.seconds - b.seconds);

    secondsMax = sec[0];

    let scoreOll = 0;
    for (i = 0; i < req.length; i++) {
        scoreOll += req[i].score;
    }


    const username = user || 'User';

    const scoreValue1 = scoreMax || '0';

    const scoreValue2 = keycountMax || '0';

    const scoreValue3 = secondsMax || '0';

    const scoreValue4 = scoreOll || '0';

    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');

    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';

    ctx.fillText(`User: ${username}`, 10, 30);

    ctx.fillText(`最大スコア: ${scoreValue1}`, 10, 60);
    ctx.fillText(`最大タップ数: ${scoreValue2}`, 10, 90);
    ctx.fillText(`最大作業時間: ${scoreValue3}`, 10, 120);
    ctx.fillText(`累計スコア: ${scoreValue4}`, 10, 150);

     const svg_data = canvas.toDataURL('image/svg+xml');

    return svg_data;

}