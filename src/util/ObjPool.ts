class ObjPool{
    private static pool = {};
    private static getPoolByClsn(clsn:string):any{
        return ObjPool.pool[clsn] || (ObjPool.pool[clsn] = []);
        // ObjPool.pool[clsn] = ObjPool.pool[clsn]?ObjPool.pool[clsn]:[];
        // return ObjPool.pool[clsn];
    }
    /**
     * 通过对象池 创建一个对象
     * @param clsn 存在对象池中的名字 最好用类名
     * @param cls 需要创建的对象类
    */
    public static getItemForPool(clsn:string,cls:any):any{
        var pool = ObjPool.getPoolByClsn(clsn);
        var item = pool.length && pool.length>0?pool.pop():new cls();
        item["_InPool"] = false;
        return item;
    }
    /**
     * @param clsn 存在对象池中的名字
     * @param item 当前对象
     */
    public static recover(clsn:string,item:any):void{
        if(item["_InPool"]) return;
        item["_InPool"] = true;
        this.getPoolByClsn(clsn).push(item);
        if(item.parent)
            item.parent.removeChild(item);
    }
}