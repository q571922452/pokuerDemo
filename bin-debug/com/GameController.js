var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameController = (function (_super) {
    __extends(GameController, _super);
    function GameController() {
        var _this = 
        //加载json
        _super.call(this) || this;
        _this._floorConfig = []; //这里存放一下随机后的地图块配置文件
        _this._floorList = []; //存放地图块
        _this._monsterList = []; //存放怪物的数组
        _this._waterPoolList = []; //存放水池背景
        return _this;
    }
    /**根据配置添加地图块 */
    GameController.prototype.addFloor = function () {
        //添加场景
        this.gameScene = new GameScene();
        UIManager.instance.addBg(this.gameScene);
        //添加地图
        var gameConfig = RES.getRes("GameConfig_json");
        var floorListStr = gameConfig.map.split("-");
        for (var i = 0; i < floorListStr.length; ++i) {
            if (floorListStr[i].split('')[0] == 'r') {
                var floor_1 = ObjPool.getItemForPool("floor", Floor);
                floor_1.setDiff(Number(floorListStr[i].split('')[1]));
                floor_1.x = this._lastObj ? this._lastObj.x + this._lastObj.width : GameConfig.instance.floorWidth * i;
                floor_1.y = GameConfig.instance.stageHeight - (floor_1.height + GameConfig.instance.diffNum[Number(floorListStr[i].split('')[1]) - 1]);
                this._floorList.push(floor_1);
                UIManager.instance.addSprite(floor_1);
                this._lastObj = null;
                this._lastObj = floor_1;
                //这里添加一个水草
                var gress = ObjPool.getItemForPool('gress', Gress);
                gress.startTween();
                gress.y = GameConfig.instance.stageHeight - gress.height;
                gress.x = floor_1.x - gress.width / 4;
                UIManager.instance.addSprite(gress);
                if (floorListStr[i].split('')[1] == '2' && floorListStr[i + 1].split('')[1] == '3') {
                    var bg = ObjPool.getItemForPool('toh', TreeOrHouse);
                    bg.startTween();
                    bg.x = floor_1.x + floor_1.width - bg.width / 2;
                    bg.y = GameConfig.instance.stageHeight - bg.height - 276;
                    UIManager.instance.addBg(bg);
                    var cloud = ObjPool.getItemForPool('cloud', Cloud);
                    cloud.startTween();
                    cloud.x = Math.random() >= 0.5 ? bg.x - cloud.width / 2 : bg.x + cloud.width * 1.5;
                    cloud.y = bg.y + bg.height - cloud.height / 2;
                    UIManager.instance.addBg(cloud);
                }
            }
            else if (floorListStr[i].split('')[0] == 'e') {
                var waterPool = ObjPool.getItemForPool("pond", Pond);
                waterPool.setDiff(floorListStr[i].split('')[1]);
                waterPool.x = this._floorList[this._floorList.length - 1].x + this._floorList[this._floorList.length - 1].width;
                waterPool.y = GameConfig.instance.stageHeight - waterPool.height;
                this._waterPoolList.push(waterPool);
                this._lastObj = null;
                this._lastObj = waterPool;
                UIManager.instance.addBg(waterPool);
            }
            //添加怪物
            for (var m = 0; m < gameConfig.monster.length; m++) {
                if (gameConfig.monster[m].mapKey == this._floorList.length) {
                    var monster = new Monster(gameConfig.monster[m].mt);
                    monster.x = this._floorList[gameConfig.monster[m].mapKey - 1].x + 50;
                    monster.y = this._floorList[gameConfig.monster[m].mapKey - 1].y - monster.height / 4;
                    this._monsterList.push(monster);
                    UIManager.instance.addSprite(monster);
                }
            }
        }
        this._player = new Player();
        this._player.y = GameConfig.instance.stageHeight - 300;
        UIManager.instance.addSprite(this._player);
    };
    GameController.prototype.playJump = function () {
        this._player.gotoJump();
    };
    /**帧监听 */
    GameController.prototype.onLoop = function () {
        this.gameScene.onLoop();
        this._player.onLoop();
        this.collideCheck();
        this.clearFloor();
    };
    /**有效地图块 */
    GameController.prototype.getEffFloors = function () {
        var effFloors = []; //存在视口中的地图块
        while (this._floorList[0].x + this._floorList[0].width < 0) {
            this._floorList.shift();
        }
        for (var i = 0; i < this._floorList.length; ++i) {
            if (this._player.x > this._floorList[i].x && this._player.x < (this._floorList[i].x + GameConfig.instance.floorWidth)) {
                effFloors.push(this._floorList[i]);
                effFloors.push(this._floorList[i + 1]);
                return effFloors;
            }
        }
        // return effFloors;
    };
    /**返回Monster信息 */
    GameController.prototype.getMonsterInfo = function () {
        for (var i = 0; i < this._monsterList.length; ++i) {
            if (this._player.x >= this._monsterList[i].x && this._player.x < (this._monsterList[i].x + this._monsterList[i].width)) {
                return this._monsterList[i];
            }
        }
        return null;
    };
    /**碰撞检测 */
    GameController.prototype.collideCheck = function () {
        //获取有效地图块
        var floors = this.getEffFloors();
        /**人物是否碰到右边 */
        if (!floors) {
            return;
        }
        var lc = false; //是否进行位置校验
        if (floors[0].checkDownPos(this._player)) {
            this._player.y = floors[0].y - this._player.height / 4;
            this._player.jumpReset();
        }
        if (floors[1].checkLeftPos(this._player)) {
            this._player.x -= GameConfig.instance.speed;
            lc = true;
        }
        /**检测玩家位置是否需要矫正 */
        if (!lc && !this.checkInitX(this._player)) {
            GameConfig.instance.speedX = 4;
        }
        else {
            GameConfig.instance.speedX = 0;
        }
        /**怪物碰撞检测 */
        var vaildMonster = this.getMonsterInfo();
        if (vaildMonster && vaildMonster.collide(this._player)) {
            //掉血 并且将怪物从数组中移除，以为值掉一次血
            this._monsterList.shift();
            this.gameScene.dropOfBlood();
        }
    };
    /**清除地图块 */
    GameController.prototype.clearFloor = function () {
    };
    /**检测人物是否还在初始位置*/
    GameController.prototype.checkInitX = function (player) {
        if (player.x == GameConfig.instance.playerInitX) {
            return true;
        }
        return false;
    };
    return GameController;
}(eui.Component));
__reflect(GameController.prototype, "GameController");
//# sourceMappingURL=GameController.js.map