import Action from "@/app/Services/Agent/Actions/Action";
import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";

export default class ActionMoveUp extends Action {
    protected static _title:string = "ACTION:UP";
    constructor(agentData: AgentData, canvasData: CanvasData) {
        super(agentData, canvasData);
    }

    public execute() {
        this._agentData.coordinateY =  this._agentData.coordinateY - 1;
        return this._agentData
    }

    public isExecutable() {
        return (this._agentData.coordinateY - 1) >= 0;
    }
}