import Action from "@/app/Services/Agent/Actions/Action";

export default class ActionDecrementVariable extends Action {
    protected _title: string = "-- (<span class='variable-v-var'>var</span> <span class='variable-v-key'>$1</span>)";

/*    constructor(a: Function) {
        super(a);

        this._title = this._beforeExecutionCallback(this._title)
    }*/

    public execute() {
        this._afterExecutionCallback();
        return this._agentData
    }

    public isExecutable() {
        return true;
    }
}