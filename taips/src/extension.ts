import * as vscode from 'vscode';

import axios from 'axios';
import * as https from "https";
import * as http from "http";
import { Console } from 'console';



async function promptForName(name: string | undefined) {
    name = await vscode.window.showInputBox({
        prompt: 'Please enter your name',
        placeHolder: 'Your Name'
    });
    if (name) {
        vscode.window.showInformationMessage(`Hello, ${name}!`);
    } else {
        vscode.window.showWarningMessage('No name entered.');
    }
    //nameに入力された文字列入ってる


}



const data = JSON.stringify({
    text: "text",
});

const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};
const url = "https://tappil-web.onrender.com/api/data";

let keyCount = 0;
let BackCount = 0;
let enter = 0;
let cursorTimer: NodeJS.Timeout | undefined = undefined;
let totalCursorTimeInMilliseconds = 0;
let isVsCodeActive = true; // VSCodeウィンドウがアクティブかどうかを保持する変数
let name: string | undefined = undefined;


const activeEditor = vscode.window.activeTextEditor;

export function activate(context: vscode.ExtensionContext) {
    // この処理は、拡張機能がアクティブになったときに実行されます。
    context.subscriptions.push(

        vscode.commands.registerCommand('extension.promptForName', async () => {
            const result = await vscode.window.showInputBox({
                prompt: 'Please enter your name',
                placeHolder: 'Your Name'
            });
            if (result !== undefined) {
              name = result;
                vscode.window.showInformationMessage(`Hello, ${name}!`);
            } else {
                vscode.window.showWarningMessage('No name entered.');
            }
        }),





        // この処理は、拡張機能がアクティブになったときに実行されます。

        vscode.commands.registerCommand('vscode-Keys.Start', () => {

            console.log(name);

            if (name !== undefined) {
                vscode.window.showInformationMessage(`たいぷず開始！！`);
    
        

            vscode.window.onDidChangeWindowState((windowState) => {
                isVsCodeActive = windowState.focused; // ウィンドウがアクティブかどうかを更新
                if (!isVsCodeActive) {
                    // ウィンドウがアクティブでない場合、タイマーを停止
                    if (cursorTimer) {
                        clearInterval(cursorTimer);
                        cursorTimer = undefined;
                    }
                }
            });
            // カーソルがエディタ上にある時間を計測する
            vscode.window.onDidChangeTextEditorSelection((e) => {
                if (e.textEditor && isVsCodeActive) {
                    if (!cursorTimer) {
                        console.log('Cursor timer started');
                        cursorTimer = setInterval(() => {
                            totalCursorTimeInMilliseconds += 1;
                            console.log('Elapsed time:', totalCursorTimeInMilliseconds, 'milliseconds');
                        }, 1000);
                    }
                }
            });

            // エディタがアクティブになったときに呼び出されるイベント
            vscode.window.onDidChangeActiveTextEditor(() => {
                if (cursorTimer && !isVsCodeActive) {
                    clearInterval(cursorTimer);
                    cursorTimer = undefined;
                }
            });

            // テキストが変更されたときに呼び出されるイベント
            const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument((event) => {
                const text = event.contentChanges[0]?.text;
                if (text === 'a' || text === 'b' || text === 'c' || text === 'd' || text === 'e' || text === 'f' || text === 'g' || text === 'h' || text === 'i' || text === 'j' || text === 'k' || text === 'l' || text === 'm' || text === 'n' || text === 'o' || text === 'p' || text === 'q' || text === 'r' || text === 's' || text === 't' || text === 'u' || text === 'v' || text === 'w' || text === 'x' || text === 'y' || text === 'z' || text === 'A' || text === 'B' || text === 'C' || text === 'D' || text === 'E' || text === 'F' || text === 'G' || text === 'H' || text === 'I' || text === 'J' || text === 'K' || text === 'L' || text === 'M' || text === 'N' || text === 'O' || text === 'P' || text === 'Q' || text === 'R' || text === 'S' || text === 'T' || text === 'U' || text === 'V' || text === 'W' || text === 'X' || text === 'Y' || text === 'Z' || text === '1' || text === '2' || text === '3' || text === '4' || text === '5' || text === '6' || text === '7' || text === '8' || text === '9' || text === '0') {
                    keyCount++; // キーを押した回数をカウント
                    console.log(keyCount);
                }
                if (text === '\n') {
                    enter++;  // エンターキーを押した回数をカウント
                }
                if (text === '') {
                    BackCount++;  // バックスペースキーを押した回数をカウント
                }
            });
        } else {
            vscode.window.showInformationMessage(`名前を入力してください`);
        }

        }),


        vscode.commands.registerCommand('vscode-Keys.showKeyCount', () => {
            if(name !== undefined){
            const seconds = (totalCursorTimeInMilliseconds).toFixed(2); // カーソルがエディタ上にあった時間を小数点以下2桁まで表示
            vscode.window.showInformationMessage(`キーを ${keyCount} 回押しました。エンターキーを ${enter} 回押しました。バックスペースキーを ${BackCount} 回押しました。マウスカーソルがエディタ上にあった時間: ${seconds} 秒`);

            console.log(name);

            const datas = {
                "name": name,
                "keycount": keyCount,
                "entercount": enter,
                "backcount": BackCount,
                "seconds": seconds,
            };
            sendToApi(datas);

            console.log(datas);

            async function sendToApi(datas: any): Promise<axios.AxiosResponse | undefined> {
                try {
                    const response = await axios.post(url, datas, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    return response;
                } catch (error) {
                    console.error(error);
                }


            }
            // 送信後にカウントをリセット
            keyCount = 0;
            BackCount = 0;
            enter = 0;
            totalCursorTimeInMilliseconds = 0;
           
        }else{
            vscode.window.showInformationMessage(`名前を入力してください`); 
        }

        }),

    );
}
