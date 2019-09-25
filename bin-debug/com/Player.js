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
/**ip管理类 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.jumpCount = 0; // 跳的次数
        _this.jumpCountMax = 3; // 最多跳3次
        _this.vy = 3; //下落变量
        _this.downSpeed = 2; // 下落速度
        _this.maxVy = 20; // 下落最大值
        _this.presentPosY = 0; // 当前最低位置
        _this.init();
        return _this;
    }
    Player.prototype.init = function () {
        var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("ip1_json"), RES.getRes("ip1_png"));
        var role = new egret.MovieClip(mcDataFactory.generateMovieClipData("ip"));
        this.addChild(role);
        role.gotoAndPlay(0, -1);
        this.x = GameConfig.instance.playerInitX;
        this.anchorOffsetX = role.width / 2;
        this.anchorOffsetY = role.height / 2;
    };
    Player.prototype.onLoop = function () {
        if (this.presentPosY > 0 && this.y >= this.presentPosY) {
            this.y = this.presentPosY;
        }
        else {
            this.y += this.vy;
            this.vy += this.downSpeed;
            if (this.vy > this.maxVy)
                this.vy = this.maxVy;
        }
        //x轴校验
        if (this.x < GameConfig.instance.playerInitX)
            this.x += GameConfig.instance.speedX;
        //玩家掉出屏幕
        if (this.y > (GameConfig.instance.stageHeight + this.height) || this.x + this.width / 2 < 0) {
            GameConfig.instance.gameEnd = true;
        }
    };
    Player.prototype.gotoJump = function () {
        if (this.jumpCount < this.jumpCountMax) {
            this.jumpCount++;
            this.vy = -30;
        }
    };
    /**重置跳跃属性 */
    Player.prototype.jumpReset = function () {
        this.vy = 0;
        this.jumpCount = 0;
    };
    return Player;
}(egret.Sprite));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map