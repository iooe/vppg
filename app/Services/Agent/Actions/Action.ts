import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";
import {v4 as uuidv4} from 'uuid';
import MyUtils from "@/app/Services/Core/MyUtils";

export default class Action {
    protected _agentData: AgentData | undefined;
    protected _canvasData: CanvasData | undefined;
    protected readonly _afterExecutionCallback: Function;

    // public constructor(props: Props = {}) {
    //     this._uuid = uuidv4();
    //
    //     console.log(111111111111111)
    //     if (props.callback !== undefined) {
    //         console.log(123123123123)
    //         this._func = Object.assign(() => {}, props.callback);
    //     }
    // }

    public constructor(
        afterExecutionCallback: Function = () => {
        },
    ) {
        this._uuid = uuidv4();
        this._afterExecutionCallback = afterExecutionCallback
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

    setTitle(...args: string[]) {
        this._title = MyUtils.replacePlaceholders(this._title, ...args);

        return this
    }

    public updateUuid(): void {
        this._uuid = uuidv4();
    }

    public init(agentData: AgentData, canvasData: CanvasData) {
        this._agentData = agentData;
        this._canvasData = canvasData;
    }


    public execute(): AgentData | undefined {
        this._agentData = this._afterExecutionCallback(this._agentData);
        return this._agentData
    }

    public isExecutable(): boolean {
        return true;
    }
}