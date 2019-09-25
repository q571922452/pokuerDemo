/**游戏控制类 */
class GameMain{
    constructor(stage:any){
        this._stage = stage;
        this.init();
    }
    private gameControl:GameController;//地图控制器
    private _stage;//舞台
    /**初始化 */
    private init():void{
        this.gameControl = new GameController();
        //这里生产地图块 到时候放在游戏开始的时候
        this.gameControl.addFloor();
        //舞台帧监听
        this._stage.addEventListener(egret.Event.ENTER_FRAME,this.onLoop,this);
        this._stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.gameControl.playJump();
        },this);
    }

    /**舞台帧监听*/
    private onLoop():void{
        if(GameConfig.instance.gameStart){
            this.gameControl.onLoop();
        }
    }
}