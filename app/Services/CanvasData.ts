import AgentData from "@/app/Services/Agent/AgentData";

export default class CanvasData {
    get sizeX(): number {
        return this._sizeX;
    }

    get sizeY(): number {
        return this._sizeY;
    }

    private readonly _sizeX: number;
    private readonly _sizeY: number;
    constructor(sizeX:number, sizeY: number) {
        this._sizeX = sizeX;
        this._sizeY = sizeY;
    }

}