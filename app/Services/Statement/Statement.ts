import Argument from "@/app/Services/Agent/Arguments/Argument";
import MasterRule from "@/app/Services/Agent/Rules/MasterRule";
import AgentData from "@/app/Services/Agent/AgentData";
import ArgumentAgentCoordinates from "@/app/Services/Agent/Arguments/ArgumentAgentCoordinates";
import Coordinates from "@/app/Services/Data/Coordinates";

export default class Statement {
    private readonly _rule: MasterRule;

    constructor(argumentA: Argument, argumentB: Argument, rule: MasterRule) {
        this._argumentA = argumentA;
        this._argumentB = argumentB;
        this._rule = rule;
    }

    get rule(): MasterRule {
        return this._rule;
    }

    private _argumentA: Argument;

    get argumentA(): Argument {
        return this._argumentA;
    }

    private _argumentB: Argument;

    get argumentB(): Argument {
        return this._argumentB;
    }

    public verify(): boolean {
        return this._rule.execute(this._argumentA, this._argumentB);
    }

    public updateData(agent: AgentData) {
        if (this._argumentA instanceof ArgumentAgentCoordinates) {
            this._argumentA = new ArgumentAgentCoordinates(new Coordinates(agent.coordinateX, agent.coordinateY));
        }

        if (this._argumentB instanceof ArgumentAgentCoordinates) {
            this._argumentB = new ArgumentAgentCoordinates(new Coordinates(agent.coordinateX, agent.coordinateY));
        }
    }
}