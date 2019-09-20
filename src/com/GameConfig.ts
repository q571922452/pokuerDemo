class GameConfig {
    private static _instance: GameConfig;
    public static get instance(): GameConfig {
        this._instance = this._instance ? this._instance : new GameConfig;
        return this._instance;
    }
    /**舞台宽 */
    stageWidht = 1920;
    /**舞台高 */
    stageHeight = 1080;

    /**地图块固定宽度 资源宽度484需要覆盖100px */
    floorWidth = 384;

    /**初始人物位置 */
    playerInitX = 576;

    /**人物矫正速度*/
    speedX = 0;

    /**速度 */
    speed = 11;

    /**自由掉落速度 */
    downSpeed = 10;

    /**游戏开始 */
    gameStart = true;

    /**游戏结束 */
    gameEnd = false;
}