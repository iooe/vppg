import Action from "@/app/Services/Agent/Actions/Action";

export default class ActionMove extends Action {
    constructor() {
        super();
        this._key = "MOVE";
    }

    public execute() {

    }

    public getKey() {
        return this._key
    }
}