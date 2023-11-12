
// exports.gifn= function(req, res){

//     if(req == "ww"){
//         res.status(200).json({
//             mesage: "ok"

//         });

//     }else{
//         console.log("error");

//     }
// };


exports.gifn = function (req) {
    // if (req == "ww") {
    //     return "ok";
    // } else {
    //     return "error";

    // }

    let key_data = 0;
    let time_data = 0;
    let score_data = 0;
    let gif_data = 0;

    // gifファイルの出力スコアの値
    const level5 = 110;
    const level4 = 70;
    const level3 = 40;
    const level2 = 10;

    console.log(req);
    for (i = 0; i < req.length; i++) {
        if (req[i].name == "ww") {
            console.log("for");
            console.log(req[i]);
            key_data += req[i].keycount;
            time_data += req[i].seconds;
    
        }
    }

    console.log(key_data);
    console.log(parseFloat(time_data.toFixed(2)));

    score_data = key_data / time_data;
    if (score_data > level5) {
        gif_data = 5;
    } else if (score_data > level4) {
        gif_data = 4;
    } else if (score_data > level3) {
        gif_data = 3;
    } else if (score_data > level2) {
        gif_data = 2;
    } else {
        gif_data = 1;
    }

    return gif_data;


}

// test = function(){
//   return"test";
// };

// module.exports = {test};


