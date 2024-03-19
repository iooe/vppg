import Argument from "@/app/Services/Agent/Arguments/Argument";

export default class ArgumentAgentCoordinates extends Argument {
    constructor(value: any) {
        super(value);
        this._key = "AgentCoordinates";
    }

}