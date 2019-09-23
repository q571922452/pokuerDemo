class Monster extends egret.Sprite {
    constructor(type: number) {
        super();
        this.width = 384;
        this.init(type);
    }
    private func: any;
    private ms: egret.MovieClip;// 怪物
    private isPlaying: boolean = false;// 是否播放
    private mcDataFactory: egret.MovieClipDataFactory;//资源
    /**初始化怪物 */
    private init(type: number): void {
        this.mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("ydxs" + type + "_json"), RES.getRes("ydxs" + type + "_png"));
        this.ms = new egret.MovieClip(this.mcDataFactory.generateMovieClipData("1"));
        this.ms.x = 0;
        this.addChild(this.ms);
        this.ms.gotoAndPlay(0, -1);
        this.ms.anchorOffsetX = this.ms.width / 2;
        this.ms.anchorOffsetY = this.ms.height / 2;
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = () => {
            this.onLoop();
        }, this)
    }

    private playAni(): void {
        egret.Tween.get(this.ms, { loop: true }).to({ x: this.ms.x + 350 }, 1500).call(() => {
            this.ms.scaleX = - this.ms.scaleX;
        }).to({ x: this.ms.x + 34 }, 1500).call(() => {
            this.ms.scaleX = - this.ms.scaleX;
        });
    }
    /**帧监听 */
    private onLoop(): void {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd) return;
        this.x -= GameConfig.instance.speed;
        if (!this.isPlaying && this.x > 0 && this.x < GameConfig.instance.stageWidht) {// 进入舞台 设置缓动动画
            this.playAni();
            this.isPlaying = true;
        }
        if (this.x + this.width < 0)
            this.clearRes();

    }
    /**清理对象 */
    private clearRes(): void {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
        egret.Tween.removeAllTweens();
        this.removeChild(this.ms);
        this.mcDataFactory.clearCache();
        this.ms.movieClipData = null;
        this.ms = null;
        this.mcDataFactory = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
}