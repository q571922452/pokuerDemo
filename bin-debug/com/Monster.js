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
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(type) {
        var _this = _super.call(this) || this;
        _this.isPlaying = false; // 是否播放
        _this.width = 384;
        _this.init(type);
        return _this;
    }
    /**初始化怪物 */
    Monster.prototype.init = function (type) {
        var _this = this;
        this.mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("ydxs" + type + "_json"), RES.getRes("ydxs" + type + "_png"));
        this.ms = new egret.MovieClip(this.mcDataFactory.generateMovieClipData("1"));
        this.ms.x = 0;
        this.addChild(this.ms);
        this.ms.gotoAndPlay(0, -1);
        this.ms.anchorOffsetX = this.ms.width / 2;
        this.ms.anchorOffsetY = this.ms.height / 2;
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = function () {
            _this.onLoop();
        }, this);
    };
    Monster.prototype.playAni = function () {
        var _this = this;
        egret.Tween.get(this.ms, { loop: true }).to({ x: this.ms.x + 350 }, 1500).call(function () {
            _this.ms.scaleX = -_this.ms.scaleX;
        }).to({ x: this.ms.x + 34 }, 1500).call(function () {
            _this.ms.scaleX = -_this.ms.scaleX;
        });
    };
    /**帧监听 */
    Monster.prototype.onLoop = function () {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd)
            return;
        this.x -= GameConfig.instance.speed;
        if (!this.isPlaying && this.x > 0 && this.x < GameConfig.instance.stageWidht) {
            this.playAni();
            this.isPlaying = true;
        }
        if (this.x + this.width < 0)
            this.clearRes();
    };
    /**清理对象 */
    Monster.prototype.clearRes = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
        egret.Tween.removeAllTweens();
        this.removeChild(this.ms);
        this.mcDataFactory.clearCache();
        this.ms.movieClipData = null;
        this.ms = null;
        this.mcDataFactory = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return Monster;
}(egret.Sprite));
__reflect(Monster.prototype, "Monster");
//# sourceMappingURL=Monster.js.map