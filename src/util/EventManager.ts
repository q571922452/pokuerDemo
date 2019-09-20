class EventManager extends egret.EventDispatcher {
    constructor() {
        super();
    }
    private static _instance: EventManager;

    private static get instance(): EventManager {
        return this._instance ? this._instance : new EventManager();
    }
    /**派发事件 */
    public static dispatchEvent(event: egret.Event): void {
        this.instance.dispatchEvent(event);
    }
    /**监听 */
    public static addEventListener(type: string, listener: Function, obj:any): void {
        this.instance.addEventListener(type, listener, obj)
    }
    public static hasEventListener(type: string): boolean {
        return this.instance.hasEventListener(type);
    }
    /**移除 */
    public static removeEventListener(type: string, listener: Function): void {
        this.instance.removeEventListener(type, listener, this);
    }
}