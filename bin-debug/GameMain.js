var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**游戏控制类 */
var GameMain = (function () {
    function GameMain(stage) {
        this._stage = stage;
        this.init();
    }
    /**初始化 */
    GameMain.prototype.init = function () {
        var _this = this;
        this.gameScene = new GameScene();
        UIManager.instance.addBg(this.gameScene);
        this.gameControl = new GameController();
        //这里生产地图块 到时候放在游戏开始的时候
        this.gameControl.addFloor();
        //舞台帧监听
        this._stage.addEventListener(egret.Event.ENTER_FRAME, this.onLoop, this);
        this._stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.gameControl.playJump();
        }, this);
    };
    /**舞台帧监听*/
    GameMain.prototype.onLoop = function () {
        if (GameConfig.instance.gameStart) {
            this.gameScene.onLoop();
            this.gameControl.onLoop();
        }
    };
    return GameMain;
}());
__reflect(GameMain.prototype, "GameMain");
//# sourceMappingURL=GameMain.js.map