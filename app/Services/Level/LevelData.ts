import Item from "@/app/Services/Item/Item";
import Variable from "@/app/Services/Variable/Variable";
import {StaticImageData} from "next/image";
import {v4 as uuidv4} from "uuid";
import {COMMAND_JUST_EXECUTE} from "@/app/Services/Agent/Commands";

export default class LevelData {
    private _backgroundTiles: Map<string, StaticImageData> = new Map();
    private _defaultBackgroundTile: StaticImageData = null;
    private _recommendedCodeInteractions = 0;

    get recommendedCodeInteractions(): number {
        return this._recommendedCodeInteractions;
    }

    set recommendedCodeInteractions(value: number) {
        this._recommendedCodeInteractions = value;
    }

    private _items: Item[] = []

    get items(): Item[] {
        return this._items;
    }

    set items(value: Item[]) {
        this._items = value;
    }

    private _stack = [{
        uuid: uuidv4(),
        type: COMMAND_JUST_EXECUTE,
        actions: []
    }]

    get stack(): [] {
        // @ts-ignore
        return this._stack;
    }

    set stack(value: []) {
        this._stack = value;
    }

    private _variables: Variable[] = []

    get variables(): Variable[] {
        return this._variables;
    }

    set variables(value: Variable[]) {
        this._variables = value;
    }

    private _image: StaticImageData = null;

    get image(): StaticImageData {
        return this._image;
    }

    set image(value: StaticImageData) {
        this._image = value;
    }

    private _conditions: object[] = []

    get conditions(): object[] {
        return this._conditions;
    }

    set conditions(value: object[]) {
        this._conditions = value;
    }

    private _objectivesDescription: string[] = []

    get objectivesDescription(): string[] {
        return this._objectivesDescription;
    }

    set objectivesDescription(value: string[]) {
        this._objectivesDescription = value;
    }

    private _annotation: string = '';

    get annotation(): string {
        return this._annotation;
    }

    set annotation(value: string) {
        this._annotation = value;
    }

    private _story: string = '';

    get story(): string {
        return this._story;
    }

    set story(value: string) {
        this._story = value;
    }

    private _levelNumber: number = 1;

    get levelNumber(): number {
        return this._levelNumber;
    }

    set levelNumber(value: number) {
        this._levelNumber = value;
    }

    private _title: string = '';

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    public getBackgroundTileByCoordinates(x: number, y: number): StaticImageData {
        const tile = this._backgroundTiles.get(x.toString() + y.toString());
        if (tile) {
            return tile;
        }

        return this._defaultBackgroundTile
    }

    public setBackgroundTileByCoordinates(x: number, y: number, value: StaticImageData) {
        this._backgroundTiles.set(x.toString() + y.toString(), value);
    }

    public setDefaultBackgroundTile(value: StaticImageData) {
        this._defaultBackgroundTile = value;
    }
}