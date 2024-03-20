import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";

export default class Action {

    protected static _key:string = "ACTION:KEY";
    protected static _title:string = "ACTION:TITLE";
    protected _agentData: AgentData;
    protected _canvasData: CanvasData;
    public constructor(agentData: AgentData, canvasData: CanvasData) {
        this._agentData = agentData;
        this._canvasData = canvasData;
    }

    public execute(): AgentData {
        return this._agentData
    }

    public isExecutable():boolean {
        return true;
    }

    static get key(): string {
        return this._key;
    }

    static get title(): string {
        return this._title;
    }

}