import Argument from "@/app/Services/Agent/Arguments/Argument";

export default class ArgumentVariable extends Argument {
    get value(): any | undefined {
        const variable = this.getSource()

        if (variable === undefined) {
            return undefined
        }

        return variable.value

        // if (this._value instanceof Variable) {
        //     return this._value.value;
        // }
        //
        // return this._value;
    }

    public getSource(): any | undefined {
        if (typeof window !== 'undefined') {
            // @ts-ignore
            return window.handlers.variables.get(this._value)
        }

        return undefined
        // if (this._value instanceof Variable) {
        //     return this._value.value;
        // }
        //
        // return this._value;
    }

    public hasSource(): boolean {
        return this.getSource() !== undefined
    }
}