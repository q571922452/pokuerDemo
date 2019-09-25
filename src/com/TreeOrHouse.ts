class TreeOrHouse extends eui.Image {
    constructor() {
        super();
        this.init();
    }
    private func: any;
    private init(): void {
        this.width = 930;
        this.height = 640;
        //随机tree 和 house
        this.texture = Math.random() > 0.5 ? RES.getRes('tree_png') : RES.getRes('house_png');
    }
    public startTween(): void {
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = () => {
            this.onLoop();
        }, this)
    }
    private onLoop(): void {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd) return;

        this.x -= GameConfig.instance.speed;

        this.addOrRemove();
    }
    private addOrRemove(): void {
        if (this.x + this.width < 0) {//这边如果超出界面 则 移除监听
            this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
            ObjPool.recover("toh", this);
        }
    }
}