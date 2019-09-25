class Pond extends egret.Sprite {
    constructor() {
        super();
    }
    private _mc: egret.MovieClip;//动画
    private _mdf: egret.MovieClipDataFactory;// 资源
    private func: Function;//帧监听function
    /**创建水池动画 */
    public setDiff(diffNum: any = '1'): void {
        let type = Number(Math.ceil(Math.random() * 2));
        console.log("====>", type);
        let mdf: egret.MovieClipDataFactory;
        if (diffNum != '3')
            mdf = new egret.MovieClipDataFactory(RES.getRes("szxs" + diffNum + "-" + type + "_json"), RES.getRes("szxs" + diffNum + "-" + type + "_png"));
        else
            mdf = new egret.MovieClipDataFactory(RES.getRes("szxs" + diffNum + "_json"), RES.getRes("szxs" + diffNum + "_png"));
        this._mc = new egret.MovieClip(mdf.generateMovieClipData("1"));
        this._mc.gotoAndPlay(0, -1);
        this.addChild(this._mc);
        //添加帧监听
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = () => {
            this.onLoop();
        }, this);
    }
    private onLoop(): void {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd) return;
        this.x -= GameConfig.instance.speed;
        if (this.x + this.width < 0) { // 超出界面
            ObjPool.recover("pond", this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
        }
    }
    /**销毁 */
    public destroyAni(): void {
        this.removeChild(this._mc);
        this._mc.movieClipData = null;
        this._mc = null;
        this._mdf.clearCache();//清空缓存
        this._mdf = null;
    }
}