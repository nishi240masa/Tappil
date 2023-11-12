
// exports.gifn= function(req, res){

//     if(req == "ww"){
//         res.status(200).json({
//             mesage: "ok"

//         });

//     }else{
//         console.log("error");

//     }
// };


exports.gifn = function(req){
    if(req == "ww"){
        return "ok";
    }else{
        return "error";

    }
}

// test = function(){
//   return"test";
// };

// module.exports = {test};

// let key_data = 0;
// let time_data = 0;
// let score_data = 0;
// let gif_data = 0;
// for(i = 0 ,i < resurt.length,i++){
//     key_data += resurt[i].keycount;
//     time_data += resurt[i].seconds;
// }
// score_data = key_data / time_data;
// if(score_data > 110{
//     gif_data = 5;
// }else if(score_data > 70){
//     gif_data = 4;
// }else if(score_data > 40){
//     gif_data = 3;   
// }else if(score_data > 10){
//     gif_data = 2;
// }else{
//     gif_data = 1;
// }
// 