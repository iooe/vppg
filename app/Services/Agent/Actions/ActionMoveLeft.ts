import Action from "@/app/Services/Agent/Actions/Action";
import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";

export default class ActionMoveLeft extends Action {
    constructor(agentData: AgentData, canvasData: CanvasData) {
        super(agentData, canvasData);
        this._key = "MOVE:LEFT";
    }

    public execute() {
        this._agentData.coordinateX =  this._agentData.coordinateX - 1;
    }

    public getKey() {
        return this._key
    }

    public isExecutable(): boolean {
        return (this._agentData.coordinateX - 1) >= 0;
    }
}