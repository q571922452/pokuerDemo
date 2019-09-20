var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIManager = (function () {
    function UIManager(bglayer, glayer) {
        this._bgLayer = bglayer;
        this._gameLayer = glayer;
    }
    Object.defineProperty(UIManager, "instance", {
        /**返回单例 */
        get: function () {
            return this._instance;
        },
        set: function (uiManager) {
            this._instance = uiManager;
        },
        enumerable: true,
        configurable: true
    });
    /**添加一个子节点 */
    UIManager.prototype.addSprite = function (node) {
        if (node)
            this._gameLayer.addChild(node);
        else
            console.log("节点不能为空");
    };
    /**添加背景 */
    UIManager.prototype.addBg = function (bg) {
        if (bg)
            this._bgLayer.addChild(bg);
        else
            console.log("背景不能为空");
    };
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map