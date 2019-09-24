var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
        /**舞台宽 */
        this.stageWidht = 1920;
        /**舞台高 */
        this.stageHeight = 1080;
        /**地图块固定宽度 资源宽度484需要覆盖100px */
        this.floorWidth = 384;
        /**初始人物位置 */
        this.playerInitX = 576;
        /**人物矫正速度*/
        this.speedX = 0;
        /**速度 */
        this.speed = 12.8;
        /**自由掉落速度 */
        this.downSpeed = 10;
        /**游戏开始 */
        this.gameStart = true;
        /**游戏结束 */
        this.gameEnd = false;
        /**难度系数 */
        // diffNum = [-88, 8, 104];
        this.diffNum = [-192, -96, 0];
    }
    Object.defineProperty(GameConfig, "instance", {
        get: function () {
            this._instance = this._instance ? this._instance : new GameConfig;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map