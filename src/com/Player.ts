/**ip管理类 */
class Player extends egret.Sprite {
    constructor() {
        super();
        this.init();
    }
    private jumpCount = 0; // 跳的次数
    private jumpCountMax = 3;// 最多跳3次
    private vy = 3;//下落变量
    private downSpeed = 2; // 下落速度
    private maxVy = 20;// 下落最大值
    private presentPosY: number = 0;// 当前最低位置

    private init(): void {
        var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("ip_json"), RES.getRes("ip_png"));
        var role: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("ip"));
        this.addChild(role);
        role.gotoAndPlay(0, -1);
        this.x = GameConfig.instance.playerInitX;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.anchorOffsetY = role.height / 2;
    }
    public onLoop(): void {
        if (this.presentPosY > 0 && this.y >= this.presentPosY) { //y轴校验
            this.y = this.presentPosY;
        } else {
            this.y += this.vy;
            this.vy += this.downSpeed;
            if (this.vy > this.maxVy)
                this.vy = this.maxVy;
        }
        //x轴校验
        if (this.x < GameConfig.instance.playerInitX)
            this.x += GameConfig.instance.speedX;

        //玩家掉出屏幕
        if (this.y > (GameConfig.instance.stageHeight + this.height) || this.x + this.width / 2 < 0) {
            // console.log("gameOver");
            // GameConfig.instance.gameEnd = true;
        }
    }
    public gotoJump(): void {
        if (this.jumpCount < this.jumpCountMax) {
            this.jumpCount++;
            this.vy = -30;
        }
    }
    /**重置跳跃属性 */
    public jumpReset(): void {
        this.vy = 0;
        this.jumpCount = 0;
    }

}