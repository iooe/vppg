import Action from "@/app/Services/Agent/Actions/Action";
import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";

export default class ActionMoveRight extends Action {
    protected static _title:string = "ACTION:RIGHT";
    constructor(agentData: AgentData,  canvasData: CanvasData) {
        super(agentData, canvasData);
    }

    public execute() {
        this._agentData.coordinateX =  this._agentData.coordinateX + 1;
        return this._agentData
    }

    public isExecutable(): boolean {
        return (this._agentData.coordinateX + 1) < this._canvasData.sizeX
    }
}