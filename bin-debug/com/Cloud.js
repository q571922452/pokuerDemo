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
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Cloud.prototype.init = function () {
        this.texture = Math.random() > 0.5 ? RES.getRes('shiyun1_png') : RES.getRes('shiyun2_png');
    };
    Cloud.prototype.startTween = function () {
        var _this = this;
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = function () {
            _this.onLoop();
        }, this);
    };
    Cloud.prototype.onLoop = function () {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd)
            return;
        this.x -= GameConfig.instance.speed;
        this.addOrRemove();
    };
    Cloud.prototype.addOrRemove = function () {
        if (this.x + this.width < 0) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
            ObjPool.recover("cloud", this);
        }
    };
    return Cloud;
}(eui.Image));
__reflect(Cloud.prototype, "Cloud");
//# sourceMappingURL=Cloud.js.map