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
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(eventType) {
        var _this = _super.call(this, eventType) || this;
        _this._eventType = eventType;
        return _this;
    }
    GameEvent.PLAY_JUMP = 'PLAY_JUMP';
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map