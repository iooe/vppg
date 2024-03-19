export default class AgentData {
    constructor(id: string) {
        this._id = id;
    }

    private readonly _id: string;

    get id(): string {
        return this._id;
    }

    private _width: number = 0;

    get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this._width = value;
    }

    private _height: number = 0;

    get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this._height = value;
    }

    private _coordinateX: number = 0;

    get coordinateX(): number {
        return this._coordinateX;
    }

    public set coordinateX(value: number) {
        this._coordinateX = value;
    }

    private _coordinateY: number = 0;

    get coordinateY(): number {
        return this._coordinateY;
    }

    public set coordinateY(value: number) {
        this._coordinateY = value;
    }

    public setCoordinates(x: number, y: number) {
        this._coordinateX = x;
        this._coordinateY = y;
    }
}