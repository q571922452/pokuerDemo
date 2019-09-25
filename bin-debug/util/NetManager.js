var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NetManager = (function () {
    function NetManager() {
    }
    Object.defineProperty(NetManager, "instance", {
        get: function () {
            this._instance = this._instance ? this._instance : new NetManager;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * port:端口
     * data:数据
     * compFunc:返回监听
     * errFunc:错误监听
     */
    NetManager.prototype.sendPostRequest = function (port, data, compFunc, errFunc) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.addEventListener(egret.Event.COMPLETE, compFunc, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, errFunc, this);
        request.open(GameConfig.instance.httpURL + port, egret.HttpMethod.POST);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(data);
    };
    return NetManager;
}());
__reflect(NetManager.prototype, "NetManager");
//# sourceMappingURL=NetManager.js.map