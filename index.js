//各マーク
const CIRCLE = "●";
const CROSS = "×";

const ID_LIST = [
    ["s1","s2","s3"],
    ["s4","s5","s6"],
    ["s7","s8","s9"],
];

//ターン数
let turn = 1;

//指定のID取得
function $(id) {
    return document.getElementById(id);
}

//どちらのターンか判別
function isCircle() {
    return turn % 2 === 1;
}

//ターン表示を切り替える
function changeNowPlayer() {
    if(isCircle()) $("tool_nowPlayer").innerHTML = CIRCLE + "のターン";
    else $("tool_nowPlayer").innerHTML = CROSS + "のターン";
}

//3つのマス目が同じか判定
function isComplete(firstId, secondId, thirdId) {
    if(
        $(firstId).value === "" ||
        $(secondId).value === "" ||
        $(thirdId).value === ""
    )
  return;

    if(
        $(firstId).value === $(secondId).value &&
        $(secondId).value === $(thirdId).value
    )
    return true;
    return false;
}

//どこかに揃っている列があるか
function completeMark() {
    //終わりかどうか判定する
    let isEnd = false;

    //横列
    for (let row = 0; row < 3; row++) {
        isComplete(ID_LIST[row][0], ID_LIST[row][1], ID_LIST[row][2]);
        if (isEnd) {
            winLossResults($(ID_LIST[row][0]).value + "の勝利！");
            return true;
        }
    }

    //縦列
    for (let col = 0; col < 3; col++) {
        isEnd = isComplete(ID_LIST[0][col], ID_LIST[1][col], ID_LIST[2][col]);
        if (isEnd) {
            winLossResults($(ID_LIST[0][col]).value + "の勝利！");
            return true;
        }
    }

    //斜め、左下
    isEnd = isComplete(ID_LIST[0][2], ID_LIST[1][1], ID_LIST[2][0]);
    if (isEnd) {
        winLossResults($(ID_LIST[0][2]).value + "の勝利！");
        return true;
    }

    //斜め、右下
    isEnd = isComplete(ID_LIST[0][0], ID_LIST[1][1], ID_LIST[2][2]);
    if (isEnd) {
        winLossResults($(ID_LIST[0][0]).value + "の勝利！");
        return true;
  }

    //引き分けの場合
    if (turn >= 9) {
        winLossResults("引き分け");
        return true;
    }

    //いずれも揃ってない
    return false;
}

//クリックされたマス目を取得してマーク入力
function clickToCheck(e) {   
    //ゲームが実行中でなければ終了
    if (!isRun) return;

    let id = e.target.id;    //クリックされたマス目のIDを取得
    let object =$(id);  //クリックされたマス目をDOMオブジェクトとして取得

    //すでにマークが入っている場合は処理を終了
    if (object.value !== "") return;

    if (isCircle()) object.value = CIRCLE;  //●のとき
    else object.value = CROSS;  //×のとき

    //３マスが揃ったかどうか判定する
    if (completeMark()) return;

    //ターン数を１増やす
    turn++;

    //次のプレイヤーに交代
    changeNowPlayer();
}

//勝敗結果を表示する
function winLossResults(message) {
  // ゲームは実行中ではない
  isRun = false;

  $("tool_resultText").innerHTML = message;

  // ターン表示削除する
  $("tool_nowPlayer").style.display = "none";

  // 勝敗表示
  $("tool_resultText").style.display = "block";
}


function resetAction() {
    turn = 1;
    changeNowPlayer();
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++){
            $(ID_LIST[row][col]).value = "";
        }
    }

    //結果表示を消す
    winLossResults("");
    //ターンの表示を出す
    $("tool_nowPlayer").style.display = "block";
    //勝敗表示の削除
    $("tool_resultText").style.display = "none";
    //ゲームを実行中にする
    isRun = true;
}

function onloadAction() {     //ロードで実行される関数
   //繰り返し処理で記述する
   for(let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            $(ID_LIST[row][col]).onclick = clickToCheck;
        }
   }

   //リセット関数を設定
   $("reset").onclick = resetAction;
   //リセットを実行
   resetAction();    
}

window.onload = onloadAction;  