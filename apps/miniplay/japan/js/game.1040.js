var screenWidth = 640,
screenHeight = 960;
var renderer = PIXI.autoDetectRenderer(screenWidth, screenHeight);
document.body.appendChild(renderer.view);
var interactive = false,
stage = new PIXI.Stage(0, interactive);
var Titles = function() {
    this.starttitle = ["日本头号战犯已被抓进监狱， 交给你来收拾他们！！！", "请勿疲劳暴打小日本~ 手抽不负责！！", "习惯性暴揍小日本， 轻松治愈受挫心灵。", "爱国不是口号，更是行动， 快来和我一起捅鬼子", "痛恨小日本侵犯我们的领土吗？ 报仇的时候来了，根本停不下来， 让你爽到爆！", "日本战犯正在准备越狱，快阻止 他们，什么，苍老师也在？！", "猛戳日本鬼子的时候 注意不要误伤老师哟", "点击屏幕，暴打小日本！ 让你爽到爆！"];
    this.endtitle = ["胜似王二小", "强过小兵张嘎", "翻版双枪老太婆", "英雄李向阳归来", "真乃在世李云龙"];
    this.endratio = [[10, 39], [40, 59], [60, 79], [80, 89], [90, 99]]
};
Titles.constructor = Titles;
Titles.prototype.getStartTitle = function() {
    var b = this.starttitle.length;
    var a = Math.floor(Math.random() * b);
    return this.starttitle[a]
};
Titles.prototype.getEndTitle = function() {
    if (gameMod == 0) {
        if (userScore < 700) {
            return 0
        } else {
            if (userScore < 1000) {
                return 1
            } else {
                if (userScore < 1400) {
                    return 2
                } else {
                    if (userScore < 1800) {
                        return 3
                    } else {
                        return 4
                    }
                }
            }
        }
    } else {
        if (userScore < 500) {
            return 0
        } else {
            if (userScore < 650) {
                return 1
            } else {
                if (userScore < 800) {
                    return 2
                } else {
                    if (userScore < 1000) {
                        return 3
                    } else {
                        return 4
                    }
                }
            }
        }
    }
};
Titles.prototype.getEndratio = function(a) {
    return Math.floor(Math.random() * (this.endratio[a][1] - this.endratio[a][0])) + this.endratio[a][0]
};
var Time = function() {
    this.gameDuration = 35000;
    this.freeze = 200;
    this.startTime = this.lastTime = this.timeleft = 0
};
Time.constructor = Time;
Time.prototype.update = function() {
    var f = Date.now();
    this.timeleft = this.gameDuration - (f - this.startTime);
    var c = Math.round(this.timeleft / 1000);
    if (showhits > 0 && f > showhits) {
        var a = hitsTexture.shift();
        while (a != undefined) {
            stage.removeChild(a);
            a = hitsTexture.shift()
        }
        stage.removeChild(hittext);
        showhits = 0
    }
    if (showminus > 0 && f > showminus) {
        stage.removeChild(minusscore);
        showminus = 0
    }
    if (this.timeleft > 0) {
        timeText.setText(c + "秒");
        var d = this.timeleft - (this.gameDuration - (555 - 24) / 555 * this.gameDuration);
        0 > d && (d = 0);
        var b = d / this.gameDuration * 555;
        timemiddlebar.width = b;
        timerightbar.position.x = 55 + b
    } else {
        timeleftbar.width = 0;
        timemiddlebar.width = 0;
        timerightbar.width = 0;
        stage.addChild(startbackground);
        finalScoreText.setText(userScore);
        finalScoreText.position.x = (screenWidth - finalScoreText.width) / 2;
        stage.addChild(finalScoreText);
        stage.addChild(scoreprofile);
        var e = title.getEndTitle();
        shareData.sDesc = sprintf("我灭了{count}只鬼子， 超{ratio}%的人，{title}", {
            count: userScore,
            ratio: title.getEndratio(e),
            title: title.endtitle[e]
        });
        finalTitleText.setText(shareData.sDesc + "！");
        finalTitleText.position.x = (screenWidth - finalTitleText.width) / 2;
        stage.addChild(finalTitleText);
        stage.addChild(restartbutton);
        stage.addChild(fenxiangbutton);
        GAME.currentScreen = "scoreScreen";
        console.log("times up!")
    }
};
Time.prototype.start = function() {
    this.startTime = this.lastTime = Date.now();
    userScore = gameHits = 0
};
Time.prototype.showGUIZI = function() {
    var h = Date.now();
    var a = this.getGameStage();
    var b = GAME.cast.SHOWTIME[gameMod][0][a];
    for (var d = 0; d < gameCellCount; d++) {
        if (gameCells[d][3] > 0 && h - gameCells[d][1] > gameCells[d][2]) {
            GAME.game.resetCell(d);
            if (gameCells[d][3] == 1) {
                delete GAME.cast.onstageGUIZI[gameCells[d][0]];
                userScore -= GAME.game.scores[1][a];
                gameHits = 0;
                0 > userScore && (userScore = 0);
                gameCells[d] = [ - 1, h, this.freeze, 5]
            } else {
                if (gameCells[d][3] == 2 || gameCells[d][3] == 4) {
                    gameCells[d] = [ - 1, h, this.freeze, 5]
                } else {
                    if (gameCells[d][3] == 3) {
                        delete GAME.cast.onstageGUIZI[gameCells[d][0]];
                        gameCells[d] = [ - 1, h, this.freeze, 5]
                    } else {
                        if (gameCells[d][3] == 5) {
                            emptyCells[d] = 1;
                            gameCells[d] = [ - 1, 0, 0, 0]
                        }
                    }
                }
            }
        }
    }
    if (GAME.cast.onstageGIRL[0] != undefined && h - this.startTime > GAME.cast.onstageGIRL[0][1]) {
        var c = GAME.game.selectCell();
        if (c !== null) {
            var g = GAME.cast.SHOWTIME[gameMod][2][a];
            var f = GAME.cast.onstageGIRL[0][0];
            GAME.cast.stageGirl(c, f);
            gameCells[c] = [GAME.cast.onstageGIRL[0][0], h, g, 2];
            GAME.cast.onstageGIRL.shift()
        }
    }
    if (h - this.lastTime > b) {
        this.lastTime = h;
        var c = GAME.game.selectCell();
        if (c !== null) {
            var e = GAME.cast.selectGuizi();
            var g = GAME.cast.SHOWTIME[gameMod][1][a];
            gameCells[c] = [e, h, g, 1];
            GAME.cast.onstageGUIZI[e] = 1;
            GAME.cast.stageGuizi(c, e)
        }
    }
};
Time.prototype.getGameStage = function() {
    var b = Date.now();
    var a = b - this.startTime;
    if (gameMod == 0) {
        if (a < 10000) {
            phase = 0
        } else {
            if (a < 23000) {
                phase = 1
            } else {
                if (a < 30000) {
                    phase = 2
                } else {
                    phase = 3
                }
            }
        }
    } else {
        if (a < 10000) {
            phase = 0
        } else {
            if (a < 20000) {
                phase = 1
            } else {
                if (a < 30000) {
                    phase = 2
                } else {
                    phase = 3
                }
            }
        }
    }
    return phase
};
var Cast = function() {
    this.onstageGUIZI = {};
    this.onstageGIRL = [];
    this.GUIZI = [[PIXI.Texture.fromImage("images/renwu/anbei_01.png?1"), PIXI.Texture.fromImage("images/renwu/anbei_02.png"), 12, 38, 1, 30, 4, 12, "安倍晋三", "我爷爷就是臭流氓， 我爸也是，我一定 要将流氓事业进行 到底…."], [PIXI.Texture.fromImage("images/renwu/dongtiaoyingji_01.png?1"), PIXI.Texture.fromImage("images/renwu/dongtiaoyingji_02.png"), 12, 42, 4, 31, 5, 15, "东条英机", "当年我是何等的风 光，大东亚共荣， 死啦死啦滴。我一 定会回来的！"], [PIXI.Texture.fromImage("images/renwu/shanben56_01.png?1"), PIXI.Texture.fromImage("images/renwu/shanben56_02.png"), 10, 30, 1, 20, 3, 3, "山本五十六", "我在珍珠港打飞机 打得好爽，我想飞 的更高，更高，更 高，更……啊….."], [PIXI.Texture.fromImage("images/renwu/shiyuan_01.png?1"), PIXI.Texture.fromImage("images/renwu/shiyuan_02.png"), 12, 32, 1, 22, 6, 6, "石原慎太郎", "我左青龙右白虎， 中间夹个米老鼠， 专业搅局一辈子， 遏制中国不停手。"], [PIXI.Texture.fromImage("images/renwu/tufei_01.png?1"), PIXI.Texture.fromImage("images/renwu/tufei_02.png"), 14, 48, 3, 30, 5, 21, "土肥原贤二", "虽然名字叫土肥， 其实是个瘦干。我 在中国混的风生水 起，谁敢惹我？"], [PIXI.Texture.fromImage("images/renwu/xiaoquan_01.png?1"), PIXI.Texture.fromImage("images/renwu/xiaoquan_02.png"), -2, 27, -10, 17, -7, 3, "小泉纯一郎", "死皮赖脸，死不要 脸、死缠蛮打是我 的特长，日本侵略 过中国吗，没有！"]];
    this.GIRL = [[PIXI.Texture.fromImage("images/renwu/bo_01.png?1"), PIXI.Texture.fromImage("images/renwu/bo_02.png"), 27, 21, 30, -21, 15, 0, "波多野结衣", "很自豪的跟你说， 你的200T硬盘被 我承包了~"], [PIXI.Texture.fromImage("images/renwu/cang_01.png?1"), PIXI.Texture.fromImage("images/renwu/cang_02.png"), 35, 29, 10, -15, 25, 0, "苍井空", "我来给你们涨涨姿 势，请叫我德艺双 馨人民艺术家，乃 们不要再黑我了"], [PIXI.Texture.fromImage("images/renwu/long_01.png?1"), PIXI.Texture.fromImage("images/renwu/long_02.png"), 35, 30, 25, -12, 25, 0, "泷泽萝拉", "我漂亮吗？我在监 狱风云等着你哦， 你一定要来哦"]];
    this.SHOWTIME = [[[400, 300, 167, 125], [700, 700, 600, 500], [1500, 1000, 800, 600]], [[800, 400, 300, 240], [900, 800, 800, 700], [1000, 800, 600, 600]]]
};
Cast.constructor = Cast;
Cast.prototype.selectGuizi = function(a) {
    var b = Math.floor(Math.random() * guiziCount);
    while (1) {
        if (this.onstageGUIZI[b] != undefined) {
            b = Math.floor(Math.random() * guiziCount)
        } else {
            return b
        }
    }
};
Cast.prototype.initGirls = function() {
    var f = 0,
    c = [],
    b;
    GAME.cast.onstageGIRL = [];
    for (var d = 0,
    a = GAME.game.girltime[gameMod].length; d < a; d++) {
        var e = GAME.game.girltime[gameMod][d];
        b = Math.round((e[0] + Math.random() * (e[1] - e[0])) * 1000);
        f = d % girlCount;
        c = [f, b];
        GAME.cast.onstageGIRL.push(c)
    }
};
Cast.prototype.stageGuizi = function(a, b) {
    cellSpirits[a].setTexture(this.GUIZI[b][0]);
    cellSpirits[a].position.x = cellbarPositions[a][0] + this.GUIZI[b][2];
    cellSpirits[a].position.y = cellbarPositions[a][1] + this.GUIZI[b][3]
};
Cast.prototype.strikeGuizi = function(a, b) {
    cellSpirits[a].setTexture(this.GUIZI[b][1]);
    cellSpirits[a].position.x = cellbarPositions[a][0] + this.GUIZI[b][4];
    cellSpirits[a].position.y = cellbarPositions[a][1] + this.GUIZI[b][5]
};
Cast.prototype.stageGirl = function(a, b) {
    cellSpirits[a].setTexture(this.GIRL[b][0]);
    cellSpirits[a].position.x = cellbarPositions[a][0] + this.GIRL[b][2];
    cellSpirits[a].position.y = cellbarPositions[a][1] + this.GIRL[b][3]
};
Cast.prototype.strikeGirl = function(a, b) {
    cellSpirits[a].setTexture(this.GIRL[b][1]);
    cellSpirits[a].position.x = cellbarPositions[a][0] + this.GIRL[b][4];
    cellSpirits[a].position.y = cellbarPositions[a][1] + this.GIRL[b][5]
};
var Jianyu = function() {
    this.scores = [[1, 1, 1, 1], [0, 0, 0, 0], [2, 2, 2, 2]];
    this.girltime = [[[5, 7], [7, 10], [10, 12], [12, 14], [14, 16], [16, 18], [18, 20], [20, 22], [22, 24], [24, 25], [25, 27], [27, 29], [29, 30], [30, 31], [31, 32], [32, 34]], [[5, 7], [7, 10], [10, 13], [13, 15], [15, 17], [17, 20], [20, 24], [24, 27], [27, 30], [30, 34]]]
};
Jianyu.constructor = Jianyu;
Jianyu.prototype.update = function() {
    GAME.time.update();
    GAME.time.showGUIZI();
    scoreText.setText(userScore);
    scoreText.position.x = (screenWidth - scoreText.width) / 2
};
Jianyu.prototype.start = function() {
    if (GAME.currentScreen === null) {
        stage.removeChild(startbackground);
        stage.removeChild(loadingguizibg);
        stage.removeChild(loadingguizi);
        stage.removeChild(guiziName);
        stage.removeChild(guiziText);
        stage.removeChild(titleText);
        stage.removeChild(biaozhunbutton);
        stage.removeChild(fengkuangbutton)
    } else {
        timeleftbar.width = 12;
        timemiddlebar.width = 531;
        timerightbar.width = 12;
        timerightbar.position.x = 586;
        if (GAME.time.timeleft <= 0) {
            stage.removeChild(startbackground);
            stage.removeChild(finalScoreText);
            stage.removeChild(scoreprofile);
            stage.removeChild(finalTitleText);
            stage.removeChild(restartbutton);
            stage.removeChild(fenxiangbutton)
        }
    }
    GAME.time.start();
    GAME.cast.initGirls();
    GAME.cast.onstageGUIZI = [];
    for (var a = 0; a < gameCellCount; a++) {
        gameCells[a] = [ - 1, 0, 0, 0];
        emptyCells[a] = 1;
        this.resetCell(a)
    }
    GAME.currentScreen = "gameScreen"
};
Jianyu.prototype.restart = function() {
    timeleftbar.width = 12;
    timemiddlebar.width = 531;
    timerightbar.width = 12;
    timerightbar.position.x = 586;
    stage.removeChild(finalScoreText);
    stage.removeChild(scoreprofile);
    stage.removeChild(finalTitleText);
    stage.removeChild(restartbutton);
    stage.removeChild(fenxiangbutton);
    stage.addChild(loadingguizibg);
    var a = Math.floor(Math.random() * gameCellCount);
    if (a < 6) {
        loadingguizi = new PIXI.Sprite(GAME.cast.GUIZI[a][0]);
        loadingguizi.position.x = 130 + GAME.cast.GUIZI[a][6];
        loadingguizi.position.y = 285 + GAME.cast.GUIZI[a][7];
        guiziName.setText(GAME.cast.GUIZI[a][8]);
        guiziText.setText(GAME.cast.GUIZI[a][9])
    } else {
        a -= 6;
        loadingguizi = new PIXI.Sprite(GAME.cast.GIRL[a][0]);
        loadingguizi.position.x = 130 + GAME.cast.GIRL[a][6];
        loadingguizi.position.y = 285 + GAME.cast.GIRL[a][7];
        guiziName.setText(GAME.cast.GIRL[a][8]);
        guiziText.setText(GAME.cast.GIRL[a][9])
    }
    stage.addChild(loadingguizi);
    stage.addChild(guiziName);
    stage.addChild(guiziText);
    stage.addChild(titleText);
    stage.addChild(biaozhunbutton);
    stage.addChild(fengkuangbutton);
    GAME.currentScreen = null
};
Jianyu.prototype.selectCell = function() {
    if (emptyCells.length == 0) {
        console.log("null cell");
        return null
    }
    var c = [];
    for (var b in emptyCells) {
        c[c.length] = b
    }
    var a = Math.floor(Math.random() * c.length);
    delete emptyCells[c[a]];
    return c[a]
};
Jianyu.prototype.resetCell = function(a) {
    cellSpirits[a].setTexture(cellbarTexture);
    cellSpirits[a].position.x = cellbarPositions[a][0] + 30;
    cellSpirits[a].position.y = cellbarPositions[a][1]
};
Jianyu.prototype.getPlusScore = function() {
    if (gameMod == 0) {
        if (gameHits < 3) {
            return 0
        } else {
            return gameHits - 2
        }
    } else {
        if (gameHits < 3) {
            return 0
        } else {
            if (gameHits < 18) {
                return gameHits - 2
            } else {
                return 15
            }
        }
    }
};
Jianyu.prototype.touch = function(a) {
    if (GAME.currentScreen == "gameScreen") {
        var c = GAME.time.getGameStage();
        if (gameCells[a][3] == 1) {
            gameHits++;
            var h = this.getPlusScore();
            GAME.cast.strikeGuizi(a, gameCells[a][0]);
            userScore += this.scores[0][c] + h;
            gameCells[a] = [gameCells[a][0], Date.now(), GAME.time.freeze, 3];
            if (h > 0) {
                var g = gameHits.toString().split("");
                var d = 0;
                for (var f = 0,
                b = g.length; f < b; f++) {
                    if (hitsTexture[f] == undefined) {
                        var e = new PIXI.Sprite(digits[g[f]][0])
                    } else {
                        var e = hitsTexture[f];
                        e.setTexture(digits[g[f]][0])
                    }
                    e.position.x = cellbarPositions[a][0] + 60 + d;
                    e.position.y = cellbarPositions[a][1] + 7;
                    d += digits[g[f]][1];
                    if (hitsTexture[f] == undefined) {
                        hitsTexture.push(e);
                        stage.addChild(e)
                    }
                }
                hittext.position.x = cellbarPositions[a][0] + 60 + d;
                hittext.position.y = cellbarPositions[a][1];
                if (showhits == 0) {
                    stage.addChild(hittext)
                }
                showhits = Date.now() + 600
            }
        } else {
            if (gameCells[a][3] == 2) {
                GAME.cast.strikeGirl(a, gameCells[a][0]);
                userScore -= this.scores[2][c];
                gameHits = 0;
                0 > userScore && (userScore = 0);
                gameCells[a] = [ - 1, Date.now(), GAME.time.freeze, 4];
                minusscore.position.x = cellbarPositions[a][0] + 175;
                minusscore.position.y = cellbarPositions[a][1] + 75;
                if (showminus == 0) {
                    stage.addChild(minusscore)
                }
                showminus = Date.now() + 600
            }
        }
    }
};
Startup = function() {
    var b = PIXI.Sprite.fromImage("images/loading_bg.jpg?1");
    stage.addChild(b);
    var a = PIXI.Sprite.fromImage("images/loading.png");
    a.position.x = 160;
    a.position.y = 432;
    stage.addChild(a);
    this.loader = new PIXI.AssetLoader(["images/renwu/anbei_01.png?1", "images/renwu/anbei_02.png", "images/renwu/bo_01.png?1", "images/renwu/bo_02.png", "images/renwu/cang_01.png?1", "images/renwu/cang_02.png", "images/renwu/dongtiaoyingji_01.png?1", "images/renwu/dongtiaoyingji_02.png", "images/renwu/long_01.png?1", "images/renwu/long_02.png", "images/renwu/shanben56_01.png?1", "images/renwu/shanben56_02.png", "images/renwu/shiyuan_01.png?1", "images/renwu/shiyuan_02.png", "images/renwu/tufei_01.png?1", "images/renwu/tufei_02.png", "images/renwu/xiaoquan_01.png?1", "images/renwu/xiaoquan_02.png", "images/renwu/can.png", "images/jianyu_bg.jpg?1", "images/block_bg.png?1", "images/renwu_bg.jpg", "images/lianji.png", "images/biaozhun.jpg", "images/fengkuang.jpg"]);
    this.loader.addEventListener("onComplete",
    function() {
        stage.addChild(background);
        stage.addChild(timeleftbar);
        stage.addChild(timemiddlebar);
        stage.addChild(timerightbar);
        stage.addChild(timeText);
        stage.addChild(refreshbutton);
        stage.addChild(scoreText);
        for (var d = 0; d < gameCellCount; d++) {
            stage.addChild(cellSpirits[d])
        }
        stage.addChild(startbackground);
        stage.addChild(loadingguizibg);
        var c = Math.floor(Math.random() * gameCellCount);
        if (c < 6) {
            loadingguizi = new PIXI.Sprite(GAME.cast.GUIZI[c][0]);
            loadingguizi.position.x = 130 + GAME.cast.GUIZI[c][6];
            loadingguizi.position.y = 285 + GAME.cast.GUIZI[c][7];
            guiziName.setText(GAME.cast.GUIZI[c][8]);
            guiziText.setText(GAME.cast.GUIZI[c][9])
        } else {
            c -= 6;
            loadingguizi = new PIXI.Sprite(GAME.cast.GIRL[c][0]);
            loadingguizi.position.x = 130 + GAME.cast.GIRL[c][6];
            loadingguizi.position.y = 285 + GAME.cast.GIRL[c][7];
            guiziName.setText(GAME.cast.GIRL[c][8]);
            guiziText.setText(GAME.cast.GIRL[c][9])
        }
        stage.addChild(loadingguizi);
        stage.addChild(guiziName);
        stage.addChild(guiziText);
        stage.addChild(titleText);
        stage.addChild(biaozhunbutton);
        stage.addChild(fengkuangbutton);
        stage.removeChild(b);
        stage.removeChild(a)
    })
};
Startup.constructor = Startup;
Startup.prototype.run = function() {
    this.loader.load()
};
var GAME = {};
GAME.time = new Time;
GAME.game = new Jianyu;
GAME.cast = new Cast;
GAME.currentScreen = null;
var gameCellCount = 9,
girlCount = 3,
guiziCount = 6,
gameCells = [],
emptyCells = {},
cellSpirits = [],
hitsTexture = [],
userScore = showhits = showminus = gameHits = gameMod = 0,
startup = new Startup,
loadingguizi;
var background = PIXI.Sprite.fromImage("images/jianyu_bg.jpg?1");
var timeleftbar = PIXI.Sprite.fromImage("images/time_left.png");
timeleftbar.position.x = 43;
timeleftbar.position.y = 16;
var timemiddlebar = PIXI.Sprite.fromImage("images/time_line.jpg");
timemiddlebar.position.x = 55;
timemiddlebar.position.y = 16;
timemiddlebar.width = 531;
var timerightbar = PIXI.Sprite.fromImage("images/time_right.png");
timerightbar.position.x = 586;
timerightbar.position.y = 16;
var refreshbutton = PIXI.Sprite.fromImage("images/shuaxin.png");
refreshbutton.position.x = 514;
refreshbutton.position.y = 55;
refreshbutton.setInteractive(true);
refreshbutton.mousedown = refreshbutton.touchstart = function() {
    GAME.game.start()
};
var scoreText = new PIXI.Text("0", {
    font: "bold 48px 黑体",
    fill: "#FFFFFF"
});
scoreText.position.x = (screenWidth - scoreText.width) / 2;
scoreText.position.y = 65;
var displayTime = Math.round(GAME.time.gameDuration / 1000);
var timeText = new PIXI.Text(displayTime + "秒", {
    font: "bold 24px 黑体",
    fill: "#FFFFFF"
});
timeText.anchor.x = 1;
timeText.anchor.y = 0;
timeText.position.x = (screenWidth + timeText.width) / 2 + 20;
timeText.position.y = 16;
var finalScoreText = new PIXI.Text("", {
    font: "bold 48px 黑体",
    fill: "#8ADE3A"
});
finalScoreText.position.x = (screenWidth - finalScoreText.width) / 2;
finalScoreText.position.y = 470;
var hittext = PIXI.Sprite.fromImage("images/lianji.png");
var minusscore = PIXI.Sprite.fromImage("images/-2.png");
minusscore.anchor.x = 1;
var digits = [[PIXI.Texture.fromImage("images/num/0.png"), 30], [PIXI.Texture.fromImage("images/num/1.png"), 26], [PIXI.Texture.fromImage("images/num/2.png"), 31], [PIXI.Texture.fromImage("images/num/3.png"), 28], [PIXI.Texture.fromImage("images/num/4.png"), 31], [PIXI.Texture.fromImage("images/num/5.png"), 29], [PIXI.Texture.fromImage("images/num/6.png"), 29], [PIXI.Texture.fromImage("images/num/7.png"), 30], [PIXI.Texture.fromImage("images/num/8.png"), 30], [PIXI.Texture.fromImage("images/num/9.png"), 29]];
var cellbarTexture = PIXI.Texture.fromImage("images/langan.png");
var cellbarPositions = [[40, 150], [233, 150], [426, 150], [40, 414], [233, 414], [426, 414], [40, 678], [233, 678], [426, 678]];
for (var i = 0; i < gameCellCount; i++) {
    var prison = new PIXI.Sprite(cellbarTexture);
    prison.setInteractive(true);
    prison.position.x = cellbarPositions[i][0] + 30;
    prison.position.y = cellbarPositions[i][1];
    prison.mousedown = prison.touchstart = function() {
        GAME.game.touch(this.cellprisonIndex)
    };
    prison.cellprisonIndex = i;
    cellSpirits.push(prison)
}
var startbackground = PIXI.Sprite.fromImage("images/block_bg.png?1");
var loadingguizibg = PIXI.Sprite.fromImage("images/renwu_bg.jpg");
loadingguizibg.position.x = 130;
loadingguizibg.position.y = 285;
var guiziName = new PIXI.Text("", {
    font: "24px 微软雅黑",
    fill: "#B3B7BA",
    wordWrap: "true",
    wordWrapWidth: "213"
});
guiziName.position.x = 343;
guiziName.position.y = 285;
var guiziText = new PIXI.Text("", {
    font: "24px 微软雅黑",
    fill: "#B3B7BA",
    wordWrap: "true",
    wordWrapWidth: "213"
});
guiziText.position.x = 343;
guiziText.position.y = 331;
var title = new Titles;
var titleText = new PIXI.Text(title.getStartTitle(), {
    font: "30px 微软雅黑",
    fill: "#FFFFFF",
    align: "left",
    wordWrap: "true",
    wordWrapWidth: "480"
});
titleText.position.x = (screenWidth - titleText.width) / 2;
titleText.position.y = 600;
var biaozhunbutton = PIXI.Sprite.fromImage("images/biaozhun.jpg");
biaozhunbutton.position.x = 100;
biaozhunbutton.position.y = 720;
biaozhunbutton.setInteractive(true);
biaozhunbutton.mousedown = biaozhunbutton.touchstart = function() {
    gameMod = 1;
    GAME.game.start()
};
var fengkuangbutton = PIXI.Sprite.fromImage("images/fengkuang.jpg");
fengkuangbutton.position.x = 330;
fengkuangbutton.position.y = 720;
fengkuangbutton.setInteractive(true);
fengkuangbutton.mousedown = fengkuangbutton.touchstart = function() {
    gameMod = 0;
    GAME.game.start()
};
var scoreprofile = PIXI.Sprite.fromImage("images/renwu/can.png");
scoreprofile.position.x = 250;
scoreprofile.position.y = 255;
var finalTitleText = new PIXI.Text("", {
    font: "27px 微软雅黑",
    fill: "#FFFFFF",
    align: "center",
    wordWrap: "true",
    wordWrapWidth: "428"
});
finalTitleText.position.y = 560;
var restartbutton = PIXI.Sprite.fromImage("images/zaiwan.jpg");
restartbutton.position.x = 90;
restartbutton.position.y = 710;
restartbutton.setInteractive(true);
restartbutton.mousedown = restartbutton.touchstart = function() {
    GAME.game.restart()
};
var fenxiangbutton = PIXI.Sprite.fromImage("images/fenxiang_btn.jpg");
fenxiangbutton.position.x = 335;
fenxiangbutton.position.y = 710;
fenxiangbutton.setInteractive(true);
fenxiangbutton.mousedown = fenxiangbutton.touchstart = function() {
    this.scale.x = 0.9;
    this.scale.y = 0.9
};
fenxiangbutton.mouseup = fenxiangbutton.touchend = function() {
    this.scale.x = 1;
    this.scale.y = 1;
    stage.addChild(fenxiangbackground)
};
var fenxiangbackground = PIXI.Sprite.fromImage("images/fenxiang.png");
fenxiangbackground.setInteractive(true);
fenxiangbackground.mousedown = fenxiangbackground.touchstart = function() {
    stage.removeChild(fenxiangbackground)
};
var ratio = new PIXI.Point;
function onResize() {
    var a = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    d = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    ratio.x = a / screenWidth;
    ratio.y = d / screenHeight;
    var f = ratio.x < ratio.y ? ratio.x: ratio.y;
    var e = screenWidth * f,
    b = screenHeight * f;
    renderer.view.style.width = e + "px";
    renderer.view.style.height = b + "px"
}
function intPrintf() {
    var b = [].slice.call(arguments),
    a = b.shift(),
    c = 0;
    return a.replace(/%(\w)?(\d)?([dfsx])/ig,
    function(f, e, d, h) {
        var g = d ? new Array(d - 0 + 1).join(e || "") : "";
        if (h == "d") {
            g += parseInt(b[c++])
        }
        return d ? g.slice(d * -1) : g
    })
}
function sprintf(b, a) {
    return b.replace(/\{([^}]+)\}/g,
    function(c, d) {
        return a[d]
    })
}
function animate() {
    GAME.currentScreen == "gameScreen" && GAME.game.update();
    renderer.render(stage);
    requestAnimFrame(animate)
}
window.onresize = onResize;
var shareData = {
    sTitle: "监狱风云之暴打小日本",
    sDesc: "想释放对本子屡屡挑衅我国威严的仇恨吗？史上最泄愤最虐指游戏横空出世！",
    sContent: "史上最泄愤最虐指游戏横空出世！千万别打到苍老师哦！",
    sImgurl: "http://jyfy.chinaiiss.com/games/jyfy/images/share.jpg",
    sLink: "",
    sCallback: ""
};
document.addEventListener("WeixinJSBridgeReady",
function() {
    WeixinJSBridge.on("menu:share:appmessage",
    function(a) {
        var b = shareData.sDesc.replace(/(\s)+/g, "");
        if (userScore > 0) {
            b += "，求超越"
        }
        WeixinJSBridge.invoke("sendAppMessage", {
            img_url: shareData.sImgurl,
            link: shareData.sLink,
            desc: b,
            title: shareData.sTitle
        },
        function(c) {
            document.location.href = shareData.sCallback
        })
    });
    WeixinJSBridge.on("menu:share:timeline",
    function(a) {
        var b = shareData.sContent.replace(/(\s)+/g, "");
        if (userScore > 0) {
            b = shareData.sDesc.replace(/(\s)+/g, "");
            b += "，求超越"
        }
        WeixinJSBridge.invoke("shareTimeline", {
            img_url: shareData.sImgurl,
            img_width: "100",
            img_height: "100",
            link: shareData.sLink,
            desc: b,
            content: b,
            title: b
        },
        function(c) {
            document.location.href = shareData.sCallback
        })
    });
    WeixinJSBridge.on("menu:share:weibo",
    function(a) {
        WeixinJSBridge.invoke("shareWeibo", {
            content: shareData.sDesc,
            url: shareData.sLink
        },
        function(b) {
            document.location.href = shareData.sCallback
        })
    })
},
false); (function init() {
    startup.run();
    requestAnimFrame(animate);
    onResize();
    document.oncontextmenu = function(a) {
        return false
    }
})();