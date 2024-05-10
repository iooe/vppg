import Coordinates from "@/app/Services/Data/Coordinates";
import Variable from "@/app/Services/Variable/Variable";

export default class Argument {
    protected readonly _value: Coordinates | Variable | string | void | boolean | null | number;

    constructor(value: Coordinates | Variable | string | void | boolean | null | number) {
        this._value = value;
    }

    get value(): any {
        return this._value;
    }

    public getSource(): any {
        return this._value;
    }

    public hasSource(): boolean {
        return false
    }
}