class GameScene extends eui.Component {
    constructor() {
        super();
        this.skinName = "resource/game_skins/mainScene.exml";
    }
    private bg1: eui.Image;
    private bg2: eui.Image;
    private bg3: eui.Image;
    private bgGroup: eui.Group;//背景容器
    private ggbg: eui.Rect;// 模态背景
    private ggText: eui.Label;//gameOver

    private moveX: number;//记录x值

    public onLoop() {

        this.bgGroup.x -= GameConfig.instance.speed / 5;
        this.moveX = Math.abs(this.bgGroup.x);

        if (this.moveX - this.bg1.x >= this.bg1.width) {
            this.bg1.x += this.bg1.width * 3;
        }

        if (this.moveX - this.bg2.x >= this.bg2.width) {
            this.bg2.x += this.bg2.width * 3;
        }

        if (this.moveX - this.bg3.x >= this.bg3.width) {
            this.bg3.x += this.bg3.width * 3;
        }
        if (GameConfig.instance.gameEnd) {
            this.ggText.visible = true;
            this.ggbg.visible = true;
        }
    }
}