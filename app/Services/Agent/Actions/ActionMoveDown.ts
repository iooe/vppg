import Action from "@/app/Services/Agent/Actions/Action";
import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";

export default class ActionMoveDown extends Action {
    constructor(agentData: AgentData, canvasData: CanvasData) {
        super(agentData, canvasData);
        this._key = "MOVE:DOWN";
    }

    public execute() {
        this._agentData.coordinateY =  this._agentData.coordinateY + 1;
    }

    public getKey() {
        return this._key
    }

    public isExecutable() {
        return (this._agentData.coordinateY + 1) < this._canvasData.sizeY
    }
}