import Action from "@/app/Services/Agent/Actions/Action";
import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";

export default class ActionMoveRight extends Action {
    protected  _title:string = "ACTION:RIGHT";


    public execute() {
        this._agentData.coordinateX =  this._agentData.coordinateX + 1;
        return this._agentData
    }

    public isExecutable(): boolean {
        if (this._agentData == undefined || this._canvasData === undefined) {
            return false
        }
        return (this._agentData.coordinateX + 1) < this._canvasData.sizeX
    }
}