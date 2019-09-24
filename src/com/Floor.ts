class Floor extends eui.Component {
    constructor() {
        super();
        this.skinName = "resource/game_skins/floorUI.exml"
    }

    private floorBg: eui.Image;//图片

    private func: any;//存放一下方法 用于移除

    private _diff: number;//类型

    /**设置难度 */
    public setDiff(diff: number = 1): void {
        this.floorBg.texture = RES.getRes("shidun4_png");
        this._diff = diff;
        this.height = this.floorBg.height;
        this.addEventListener(egret.Event.ENTER_FRAME, this.func = () => {
            this.onLoop();
        }, this)
    }
    
    private onLoop(): void {
        if (!GameConfig.instance.gameStart || GameConfig.instance.gameEnd) return;

        this.x -= GameConfig.instance.speed;

        this.addOrRemove();
    }
    /**判断是否添加以及移除 */
    private addOrRemove(): void {
        if (this.x + this.width < 0) {//这边如果超出界面 则 移除监听
            this.removeEventListener(egret.Event.ENTER_FRAME, this.func, this);
            ObjPool.recover("floor", this);
        }
        // if (!this.parent && this.x > 0 && this.x < GameConfig.instance.stageWidht + this.width) { // 还未入场的地图块加载
        //     UIManager.instance.addSprite(this);
        // }
    }

    /**获取难度*/
    public get diff(): number {
        return this._diff;
    }

    /**检测位置是否在地图块上 */
    public checkDownPos(player: Player): boolean {
        if (player.x > this.x && player.x < (this.x + this.width) && (player.y + player.height / 4) > this.y && (player.y + player.height / 4) < (this.y + 96)) {
            return true;
        }
        return false;
    }

    /**检测位置是否碰到人物的左边 */
    public checkLeftPos(player: Player): boolean {
        if ((player.x + player.width / 2) < (this.x + 20) && (player.x + player.width / 2) > (this.x - 20) && (player.y + player.height / 4) > this.y && (player.y + player.height / 4) < (this.y + this.height)) {
            return true;
        }
        return false;
    }

}