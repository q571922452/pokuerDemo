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
        _this._waterPoolList = []; //存放水池背景
        return _this;
    }
    /**根据配置添加地图块 */
    GameController.prototype.addFloor = function () {
        var gameConfig = RES.getRes("GameConfig_json");
        var floorListStr = gameConfig.map.split("-");
        for (var i = 0; i < floorListStr.length; ++i) {
            if (floorListStr[i].split('')[1]) {
                var floor_1 = ObjPool.getItemForPool("floor", Floor);
                floor_1.setDiff(Number(floorListStr[i].split('')[1]));
                floor_1.x = GameConfig.instance.floorWidth * i;
                floor_1.y = GameConfig.instance.stageHeight - floor_1.height;
                this._floorList.push(floor_1);
                UIManager.instance.addSprite(floor_1);
            }
            else {
                var waterPool = ObjPool.getItemForPool("pond", Pond);
                waterPool.createAni();
                waterPool.x = GameConfig.instance.floorWidth * i;
                waterPool.y = GameConfig.instance.stageHeight - waterPool.height;
                this._waterPoolList.push(waterPool);
                UIManager.instance.addBg(waterPool);
            }
        }
        // for (var key in gameConfig) {
        //     if (gameConfig.hasOwnProperty(key)) {
        //         var element = gameConfig[key];
        //         this._floorConfig.push(element[Math.floor(Math.random()*3)]);
        //     }
        // }
        // //生成地图块
        // for(let j = 0; j < this._floorConfig.length; j++){
        //     for(let i = 0; i < this._floorConfig[j].length; i++){
        //         let mapkey = this._floorConfig[j][i];
        //         var floor:Floor = ObjPool.getItemForPool("floor", Floor);
        //         floor.setDiff(mapkey);
        //         if(this._lastFloor){
        //             floor.x = this._lastFloor.x + this._lastFloor.width - GameConfig.instance.floorDeviation;
        //         }else{
        //             floor.x = -GameConfig.instance.floorDeviation;
        //         }
        //         floor.y = GameConfig.instance.stageHeight - floor.height;
        //         this._floorList.push(floor);
        //         this._lastFloor = floor;
        //         UIManager.instance.addSprite(floor);
        //     }
        // }
        this._player = new Player();
        this._player.y = GameConfig.instance.stageHeight - 300;
        UIManager.instance.addSprite(this._player);
    };
    GameController.prototype.playJump = function () {
        this._player.gotoJump();
    };
    /**帧监听 */
    GameController.prototype.onLoop = function () {
        // this._player.y += GameConfig.instance.downSpeed;
        this._player.onLoop();
        this.collideCheck();
    };
    /**有效地图块 */
    GameController.prototype.getEffFloors = function () {
        var effFloors = []; //存在视口中的地图块
        for (var i = 0; i < this._floorList.length; ++i) {
            if (this._floorList[i].x + this._floorList[i].width > 0 && this._floorList[i].x < GameConfig.instance.stageWidht) {
                effFloors.push(this._floorList[i]);
            }
        }
        return effFloors;
    };
    /**碰撞检测 */
    GameController.prototype.collideCheck = function () {
        //获取有效地图块
        var floors = this.getEffFloors();
        /**人物是否碰到右边 */
        var lc = false;
        for (var i = 0; i < floors.length; i++) {
            if (floors[i].checkDownPos(this._player.x, this._player.y)) {
                this._player.y = floors[i].y;
                this._player.jumpReset();
            }
            if (floors[i].checkLeftPos(this._player)) {
                this._player.x -= GameConfig.instance.speed;
                lc = true;
            }
        }
        /**检测玩家位置是否需要矫正 */
        console.log('===>', lc);
        if (!lc && !this._player.checkInitX()) {
            GameConfig.instance.speedX = 3;
        }
    };
    return GameController;
}(eui.Component));
__reflect(GameController.prototype, "GameController");
//# sourceMappingURL=GameController.js.map