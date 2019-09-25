class NetManager {
    constructor() {
    }
    private static _instance: NetManager;//单例
    public static get instance(): NetManager {
        this._instance = this._instance ? this._instance : new NetManager;
        return this._instance;
    }
    /**
     * port:端口
     * data:数据
     * compFunc:返回监听
     * errFunc:错误监听
     */
    public sendPostRequest(port: string, data: any, compFunc: any, errFunc: any): void {
        let request: egret.HttpRequest = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.addEventListener(egret.Event.COMPLETE, compFunc, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, errFunc, this);

        request.open(GameConfig.instance.httpURL + port, egret.HttpMethod.POST);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(data);
    }

}