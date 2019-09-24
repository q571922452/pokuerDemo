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
var Gress = (function (_super) {
    __extends(Gress, _super);
    function Gress() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Gress.prototype.init = function () {
        this.texture = RES.getRes('shuicao' + (Number(Math.ceil(Math.random() * 2))) + '_png');
    };
    Gress.prototype.startTween = function () {
        var _this = this;
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = function () {
            _this.onLoop();
        }, this);
    };
    Gress.prototype.onLoop = function () {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd)
            return;
        this.x -= GameConfig.instance.speed;
        this.addOrRemove();
    };
    Gress.prototype.addOrRemove = function () {
        if (this.x + this.width < 0) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
            ObjPool.recover("gress", this);
        }
    };
    return Gress;
}(eui.Image));
__reflect(Gress.prototype, "Gress");
//# sourceMappingURL=Gress.js.map