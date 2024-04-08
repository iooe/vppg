import Coordinates from "@/app/Services/Data/Coordinates";

export default class Argument {
    get value(): any {
        return this._value;
    }

    private readonly _value: Coordinates|void;

    constructor(value: Coordinates|void) {
        this._value = value;
    }

}