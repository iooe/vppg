import Action from "@/app/Services/Agent/Actions/Action";
import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";

export default class ActionMoveUp extends Action {
    constructor(agentData: AgentData, canvasData: CanvasData) {
        super(agentData, canvasData);
        this._key = "MOVE:UP";
    }

    public execute() {
        this._agentData.coordinateY =  this._agentData.coordinateY - 1;
    }

    public getKey() {
        return this._key
    }

    public isExecutable() {
        return (this._agentData.coordinateY - 1) >= 0;
    }
}