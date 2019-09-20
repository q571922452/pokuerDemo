class GameController extends eui.Component {
    constructor() {
        //加载json
        super();
    }

    private _floorConfig = [];//这里存放一下随机后的地图块配置文件
    private _lastFloor: Floor;//上一个地图块


    private _floorList = [];//存放地图块
    private _waterPoolList = [];//存放水池背景
    private _player: Player;//ip类
    /**根据配置添加地图块 */
    public addFloor(): void {
        var gameConfig = RES.getRes("GameConfig_json");
        let floorListStr: Array<string> = gameConfig.map.split("-");
        for (let i = 0; i < floorListStr.length; ++i) {
            if (floorListStr[i].split('')[1]) {//这里是地图块
                let floor: Floor = ObjPool.getItemForPool("floor", Floor);
                floor.setDiff(Number(floorListStr[i].split('')[1]));
                floor.x = GameConfig.instance.floorWidth * i;
                floor.y = GameConfig.instance.stageHeight - floor.height;
                this._floorList.push(floor);
                UIManager.instance.addSprite(floor);
            } else {//这里是水
                let waterPool: Pond = ObjPool.getItemForPool("pond", Pond);
                waterPool.createAni();
                waterPool.x = GameConfig.instance.floorWidth * i;
                waterPool.y = GameConfig.instance.stageHeight - waterPool.height;
                this._waterPoolList.push(waterPool);
                UIManager.instance.addBg(waterPool);
            }

        }
        // for (var key in gameConfig) {
        //     if (gameConfig.hasOwnProperty(key)) {
        //         var element = gameConfig[key];
        //         this._floorConfig.push(element[Math.floor(Math.random()*3)]);
        //     }
        // }

        // //生成地图块
        // for(let j = 0; j < this._floorConfig.length; j++){
        //     for(let i = 0; i < this._floorConfig[j].length; i++){
        //         let mapkey = this._floorConfig[j][i];
        //         var floor:Floor = ObjPool.getItemForPool("floor", Floor);
        //         floor.setDiff(mapkey);
        //         if(this._lastFloor){
        //             floor.x = this._lastFloor.x + this._lastFloor.width - GameConfig.instance.floorDeviation;
        //         }else{
        //             floor.x = -GameConfig.instance.floorDeviation;
        //         }
        //         floor.y = GameConfig.instance.stageHeight - floor.height;
        //         this._floorList.push(floor);
        //         this._lastFloor = floor;
        //         UIManager.instance.addSprite(floor);
        //     }
        // }

        this._player = new Player();
        this._player.y = GameConfig.instance.stageHeight - 300;
        UIManager.instance.addSprite(this._player);
    }
    public playJump(): void {
        this._player.gotoJump();
    }
    /**帧监听 */
    public onLoop(): void {
        // this._player.y += GameConfig.instance.downSpeed;
        this._player.onLoop();
        this.collideCheck();
    }
    /**有效地图块 */
    private getEffFloors(): any {
        var effFloors = [];//存在视口中的地图块
        for (let i = 0; i < this._floorList.length; ++i) {
            if (this._floorList[i].x + this._floorList[i].width > 0 && this._floorList[i].x < GameConfig.instance.stageWidht) {//视口内的地图块
                effFloors.push(this._floorList[i]);
            }
        }
        return effFloors;
    }

    /**碰撞检测 */
    private collideCheck(): void {
        //获取有效地图块
        var floors = this.getEffFloors();
        /**人物是否碰到右边 */
        var lc: boolean = false;
        for (let i = 0; i < floors.length; i++) {
            if (floors[i].checkDownPos(this._player.x, this._player.y)) {//检测是否落地
                this._player.y = floors[i].y;
                this._player.jumpReset();
            }
            if (floors[i].checkLeftPos(this._player)) {//检测是否碰撞到地图块左侧 人想后退
                this._player.x -= GameConfig.instance.speed;
                lc = true;
            }
        }

        /**检测玩家位置是否需要矫正 */
        console.log('===>', lc);
        if (!lc && !this._player.checkInitX()) {//需要矫正 给玩家一个向前的加速度。。
            GameConfig.instance.speedX = 3;
        }

    }
}