import Action from "@/app/Services/Agent/Actions/Action";

export default class ActionMoveLeft extends Action {
    protected _title: string = "Step Left";


    public execute() {
        this._agentData.coordinateX = this._agentData.coordinateX - 1;
        return this._agentData
    }

    public isExecutable(): boolean {

        if (this._agentData == undefined || this._canvasData === undefined) {
            return false
        }

        return (this._agentData.coordinateX - 1) >= 0;
    }
}