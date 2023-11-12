
// exports.gifn= function(req, res){

//     if(req == "ww"){
//         res.status(200).json({
//             mesage: "ok"

//         });

//     }else{
//         console.log("error");

//     }
// };

// dbからのnameとseconds,keycountを取得したやつと、userの名前を比較して、同じ名前のデータを条件分岐でgif_dataの値を返す
exports.gifn = function (req,user) {

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
        if (req[i].name == user) {
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

exports.gif_send = function (req) { 

    if(req == 5){
        return "gif/five_gif.gif";
    }else if(req == 4){
        return "gif/forr_gif.gif";
    }else if(req == 3){
        return "gif/three_gif.gif";
    }else if(req == 2){
        return "gif/two_gif.gif";
    }else{
        return "gif/one_gif.gif";
    }
    
}

