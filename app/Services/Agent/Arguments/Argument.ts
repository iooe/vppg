export default class Argument {
    get value(): any {
        return this._value;
    }


    protected _key:string = "Argument";
    private _value: any;

    constructor(value: any) {
        this._value = value
    }

}