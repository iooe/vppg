import Argument from "@/app/Services/Agent/Arguments/Argument";
import MasterRule from "@/app/Services/Agent/Rules/MasterRule";
import AgentData from "@/app/Services/Agent/AgentData";
import ArgumentAgentCoordinates from "@/app/Services/Agent/Arguments/ArgumentAgentCoordinates";
import Coordinates from "@/app/Services/Data/Coordinates";
import ArgumentVariable from "@/app/Services/Agent/Arguments/ArgumentVariable";
import {rule} from "postcss";

export enum STATEMENT_CALLBACKS {
    GET_VARIABLE,
    GET_AGENT_COORDINATES
}
export default class Statement {
    set rule(value: MasterRule) {
        this._rule = value;
    }
    private _rule: MasterRule;
    private callbacks = {}

    constructor(argumentA: Argument, argumentB: Argument, rule: MasterRule) {
        this._argumentA = argumentA;
        this._argumentB = argumentB;
        this._rule = rule;
    }

    public updateArguments(argumentA: Argument, argumentB: Argument) {
        this._argumentA = argumentA;
        this._argumentB = argumentB;
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
        // if(this._argumentA instanceof ArgumentVariable && typeof this._argumentA.value === 'string') {
        //
        //     const temp = this.callbacks[STATEMENT_CALLBACKS.GET_VARIABLE](this._argumentA.value);
        //
        //     if(temp !== undefined) {
        //         this._argumentA = temp.value;
        //     }
        // }

        // @ts-ignore
        const agent:AgentData = this.callbacks[STATEMENT_CALLBACKS.GET_AGENT_COORDINATES]

        if (this._argumentA instanceof ArgumentAgentCoordinates) {
            this._argumentA = new ArgumentAgentCoordinates(new Coordinates(agent.coordinateX, agent.coordinateY));
        }

        if (this._argumentB instanceof ArgumentAgentCoordinates) {
            this._argumentB = new ArgumentAgentCoordinates(new Coordinates(agent.coordinateX, agent.coordinateY));
        }

        return this._rule.execute(this._argumentA, this._argumentB);
    }
    //
    // public updateData(agent: AgentData) {
    //     if (this._argumentA instanceof ArgumentAgentCoordinates) {
    //         this._argumentA = new ArgumentAgentCoordinates(new Coordinates(agent.coordinateX, agent.coordinateY));
    //     }
    //
    //     if (this._argumentB instanceof ArgumentAgentCoordinates) {
    //         this._argumentB = new ArgumentAgentCoordinates(new Coordinates(agent.coordinateX, agent.coordinateY));
    //     }
    // }
    //
    // public getCallback(key: string): undefined | Function {
    //     // @ts-ignore
    //     return this.callbacks[key]
    // }

    public setCallback(key: STATEMENT_CALLBACKS, callback: Function): void {
        // @ts-ignore
        this.callbacks[key] = callback
    }
}