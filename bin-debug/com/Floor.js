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
var Floor = (function (_super) {
    __extends(Floor, _super);
    function Floor() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/game_skins/floorUI.exml";
        return _this;
    }
    /**设置难度 */
    Floor.prototype.setDiff = function (diff) {
        var _this = this;
        if (diff === void 0) { diff = 1; }
        this.floorBg.texture = RES.getRes("shidun_png");
        this._diff = diff;
        this.height = this.floorBg.height;
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = function () {
            _this.onLoop();
        }, this);
    };
    Floor.prototype.onLoop = function () {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd)
            return;
        this.x -= GameConfig.instance.speed;
        this.addOrRemove();
    };
    /**判断是否添加以及移除 */
    Floor.prototype.addOrRemove = function () {
        if (this.x + this.width < 0) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
            ObjPool.recover("floor", this);
        }
        // if (!this.parent && this.x > 0 && this.x < GameConfig.instance.stageWidht + this.width) { // 还未入场的地图块加载
        //     UIManager.instance.addSprite(this);
        // }
    };
    Object.defineProperty(Floor.prototype, "diff", {
        /**获取难度*/
        get: function () {
            return this._diff;
        },
        enumerable: true,
        configurable: true
    });
    /**检测位置是否在地图块上 */
    Floor.prototype.checkDownPos = function (player) {
        if (player.x > this.x + 20 && player.x < (this.x + this.width) && (player.y + player.height / 4) >= this.y && player.y < (this.y + (player.height / 4))) {
            return true;
        }
        return false;
    };
    /**检测位置是否碰到人物的左边 */
    Floor.prototype.checkLeftPos = function (player) {
        if (player.y > this.y && player.y < (this.y + this.height) && (player.x + player.width / 2) < (this.x + 100) && (player.x + player.width / 2) > (this.x - 10)) {
            return true;
        }
        return false;
    };
    return Floor;
}(eui.Component));
__reflect(Floor.prototype, "Floor");
//# sourceMappingURL=Floor.js.map