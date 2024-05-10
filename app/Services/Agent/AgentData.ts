
interface AgentProps {
    id: string;
    width: number,
    height: number,
}

export default class AgentData {
    private readonly _id: string;

    constructor(props: AgentProps) {
        this._id = props.id;
        this._width = props.width;
        this._height = props.height;
    }

    get id(): string {
        return this._id;
    }

    private _width: number = 0;

    get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this._width = value;
    }

    private _height: number = 0;

    get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this._height = value;
    }

    private _coordinateX: number = 0;

    get coordinateX(): number {
        return this._coordinateX;
    }

    public set coordinateX(value: number) {
        this._coordinateX = value;
    }

    private _coordinateY: number = 0;

    get coordinateY(): number {
        return this._coordinateY;
    }

    public set coordinateY(value: number) {
        this._coordinateY = value;
    }

    public copy() {
        const agent = new AgentData({id: this._id, width: this._width, height: this._height})

        agent.width = this._width
        agent.height = this._height
        agent.coordinateY = this._coordinateY
        agent.coordinateX = this._coordinateX

        return agent;
    }

    public setCoordinateY(value: number) {
        this._coordinateY = value;
    }

    public setCoordinates(x: number, y: number) {
        this._coordinateX = x;
        this._coordinateY = y;
    }
}