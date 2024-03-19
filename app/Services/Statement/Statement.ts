import Argument from "@/app/Services/Agent/Arguments/Argument";
import Rule from "@/app/Services/Agent/Rules/Rule";

export default class Statement {

    protected _argumentA: Argument;
    protected _argumentB: Argument;
    protected _rule: Rule;

    constructor(argumentA: Argument, argumentB: Argument, rule: Rule) {
        this._argumentA = argumentA;
        this._argumentB = argumentB;
        this._rule = rule;
    }

    public verify():boolean {
        return this._rule.execute(this._argumentA, this._argumentB);
    }
}