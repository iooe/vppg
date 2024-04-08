import Argument from "@/app/Services/Agent/Arguments/Argument";
import Coordinates from "@/app/Services/Data/Coordinates";

export const RULE_GREATER_OR_EQUAL = "RULE_GREATER_OR_EQUAL";
export const RULE_LESS_OR_EQUAL = "RULE_LESS_OR_EQUAL";
export const RULE_EQUAL = "RULE_EQUAL";

export default class MasterRule {

    private readonly _key: string;

    constructor(key: string) {
        this._key = key;
    }

    public execute(argumentA: Argument, argumentB: Argument) {
        if (this._key === RULE_GREATER_OR_EQUAL) {
            if (argumentA.value instanceof Coordinates) {

                return (argumentA.value.getX() >= argumentB.value.getX()) && (argumentA.value.getY() >= argumentB.value.getY())
            }
        }

        if (this._key === RULE_LESS_OR_EQUAL) {
            if (argumentA.value instanceof Coordinates) {

                return (argumentA.value.getX() <= argumentB.value.getX()) && (argumentA.value.getY() <= argumentB.value.getY())
            }
        }

        if (this._key === RULE_EQUAL) {
            if (argumentA.value instanceof Coordinates) {

                return (argumentA.value.getX() === argumentB.value.getX()) && (argumentA.value.getY() === argumentB.value.getY())
            }

        }

        return false;
    }
}