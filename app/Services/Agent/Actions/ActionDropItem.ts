import Action from "@/app/Services/Agent/Actions/Action";
import Item from "@/app/Services/Item/Item";

export default class ActionDropItem extends Action {
    protected _title: string = "Drop Item";

    public execute() {
        // @ts-ignore
        const items = window.handlers.items.get();

        const findIndex = items.findIndex((item: Item) => item.isCollected)

        if (findIndex === -1) {
            return this._agentData
        }


        // @ts-ignore
        window.handlers.items.drop(items[findIndex].uuid, {x: this._agentData?.coordinateX, y: this._agentData?.coordinateY})

        return this._agentData
    }

    public isExecutable() {
        return true;
        // @ts-ignore
        const items = window.handlers.items.get();

        const findIndex = items.findIndex((item: Item) => item.isCollected)

        return findIndex !== -1
    }
}