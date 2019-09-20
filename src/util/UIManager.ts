class UIManager{
    private static _instance:UIManager;//
    constructor(bglayer:any,glayer:any){
        this._bgLayer = bglayer;
        this._gameLayer = glayer;
    }
    /**返回单例 */
    public static get instance():UIManager{
        return this._instance;
    }
    public static set instance(uiManager:UIManager){
        this._instance = uiManager;
    }

    private _bgLayer:egret.Sprite;//背景层
    private _gameLayer:egret.Sprite;//游戏层 这一层放地形和人物以及红包

    /**添加一个子节点 */
    public addSprite(node:any):void{
        if(node)
            this._gameLayer.addChild(node);
        else
            console.log("节点不能为空")
    }

    /**添加背景 */
    public addBg(bg:any):void{
        if(bg)
            this._bgLayer.addChild(bg);
        else
            console.log("背景不能为空")
    }
}