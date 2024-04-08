export default class Coordinates {

    private readonly _y: number;
    private readonly _x: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public getX() {
        return this._x
    }

    public getY() {
        return this._y;
    }
}