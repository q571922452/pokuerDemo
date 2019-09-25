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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.hpNum = 3; //血量
        _this.skinName = "resource/game_skins/mainScene.exml";
        return _this;
    }
    GameScene.prototype.onLoop = function () {
        if (GameConfig.instance.gameEnd) {
            this.ggText.visible = true;
            this.ggbg.visible = true;
            return;
        }
        this.bgGroup.x -= GameConfig.instance.speed / 5;
        this.moveX = Math.abs(this.bgGroup.x);
        if (this.moveX - this.bg1.x >= this.bg1.width) {
            this.bg1.x += this.bg1.width * 3;
        }
        if (this.moveX - this.bg2.x >= this.bg2.width) {
            this.bg2.x += this.bg2.width * 3;
        }
        if (this.moveX - this.bg3.x >= this.bg3.width) {
            this.bg3.x += this.bg3.width * 3;
        }
        this.cloudGroup.x -= GameConfig.instance.cloudSpeed;
        if ((this.cloudGroup.x + this.cloudGroup.width) < 0) {
            this.cloudGroup.x = GameConfig.instance.stageWidht + this.cloudGroup.width;
        }
    };
    /**掉血 */
    GameScene.prototype.dropOfBlood = function () {
        if (this.hpNum <= 0) {
            GameConfig.instance.gameEnd = true;
            return;
        }
        this.removeChild(this["hp" + this.hpNum]);
        --this.hpNum;
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map