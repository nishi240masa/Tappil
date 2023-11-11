import * as vscode from 'vscode';
import * as https from "https";
import * as http from "http";


const data = JSON.stringify({
    text: "text",
  });

const url = "http://localhost:3000/api/data";

let keyCount = 0;
let BackCount = 0;
let enter = 0;
let cursorTimer: NodeJS.Timeout | undefined = undefined;
let totalCursorTimeInMilliseconds = 0;
let isVsCodeActive = true; // VSCodeウィンドウがアクティブかどうかを保持する変数


const activeEditor = vscode.window.activeTextEditor;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
        vscode.commands.registerCommand('vscode-Keys.Start', () => {
    // ウィンドウのフォーカス状態が変化したときに呼び出されるイベント
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

    vscode.window.onDidChangeActiveTextEditor(() => {
        if (cursorTimer && !isVsCodeActive) {
            clearInterval(cursorTimer);
            cursorTimer = undefined;
        }
    });

    const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument((event) => {
        const text = event.contentChanges[0]?.text;
        if (/[a-zA-Z0-9]/.test(text)) {
            keyCount++; // キーを押した回数をカウント
        }
        if (text === '\n') {
            enter++;  // エンターキーを押した回数をカウント
        }
        if (text === '') {
            BackCount++;  // バックスペースキーを押した回数をカウント
        }
    });
	vscode.commands.registerCommand('vscode-Keys.showKeyCount', () => {
            const seconds = (totalCursorTimeInMilliseconds).toFixed(2); // カーソルがエディタ上にあった時間を小数点以下2桁まで表示
            vscode.window.showInformationMessage(`キーを ${keyCount} 回押しました。エンターキーを ${enter} 回押しました。バックスペースキーを ${BackCount} 回押しました。マウスカーソルがエディタ上にあった時間: ${seconds} 秒`);



            const datas = {
                "name": "test", 
                  "keycount": keyCount, 
                  "entercount": enter,
                   "backcount": BackCount, 
                   "seconds": seconds,
                headers: {
                  "Content-Type": "application/json",
                },
              };    
            const request = http.request(url,datas, response => {
                console.log(`statusCode: ${response.statusCode}`)
              
              })

		}
        )
    }
    )
    );
}

export function deactivate() {
    if (cursorTimer) {
        clearInterval(cursorTimer);
    }
}
