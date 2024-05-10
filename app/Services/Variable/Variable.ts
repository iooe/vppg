import {v4 as uuidv4} from 'uuid';

export const VARIABLE_TYPE_BOOLEAN = "boolean";
export const VARIABLE_TYPE_STRING = "string";
export const VARIABLE_TYPE_NUMBER = "number";

export const VARIABLE_TYPES = [
    VARIABLE_TYPE_BOOLEAN,
    VARIABLE_TYPE_STRING,
    VARIABLE_TYPE_NUMBER
]
export default class Variable {
    set key(value: string) {
        this._key = value;
    }
    constructor(key: string, type: string, value: any) {
        this._key = key;
        this._type = type;
        this._value = value;
        this._uuid = uuidv4()
    }

    public copy() {
        return new Variable(this._key, this._type, this._value);
    }
    private _type: string;

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    private _key: string;

    get key(): string {
        return this._key;
    }

    private _uuid: string;

    get uuid(): string {
        return this._uuid;
    }

    private _value: any;

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
        // this._uuid = uuidv4()
    }
}