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
var Pond = (function (_super) {
    __extends(Pond, _super);
    function Pond() {
        return _super.call(this) || this;
    }
    /**创建水池动画 */
    Pond.prototype.createAni = function (type) {
        var _this = this;
        var mdf = new egret.MovieClipDataFactory(RES.getRes("e11_json"), RES.getRes("e11_png"));
        this._mc = new egret.MovieClip(mdf.generateMovieClipData("play"));
        this._mc.gotoAndPlay(0, -1);
        this.addChild(this._mc);
        //添加帧监听
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = function () {
            _this.onLoop();
        }, this);
    };
    Pond.prototype.onLoop = function () {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd)
            return;
        this.x -= GameConfig.instance.speed;
        if (this.x + this.width < 0) {
            ObjPool.recover("pond", this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
        }
    };
    /**销毁 */
    Pond.prototype.destroyAni = function () {
        this.removeChild(this._mc);
        this._mc.movieClipData = null;
        this._mc = null;
        this._mdf.clearCache(); //清空缓存
        this._mdf = null;
    };
    return Pond;
}(egret.Sprite));
__reflect(Pond.prototype, "Pond");
//# sourceMappingURL=Pond.js.map