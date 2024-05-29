import {v4 as uuidv4} from 'uuid';

export const ITEM_TYPE_APPLE = "apple";
export const ITEM_TYPE_BOX = "box";
export const ITEM_TYPE_COIN = "coin";
export default class Item {
    private readonly _uuid: string;

    constructor(type: string) {
        this._type = type;
        this._uuid = uuidv4()
    }

    private _isCollected: boolean = false;

    get isCollected(): boolean {
        return this._isCollected;
    }

    private _type: string;

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    private _key: string = '';

    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
    }

    get uuid(): string {
        return this._uuid;
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

    public copy() {
        const newItem = new Item(this._type)
        newItem.setCoordinates(this._coordinateX, this._coordinateY)

        return newItem;
    }

    collect() {
        this._isCollected = true;
    }

    drop() {
        this._isCollected = false;
    }

    public setCoordinates(x: number, y: number) {
        this._coordinateX = x;
        this._coordinateY = y;

        return this;
    }
}