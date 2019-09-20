class Floor extends eui.Component{
    constructor(){
        super();
        this.skinName = "resource/game_skins/floorUI.exml"
    }
    
    private floorBg:eui.Image;//图片

    private func:any;//存放一下方法 用于移除

    private _diff:number;//类型

    /**设置难度 */
    public setDiff(diff:number=1):void{
        this.floorBg.texture = RES.getRes("shidun"+diff+"_png");
        this._diff = diff;
        this.height = this.floorBg.height;
        this.addEventListener(egret.Event.ENTER_FRAME, this.func=()=>{
            this.onLoop();
        },this)
    }

    private onLoop():void{
        if(!GameConfig.instance.gameStart || GameConfig.instance.gameEnd) return;

        this.x -= GameConfig.instance.speed;
        if(this.x + this.width < 0){//这边如果超出界面 则 移除监听
            this.removeEventListener(egret.Event.ENTER_FRAME,this.func,this);
            ObjPool.recover("floor", this);
        }
    }

    /**获取难度*/
    public get diff():number{
        return this._diff;
    }

    /**检测位置是否在地图块上 */
    public checkDownPos(px:number, py:number):boolean{
        if(px > this.x && px < (this.x + this.width) && py > this.y && py < (this.y + (this.height/2))){
            return true;
        }
        return false;
    }
    
    /**检测位置是否碰到人物的左边 */
    public checkLeftPos(player:Player):boolean{
        if((player.x+player.width)<this.x+10 && (player.x+player.width)>this.x-10 && player.y > this.y && player.y < this.y+this.height){
            return true;
        }
        return false;
    }
    
}