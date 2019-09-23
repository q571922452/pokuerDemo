class GameController extends eui.Component {
    constructor() {
        //加载json
        super();
    }

    private _floorConfig = [];//这里存放一下随机后的地图块配置文件
    private _lastFloor: Floor;//上一个地图块


    private _floorList: Array<Floor> = [];//存放地图块
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
                floor.y = GameConfig.instance.stageHeight - (floor.height + GameConfig.instance.diffNum[Number(floorListStr[i].split('')[1]) - 1]);
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
            //添加怪物
            for (let m = 0; m < gameConfig.monster.length; m++) {
                if (gameConfig.monster[m].mapKey == this._floorList.length) {
                    let monster: Monster = new Monster(gameConfig.monster[m].mt);
                    monster.x = this._floorList[gameConfig.monster[m].mapKey - 1].x;
                    monster.y = this._floorList[gameConfig.monster[m].mapKey - 1].y - monster.height / 4;
                    UIManager.instance.addSprite(monster);
                }
            }
        }

        this._player = new Player();
        this._player.y = GameConfig.instance.stageHeight - 300;
        UIManager.instance.addSprite(this._player);
    }
    public playJump(): void {
        this._player.gotoJump();
    }
    /**帧监听 */
    public onLoop(): void {
        this._player.onLoop();
        this.collideCheck();
        this.clearFloor();
    }
    /**有效地图块 */
    private getEffFloors(): any {
        var effFloors = [];//存在视口中的地图块
        while (this._floorList[0].x + this._floorList[0].width < 0) { //删除多余数据
            this._floorList.shift();
        }
        for (let i = 0; i < this._floorList.length; ++i) { // 返回当前以及下一块地图块
            if (this._player.x > this._floorList[i].x + 20 && this._player.x < (this._floorList[i].x + this._floorList[i].width)) {
                effFloors.push(this._floorList[i]);
                effFloors.push(this._floorList[i + 1]);
                return effFloors;
            }
        }
        // return effFloors;
    }
    /**碰撞检测 */
    private collideCheck(): void {
        //获取有效地图块
        var floors: Array<Floor> = this.getEffFloors();
        /**人物是否碰到右边 */
        if (!floors) { // 如果floors 为空，则为当前位置是水，不进行碰撞检测
            return;
        }
        let lc: boolean = false;//是否进行位置校验
        if (floors[0].checkDownPos(this._player)) {// 当前这块 检测是否落地
            this._player.y = floors[0].y - this._player.height / 4;
            this._player.jumpReset();
        }
        if (floors[1].checkLeftPos(this._player)) { // 下一块检测是否碰撞
            this._player.x -= GameConfig.instance.speed;
            lc = true;
        }
        /**检测玩家位置是否需要矫正 */
        if (!lc && !this.checkInitX(this._player)) {//需要矫正 给玩家一个向前的加速度。。
            GameConfig.instance.speedX = 4;
        }else{
            GameConfig.instance.speedX = 0;
        }

    }
    /**清除地图块 */
    private clearFloor(): void {

    }
    /**检测人物是否还在初始位置*/
    private checkInitX(player: Player): boolean {
        if (player.x == GameConfig.instance.playerInitX) {
            return true;
        }
        return false;
    }
}