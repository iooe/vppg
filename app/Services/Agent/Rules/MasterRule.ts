import Argument from "@/app/Services/Agent/Arguments/Argument";
import Coordinates from "@/app/Services/Data/Coordinates";
import Variable from "@/app/Services/Variable/Variable";

export const RULE_GREATER_OR_EQUAL = ">=";
export const RULE_LESS_OR_EQUAL = "<=";
export const RULE_EQUAL = "===";
export const RULE_NOT_EQUAL = "!==";

export const RULES = [RULE_EQUAL, RULE_LESS_OR_EQUAL, RULE_GREATER_OR_EQUAL, RULE_NOT_EQUAL]
export default class MasterRule {
    get key(): string {
        return this._key;
    }

    private readonly _key: string;

    constructor(key: string) {
        this._key = key;
    }

    public execute(argumentA: Argument, argumentB: Argument) {

        if (this._key === RULE_GREATER_OR_EQUAL) {
            if (argumentA.getSource() instanceof Coordinates) {
                return (argumentA.value.getX() >= argumentB.value.getX()) && (argumentA.value.getY() >= argumentB.value.getY())
            }

            if (argumentA.getSource() instanceof Variable) {
                return argumentA.value >= argumentB.value
            }
        }

        if (this._key === RULE_LESS_OR_EQUAL) {
            if (argumentA.getSource() instanceof Coordinates) {
                return (argumentA.value.getX() <= argumentB.value.getX()) && (argumentA.value.getY() <= argumentB.value.getY())
            }

            if (argumentA.getSource() instanceof Variable) {
                return argumentA.value <= argumentB.value
            }
        }

        if (this._key === RULE_EQUAL) {
            if (argumentA.getSource() instanceof Coordinates) {
                return (argumentA.value.getX() === argumentB.value.getX()) && (argumentA.value.getY() === argumentB.value.getY())
            }

            if (argumentA.getSource() instanceof Variable) {
                return argumentA.value === argumentB.value
            }
        }

        if (this._key === RULE_NOT_EQUAL) {
            if (argumentA.getSource() instanceof Coordinates) {
                return (argumentA.value.getX() !== argumentB.value.getX()) || (argumentA.value.getY() !== argumentB.value.getY())
            }

            console.log(11111)
            console.log(argumentA.getSource())
            console.log(22222)

            if (argumentA.getSource() instanceof Variable) {

                return argumentA.value !== argumentB.value
            }
        }

        return false;
    }
}