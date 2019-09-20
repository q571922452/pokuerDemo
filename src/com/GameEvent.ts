class GameEvent extends egret.Event {
    constructor(eventType: string) {
        super(eventType);
        this._eventType = eventType;
    }
    private _eventType: string;
    public static PLAY_JUMP: string = 'PLAY_JUMP';
}