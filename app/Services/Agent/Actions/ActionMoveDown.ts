import Action from "@/app/Services/Agent/Actions/Action";
import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";

export default class ActionMoveDown extends Action {
    protected  _title: string = "ACTION:DOWN";

    public execute() {
        this._agentData.coordinateY = this._agentData.coordinateY + 1;
        return this._agentData
    }

    public isExecutable() {
        if (this._agentData == undefined || this._canvasData === undefined) {
            return false
        }

        return (this._agentData.coordinateY + 1) < this._canvasData.sizeY
    }
}