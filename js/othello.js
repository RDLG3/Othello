var cells; //盤上の石
var count = 0; //経過ターン数

window.onload = function() {
    loadTable();
    showTurn();
};

function selectCell(row,col) {  //マスを選択
    if (putStone(row,col) == false) {   //選択したマスが置けるかどうか
        alert("ここには置けません");
        return;
    }

    count++;

    showTurn();
}

function putStone(row,col){
    if (cells[row][col].className != "")
        return false;
    
    var totalCount = 0;
    var getCount, myStone, yourStone;

    if (count % 2 == 0) {
        myStone = "w";
        yourStone = "b";
    } else {
        myStone = "b";
        yourStone = "w";
    }
    
    if (row != 0) {   //上方向
        getCount = 0;
        for (var y = row - 1; y >= 0; y--) {
            if (cells[y][col].className == yourStone) {
                getCount++;
            } else if (cells[y][col].className == myStone) {
                if (getCount > 0) {
                for (var yy = row - 1; yy >= row - getCount; yy--) {
                cells[yy][col].className = myStone;
                }
                totalCount += getCount;
                }
                break;
            } else {
            break;
            }
        }
    }

    if (row != 0 && col != 7) {   //右上方向
        getCount = 0;
        var x = col;
        for (var y = row - 1; y >= 0; y--) {
            x++;
            if (cells[y][x].className == yourStone) {
                getCount++;
            } else if (cells[y][x].className == myStone) {
                if (getCount > 0) {
                    var xx = col;
                    for (var yy = row - 1; yy >= row - getCount; yy--) {
                        xx ++;
                        cells[yy][xx].className = myStone;
                    }
                    totalCount += getCount;
                }
                break;
            } else {
                break;
            }
        }
    }

    if (col != 7) {   //右方向
        getCount = 0;
        for (var x = col + 1; x <= 7; x++) {
            if (cells[row][x].className == yourStone) {
                getCount++;
            } else if (cells[row][x].className == myStone) {
                if (getCount > 0) {
                    for (var xx = col + 1; xx <= col + getCount; xx++) {
                        cells[row][xx].className = myStone;
                    }
                    totalCount += getCount;
                }
                break;
            } else {
                break;
            }
        }
    }

    if (row != 7 && col != 7) {   //右下方向
        getCount = 0;
        var x = col;
        for(var y = row + 1; y <= 7; y++){
            x++;
            if (cells[y][x].className == yourStone) {
                getCount++;
            } else if (cells[y][x].className == myStone) {
                if (getCount > 0) {
                    var xx = col;
                    for (var yy = row + 1; yy <= row + getCount; yy++) {
                        xx ++;
                        cells[yy][xx].className = myStone;
                    }
                    totalCount += getCount;
                }
                break;
            } else {
                break;
            }
        }
    }

    if (row != 7) {   //下方向
        getCount = 0;
        for (var y = row + 1; y <= 7; y++) {
            if (cells[y][col].className == yourStone) {
                getCount++;
            } else if (cells[y][col].className == myStone) {
                if (getCount > 0) {
                    for (var yy = row + 1; yy <= row + getCount; yy++) {
                        cells[yy][col].className = myStone;
                    }
                    totalCount += getCount;
                }
                break;
            } else {
                break;
            }
        }
    }

    if (row != 7 && col !=0) {    //左下方向
        getCount = 0;
        var x = col;
        for (var y = row + 1; y <= 7; y++) {
            x--;
            if (cells[y][x].className == yourStone) {
                getCount++;
            } else if (cells[y][x].className == myStone) {
                if (getCount > 0) {
                    var xx = col;
                    for (var yy = row + 1; yy <= row + getCount; yy++) {
                        xx --;
                        cells[yy][xx].className = myStone;
                    }
                    totalCount += getCount;
                }
                break;
            } else {
                break;
            }
        }
    }

    if (col != 0) {   //左方向
        getCount = 0;
        for (var x = col - 1; x >= 0; x--) {
        if (cells[row][x].className == yourStone) {
            getCount++;
        } else if (cells[row][x].className == myStone) {
            if (getCount > 0) {
            for (var xx = col - 1; xx >= col - getCount; xx--) {
                cells[row][xx].className = myStone;
            }
            totalCount += getCount;
            }
            break;
        } else {
            break;
        }
        }
    }

    if (row != 0 && col != 0) {   //左上方向
        getCount = 0;
        var x = col;
        for (var y = row - 1; y >= 0; y--) {
        x--;
        if (cells[y][x].className == yourStone) {
            getCount++;
        } else if (cells[y][x].className == myStone) {
            if (getCount > 0) {
            var xx = col;
            for (var yy = row - 1; yy >= row - getCount; yy--) {
                xx--;
                cells[yy][xx].className = myStone;
            }
            totalCount += getCount;
            }
            break;
        } else {
            break;
        }
        }
    }

    if (totalCount == 0) {  //相手の石を獲得できたか？
        return false;
    }

    cells[row][col].className = myStone;    //新しく自分の石を置く

    return true;
}

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

    count = 0;

    showTurn();
}

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

function showTurn() {   //現在のプレイヤーを表示する
    if (count % 2 == 0) {
        document.getElementById("turn").textContent = "白のターン";
    } else {
        document.getElementById("turn").textContent = "黒のターン";
    }
}
