import Action from "@/app/Services/Agent/Actions/Action";
import Item from "@/app/Services/Item/Item";

export default class ActionCollectItem extends Action {
    protected _title: string = "Collect Item";

    public execute() {
        const items = window.handlers.items.get();

        const findIndex = items.findIndex(
            (item: Item) => item.coordinateX === this._agentData?.coordinateX && item.coordinateY === this._agentData?.coordinateY)


        if (findIndex === -1) {
            return this._agentData
        }

        window.handlers.items.collect(items[findIndex].uuid)

        return this._agentData
    }

    public isExecutable() {
        const items = window.handlers.items.get();

        const findIndex = items.findIndex(
            (item: Item) => item.coordinateX === this._agentData?.coordinateX && item.coordinateY === this._agentData?.coordinateY)

        return findIndex !== -1
    }
}