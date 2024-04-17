import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";
import {v4 as uuidv4} from 'uuid';

export default class Action {
    protected _agentData: AgentData | undefined;
    protected _canvasData: CanvasData | undefined;

    public constructor() {
        this._uuid = uuidv4();
    }

    private _uuid: string;

    get uuid(): string {
        return this._uuid;
    }

    protected _key: string = "ACTION:KEY";

    get key(): string {
        return this._key;
    }

    protected _title: string = "ACTION:TITLE";

    get title(): string {
        return this._title
    }

    public updateUuid(): void {
        this._uuid = uuidv4();
    }

    public init(agentData: AgentData, canvasData: CanvasData) {
        this._agentData = agentData;
        this._canvasData = canvasData;
    }

    public execute(): AgentData | undefined {
        return this._agentData
    }

    public isExecutable(): boolean {
        return true;
    }
}