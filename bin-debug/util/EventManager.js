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
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        return _super.call(this) || this;
    }
    Object.defineProperty(EventManager, "instance", {
        get: function () {
            return this._instance ? this._instance : new EventManager();
        },
        enumerable: true,
        configurable: true
    });
    /**派发事件 */
    EventManager.dispatchEvent = function (event) {
        this.instance.dispatchEvent(event);
    };
    /**监听 */
    EventManager.addEventListener = function (type, listener, obj) {
        this.instance.addEventListener(type, listener, obj);
    };
    EventManager.hasEventListener = function (type) {
        return this.instance.hasEventListener(type);
    };
    /**移除 */
    EventManager.removeEventListener = function (type, listener) {
        this.instance.removeEventListener(type, listener, this);
    };
    return EventManager;
}(egret.EventDispatcher));
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map