import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";
import {v4 as uuidv4} from 'uuid';

export default class Action {
    get uuid(): string {
        return this._uuid;
    }

    protected _agentData: AgentData;
    protected _canvasData: CanvasData;
    private readonly _uuid: string;

    public constructor(agentData: AgentData, canvasData: CanvasData) {
        this._agentData = agentData;
        this._canvasData = canvasData;
        this._uuid = uuidv4();
    }

    protected static _key: string = "ACTION:KEY";

    static get key(): string {
        return this._key;
    }

    protected static _title: string = "ACTION:TITLE";

    static get title(): string {
        return this._title;
    }

    public execute(): AgentData {
        return this._agentData
    }

    public isExecutable(): boolean {
        return true;
    }

}