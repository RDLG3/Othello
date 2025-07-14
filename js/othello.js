var cells; //盤上の石
var count = -1; //経過ターン数
var directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]; //8方向

window.onload = function() {
    loadTable();
    resetGame();
};

/**
 * セルがクリックされた時の処理
 * @param {number} row - 行番号 (0-7)
 * @param {number} col - 列番号 (0-7)
 */
function selectCell(row,col) {  //マスを選択
    if (cells[row][col].className !== "" && cells[row][col].className !== "placeable") {
        return; // すでに石が置かれている場合は何もしない
    }
    
    if (!isValidMove(row, col)) {
        return; // 置けない場合は何もしない（アラートは表示しない）
    }

    // placeableクラスをクリア
    clearPlaceableCells();
    
    putStone(row, col);
    flipStones(row, col);
    updateScore();
    
    setTimeout(function() {
        switchTurn();
    }, 100);
}

/**
 * 指定した位置に石を配置する
 * @param {number} row - 行番号 (0-7)
 * @param {number} col - 列番号 (0-7)
 */
function putStone(row, col) {
    var currentPlayer = getCurrentPlayerClass();
    cells[row][col].className = currentPlayer;
}

/**
 * 現在のプレイヤーのクラス名を取得する
 * @returns {string} "b"（黒）または"w"（白）
 */
function getCurrentPlayerClass() {
    return count % 2 == 0 ? "b" : "w";
}

/**
 * 指定した位置に石を置けるかどうかを判定する
 * @param {number} row - 行番号 (0-7)
 * @param {number} col - 列番号 (0-7)
 * @returns {boolean} 置ける場合はtrue、置けない場合はfalse
 */
function isValidMove(row, col) {
    if (cells[row][col].className !== "" && cells[row][col].className !== "placeable") {
        return false; // すでに石がある
    }
    
    var currentPlayer = getCurrentPlayerClass();
    
    for (var d = 0; d < directions.length; d++) {
        var dr = directions[d][0];
        var dc = directions[d][1];
        
        if (checkDirection(row, col, dr, dc, currentPlayer)) {
            return true;
        }
    }
    
    return false;
}

/**
 * 指定した方向に石を置けるかどうかをチェックする
 * @param {number} row - 行番号 (0-7)
 * @param {number} col - 列番号 (0-7)
 * @param {number} dr - 行の方向 (-1, 0, 1)
 * @param {number} dc - 列の方向 (-1, 0, 1)
 * @param {string} player - プレイヤーのクラス名 ("b" または "w")
 * @returns {boolean} その方向に石を置ける場合はtrue
 */
function checkDirection(row, col, dr, dc, player) {
    var r = row + dr;
    var c = col + dc;
    var foundOpponent = false;
    
    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        var cellClass = cells[r][c].className;
        
        if (cellClass === "" || cellClass === "placeable") {
            return false; // 空のマス
        } else if (cellClass === player) {
            return foundOpponent; // 自分の石が見つかった
        } else {
            foundOpponent = true; // 相手の石が見つかった
        }
        
        r += dr;
        c += dc;
    }
    
    return false;
}

/**
 * 石を配置した後、すべての方向の石を反転させる
 * @param {number} row - 石を置いた行番号 (0-7)
 * @param {number} col - 石を置いた列番号 (0-7)
 */
function flipStones(row, col) {
    var currentPlayer = getCurrentPlayerClass();
    
    for (var d = 0; d < directions.length; d++) {
        var dr = directions[d][0];
        var dc = directions[d][1];
        
        if (checkDirection(row, col, dr, dc, currentPlayer)) {
            flipInDirection(row, col, dr, dc, currentPlayer);
        }
    }
}

/**
 * 指定した方向の石を反転させる
 * @param {number} row - 石を置いた行番号 (0-7)
 * @param {number} col - 石を置いた列番号 (0-7)
 * @param {number} dr - 行の方向 (-1, 0, 1)
 * @param {number} dc - 列の方向 (-1, 0, 1)
 * @param {string} player - プレイヤーのクラス名 ("b" または "w")
 */
function flipInDirection(row, col, dr, dc, player) {
    var r = row + dr;
    var c = col + dc;
    
    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        var cellClass = cells[r][c].className;
        
        if (cellClass === player) {
            break; // 自分の石に到達
        } else {
            cells[r][c].className = player; // 相手の石を反転
        }
        
        r += dr;
        c += dc;
    }
}

/**
 * 現在のプレイヤーが石を置ける有効なマスの一覧を取得する
 * @returns {Array} 有効なマスの座標配列 [[row, col], ...]
 */
function getValidMoves() {
    var validMoves = [];
    var currentPlayer = getCurrentPlayerClass();
    
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            if ((cells[row][col].className === "" || cells[row][col].className === "placeable") && isValidMove(row, col)) {
                validMoves.push([row, col]);
            }
        }
    }
    
    return validMoves;
}

/**
 * 盤面の白と黒の石の数を数えてスコアを更新する
 */
function updateScore() {
    var whiteCount = 0;
    var blackCount = 0;
    
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            if (cells[row][col].className === "w") {
                whiteCount++;
            } else if (cells[row][col].className === "b") {
                blackCount++;
            }
        }
    }
    
    var scoreCells = document.querySelectorAll("#score td");
    scoreCells[0].textContent = whiteCount;
    scoreCells[1].textContent = blackCount;
}

/**
 * ゲームをリセットして初期状態に戻す
 */
function resetGame() {  //ゲームをリセットする
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            cells[row][col].className = "";
        }
    }
    cells[3][3].className = "w";
    cells[3][4].className = "b";
    cells[4][3].className = "b";
    cells[4][4].className = "w";

    count = -1;

    switchTurn();
}

/**
 * HTMLテーブルからゲーム盤のセル要素を2次元配列として読み込む
 */
function loadTable(){   //ゲーム盤を読み込む
    cells = [];
    var td_array = document.getElementById("othello").getElementsByTagName("td");
    var index = 0;
    for (var row = 0; row < 8; row++){
        cells[row] = [];
        for (var col = 0; col < 8; col++){
            cells[row][col] = td_array[index];
            index++;
        }
    }
}

/**
 * ターンを切り替えて次のプレイヤーの手番にする
 * パスやゲーム終了の判定も行う
 */
function switchTurn(){
    count++;
    showTurn();
    
    // 現在のプレイヤーが置けるマスがあるかチェック
    var validMoves = getValidMoves();
    
    if (validMoves.length === 0) {
        // 置けるマスがない場合、相手のターンをチェック
        count++;  // 相手に変更
        showTurn();
        
        var opponentValidMoves = getValidMoves();
        
        if (opponentValidMoves.length === 0) {
            // 両方のプレイヤーが置けない場合、ゲーム終了
            endGame();
            return;
        }
        
        // 相手が置けるマスがある場合は相手のターンを続ける
        var currentPlayerName = count % 2 == 0 ? "黒" : "白";
        document.getElementById("turn").textContent = currentPlayerName + "のターン (パスされました)";
        
        setTimeout(function() {
            showTurn();
            showPlaceableCells(); // パス後に配置可能マスを表示
        }, 2000);
    } else {
        // 配置可能なマスを表示
        showPlaceableCells();
    }
    
    updateScore();
    
    // ゲーム終了チェック（盤面が満杯の場合）
    var totalStones = 0;
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            if (cells[row][col].className === "w" || cells[row][col].className === "b") {
                totalStones++;
            }
        }
    }
    
    if (totalStones === 64) {
        endGame();
    }
}

/**
 * ゲームを終了して勝敗を判定・表示する
 */
function endGame() {
    // ゲーム終了時はplaceableクラスをクリア
    clearPlaceableCells();
    
    var whiteCount = 0;
    var blackCount = 0;
    
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            if (cells[row][col].className === "w") {
                whiteCount++;
            } else if (cells[row][col].className === "b") {
                blackCount++;
            }
        }
    }
    
    var result;
    if (whiteCount > blackCount) {
        result = "白の勝利！";
    } else if (blackCount > whiteCount) {
        result = "黒の勝利！";
    } else {
        result = "引き分け！";
    }
    
    document.getElementById("turn").textContent = "ゲーム終了 - " + result;
}

/**
 * 現在のプレイヤーを画面に表示する
 */
function showTurn() {   //現在のプレイヤーを表示する
    if (count % 2 == 0) {
        document.getElementById("turn").textContent = "黒のターン";
    } else {
        document.getElementById("turn").textContent = "白のターン";
    }
}

/**
 * 現在のプレイヤーが石を置ける位置にplaceableクラスを追加して表示する
 */
function showPlaceableCells() {
    // まず全てのplaceableクラスをクリア
    clearPlaceableCells();
    
    // 現在のプレイヤーが置けるマスを取得
    var validMoves = getValidMoves();
    
    // 置けるマスにplaceableクラスを追加
    for (var i = 0; i < validMoves.length; i++) {
        var row = validMoves[i][0];
        var col = validMoves[i][1];
        cells[row][col].className = "placeable";
    }
}

/**
 * 盤面上のすべてのplaceableクラスを削除する
 */
function clearPlaceableCells() {
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            if (cells[row][col].className === "placeable") {
                cells[row][col].className = "";
            }
        }
    }
}
