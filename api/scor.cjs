
// dbからのnameとseconds,keycountを取得したやつと、userの名前を比較して、同じ名前のデータを条件分岐でgif_dataの値を返す
exports.gifn = function (req,user) {

    let key_data = 0;
    let time_data = 0;
    let score_data = 0;
    let gif_data = 0;

    // gifファイルの出力スコアの値
    const level5 = 166;
    const level4 = 124;
    const level3 = 81;
    const level2 = 51;

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

    console.log(time_data);

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
        return "gif/robo2.gif";
    }else if(req == 4){
        return "gif/gunjin2.gif";
    }else if(req == 3){
        return "gif/samurai2.gif";
    }else if(req == 2){
        return "gif/tibiyayoi2.gif";
    }else{
        return "gif/tibisaru2.gif";
    }
    
}

exports.mydata = function (req) {

    let best_score = 0;
    let best_time = 0;
    let best_keycount = 0;
    let best_entercount = 0;
    let best_backcount = 0;

    exports.bestsc = function (req, user) {
        for (i = 0; i < req.length; i++) {
            if (req[i].name == user) {
                best_score = req[i].keycount / req[i].seconds;
            }
        }
        return best_score;
    }
    exports.bestti = function (req, user) {
        for (i = 0; i < req.length; i++) {
            if (req[i].name == user) {
                best_time = req[i].seconds;
            }
        }
        return best_time;
    }

}