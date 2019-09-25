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
var TreeOrHouse = (function (_super) {
    __extends(TreeOrHouse, _super);
    function TreeOrHouse() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    TreeOrHouse.prototype.init = function () {
        this.width = 930;
        this.height = 640;
        //随机tree 和 house
        this.texture = Math.random() > 0.5 ? RES.getRes('tree_png') : RES.getRes('house_png');
    };
    TreeOrHouse.prototype.startTween = function () {
        var _this = this;
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = function () {
            _this.onLoop();
        }, this);
    };
    TreeOrHouse.prototype.onLoop = function () {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd)
            return;
        this.x -= GameConfig.instance.speed;
        this.addOrRemove();
    };
    TreeOrHouse.prototype.addOrRemove = function () {
        if (this.x + this.width < 0) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
            ObjPool.recover("toh", this);
        }
    };
    return TreeOrHouse;
}(eui.Image));
__reflect(TreeOrHouse.prototype, "TreeOrHouse");
//# sourceMappingURL=TreeOrHouse.js.map