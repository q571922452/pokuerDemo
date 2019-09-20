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
        _this.skinName = "resource/game_skins/mainScene.exml";
        return _this;
    }
    GameScene.prototype.onLoop = function () {
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
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map