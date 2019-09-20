var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjPool = (function () {
    function ObjPool() {
    }
    ObjPool.getPoolByClsn = function (clsn) {
        return ObjPool.pool[clsn] || (ObjPool.pool[clsn] = []);
        // ObjPool.pool[clsn] = ObjPool.pool[clsn]?ObjPool.pool[clsn]:[];
        // return ObjPool.pool[clsn];
    };
    /**
     * 通过对象池 创建一个对象
     * @param clsn 存在对象池中的名字 最好用类名
     * @param cls 需要创建的对象类
    */
    ObjPool.getItemForPool = function (clsn, cls) {
        var pool = ObjPool.getPoolByClsn(clsn);
        var item = pool.length && pool.length > 0 ? pool.pop() : new cls();
        item["_InPool"] = false;
        return item;
    };
    /**
     * @param clsn 存在对象池中的名字
     * @param item 当前对象
     */
    ObjPool.recover = function (clsn, item) {
        if (item["_InPool"])
            return;
        item["_InPool"] = true;
        this.getPoolByClsn(clsn).push(item);
        if (item.parent)
            item.parent.removeChild(item);
    };
    ObjPool.pool = {};
    return ObjPool;
}());
__reflect(ObjPool.prototype, "ObjPool");
//# sourceMappingURL=ObjPool.js.map