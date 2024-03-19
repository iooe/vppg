import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";

export default class Action {

    protected _key:string = "ACTION";
    protected _agentData: AgentData;
    protected _canvasData: CanvasData;
    public constructor(agentData: AgentData, canvasData: CanvasData) {
        this._agentData = agentData;
        this._canvasData = canvasData;
    }

    public execute() {

    }

    public isExecutable():boolean {
        return true;
    }
}