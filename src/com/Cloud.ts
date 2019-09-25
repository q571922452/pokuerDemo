class Cloud extends eui.Image {
    constructor() {
        super();
        this.init();
    }
    private func:any;
    private init(): void {
        this.texture = Math.random()>0.5?RES.getRes('shiyun1_png'):RES.getRes('shiyun2_png');
    }
    public startTween():void{      
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
            ObjPool.recover("cloud", this);
        }
    }
}