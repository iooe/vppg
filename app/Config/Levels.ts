import LevelData from "@/app/Services/Level/LevelData";
import Item, {ITEM_TYPE_APPLE, ITEM_TYPE_BOX, ITEM_TYPE_COIN} from "@/app/Services/Item/Item";
import Variable, {
    VARIABLE_TYPE_BOOLEAN,
    VARIABLE_TYPE_NUMBER,
    VARIABLE_TYPE_STRING
} from "@/app/Services/Variable/Variable";

import appleSrc from '../Images/textures/apple.png';
import boxSrc from '../Images/textures/box.png';
import coinSrc from '../Images/textures/coin.png';
import floorSrc from '../Images/background/floor.jpg';
import floorWoodSrc from '../Images/background/floor-wood.jpg';
import floorDoorSrc from '../Images/background/floor-door.png';
import floorDoorMarkSrc from '../Images/background/floor-wood-mark.jpg';
import floorTavernSrc from '../Images/background/floor-tavern.png';
import floorDragonSrc from '../Images/background/floor-dragon.png';
import {v4 as uuidv4} from "uuid";
import {COMMAND_FOR, COMMAND_JUST_EXECUTE} from "@/app/Services/Agent/Commands";
import ActionMoveRight from "@/app/Services/Agent/Actions/ActionMoveRight";
import ActionCollectItem from "@/app/Services/Agent/Actions/ActionCollectItem";
import ActionMoveDown from "@/app/Services/Agent/Actions/ActionMoveDown";
import ActionDropItem from "@/app/Services/Agent/Actions/ActionDropItem";
import ActionMoveLeft from "@/app/Services/Agent/Actions/ActionMoveLeft";
import ActionMoveUp from "@/app/Services/Agent/Actions/ActionMoveUp";

export default class Levels {
    constructor() {

        /**
         * Level 1
         */
        const level1 = new LevelData();
        level1.title = 'The Apple Harvest';
        level1.image = appleSrc
        level1.setDefaultBackgroundTile(floorSrc);
        level1.setBackgroundTileByCoordinates(0, 0, floorDoorSrc);

        level1.items = [
            new Item(ITEM_TYPE_APPLE).setCoordinates(0, 2),
            new Item(ITEM_TYPE_BOX).setCoordinates(2, 4),
            new Item(ITEM_TYPE_COIN).setCoordinates(3, 1),
        ]

        level1.variables = [
            new Variable("b_var", VARIABLE_TYPE_BOOLEAN, false),
            new Variable("number_var", VARIABLE_TYPE_NUMBER, 0),
            new Variable("item-counter", VARIABLE_TYPE_NUMBER, 2),
            new Variable("str_var", VARIABLE_TYPE_STRING, "original value")
        ];
        level1.levelNumber = 1;
        level1.objectivesDescription = [
            'Collect only 🍏 apples and 📦 crates, but do not touch the 🪙 coins.',
            'The variable \"item-counter\" should be a number representing the total count of collected items.',
            'To finish the level, head to the 🚪 exit when you are ready.'
        ]
        level1.story = `
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            Once upon a time, in a prosperous kingdom, there was a wise king who always sought ways to make his
        subjects happier. One day, he noticed that the apple orchards were overflowing with ripe, delicious
            apples.
            </p>
            <h2 class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            The King&apos;s Idea
        </h2>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            The king thought long and hard, and finally came up with
            <a href="#" class="font-medium text-primary underline underline-offset-4">a brilliant idea</a>: he
        would collect the apples from the orchards and distribute them to every household in the kingdom.
        </p>
        <blockquote class="mt-6 border-l-2 pl-6 italic">
            &apos;Everyone should enjoy the bounty of our land,&apos; he said, &apos;and these apples will bring joy
        to all.&apos;
        </blockquote>
        <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            The Great Apple Collection
        </h3>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            The king&apos;s subjects were thrilled with the idea. They eagerly helped gather the apples, filling crates
        and baskets with the juicy fruit. The entire kingdom buzzed with excitement as people worked together.
        </p>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            The king organized teams to collect the apples and deliver them to every home. No one was asked for
            money; the apples were a gift from the king to his people.
        </p>
        <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            A Kingdom United
        </h3>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            The children laughed as they bit into the sweet apples, and the adults shared apple pies, ciders, and
        other treats made from the harvest. The act of sharing brought the community closer together.
        </p>

        <p class="leading-7 [&:not(:first-child)]:mt-6">
            The king, seeing the joy and unity his simple idea had brought, felt immense pride. He knew he had made
        the right choice by sharing the kingdom&apos;s wealth. The people celebrated the harvest festival every year,
            remembering the king&apos;s generosity.
        </p>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            The moral of the story is: sharing the bounty of the land brings happiness and unity to all.
        </p>`;
        level1.annotation = 'Once upon a time, in a prosperous kingdom, there was a wise king who always sought ways to make his\n        subjects happier. One day, he noticed that the apple orchards were overflowing with ripe, delicious\n            apples.'
        level1.conditions = [
            {
                "type": "variableCheck",
                "variableName": "item-counter",
                "expectedValue": 2
            },
            {
                "type": "itemCheck",
                "itemTypes": [ITEM_TYPE_APPLE, ITEM_TYPE_BOX],
                "isCollected": false
            },
            {
                "type": "itemCheck",
                "itemTypes": [ITEM_TYPE_COIN],
                "isCollected": true
            },
            {
                "type": "agentCheck",
                "coordinateX": 0,
                "coordinateY": 0
            }
        ]
        level1.recommendedCodeInteractions = 48;
        // @ts-ignore
        level1.stack = [
            {
                uuid: uuidv4(),
                type: COMMAND_JUST_EXECUTE,
                actions: [

                ]
            },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_FOR,
            //     props: {
            //         interactions: 2
            //     },
            //     actions: [
            //         new ActionMoveDown(),
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_JUST_EXECUTE,
            //     actions: [
            //         new ActionCollectItem()
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_FOR,
            //     props: {
            //         interactions: 2
            //     },
            //     actions: [
            //         new ActionMoveRight(),
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_FOR,
            //     props: {
            //         interactions: 3
            //     },
            //     actions: [
            //         new ActionMoveDown(),
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_JUST_EXECUTE,
            //     actions: [
            //         new ActionCollectItem()
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_FOR,
            //     props: {
            //         interactions: 5
            //     },
            //     actions: [
            //         new ActionMoveUp(),
            //         new ActionMoveLeft(),
            //     ]
            // },
        ]

        this._levels.push(level1)

        /**
         * Level 2
         */
        const level2 = new LevelData();
        level2.title = 'Cleaning on the Spaceship';

        level2.setDefaultBackgroundTile(floorWoodSrc);
        level2.setBackgroundTileByCoordinates(3, 4, floorDoorMarkSrc);
        level2.setBackgroundTileByCoordinates(4, 4, floorDoorMarkSrc);


        // @ts-ignore
        level2.stack = [
            {
                uuid: uuidv4(),
                type: COMMAND_JUST_EXECUTE,
                actions: [

                ]
            },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_FOR,
            //     props: {
            //         interactions: 4
            //     },
            //     actions: [
            //         new ActionMoveRight(),
            //         new ActionCollectItem(),
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_FOR,
            //     props: {
            //         interactions: 4
            //     },
            //     actions: [
            //         new ActionMoveDown(),
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_FOR,
            //     props: {
            //         interactions: 4
            //     },
            //     actions: [
            //         new ActionDropItem(),
            //         new ActionMoveLeft(),
            //     ]
            // },
        ]
        level2.items = [
            new Item(ITEM_TYPE_BOX).setCoordinates(2, 0),
            new Item(ITEM_TYPE_BOX).setCoordinates(3, 0),
            new Item(ITEM_TYPE_BOX).setCoordinates(4, 0),
        ]
        level2.recommendedCodeInteractions = 35;
        level2.conditions = [

            {
                "type": "itemCoordinatesCheck",
                "itemTypes": [ITEM_TYPE_BOX],
                "coordinateX": 3,
                "coordinateY": 4
            },
            {
                "type": "itemCoordinatesCheck",
                "itemTypes": [ITEM_TYPE_BOX],
                "coordinateX": 4,
                "coordinateY": 4
            }
        ]

        level2.image = boxSrc
        level2.levelNumber = 2;
        level2.objectivesDescription = [
            'Collect all 📦 boxes on the level',
            'Place the collected boxes on the specific spots on the level.',
        ]

        level2.story = `<p class="leading-7 [&:not(:first-child)]:mt-6">
Once upon a time, aboard a bustling space station orbiting a distant planet, there was a wise commander who always thought what the team could do in their free time. Finally, the commander came up with
    <a href="#" class="font-medium text-primary underline underline-offset-4">a brilliant idea</a>: they
    would collect the used boxes on the spaceship and distribute them to the ship\'s storage.
</p><h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">The Great Starberry Collection</h3><p class="leading-7 [&:not(:first-child)]:mt-6">The crew wasn\'t thrilled with the idea, but they helped gather the boxes, and now the spaceship could be named as the most cleaned spaceship in the galaxy.</p>`;

        level2.annotation = 'Navigate the corridors of a futuristic spaceship and clear the unexpected messes!'
        this._levels.push(level2)

        /**
         * Level 3
         */
        const level3 = new LevelData();
        level3.title = 'The Princess and the Dragon';
        level3.setDefaultBackgroundTile(floorSrc);
        level3.image = coinSrc;
        level3.levelNumber = 3;
        level3.items = [
            new Item(ITEM_TYPE_COIN).setCoordinates(1, 1),
        ]
        level3.setBackgroundTileByCoordinates(4, 0, floorTavernSrc);
        level3.setBackgroundTileByCoordinates(0, 4, floorDragonSrc);
        level3.objectivesDescription = [
            'Collect only 🍏 apples and 📦 crates, but do not touch the 🪙 coins.',
            'The variable \"item-counter\" should be a number representing the total count of collected items.',
            'To finish the level, head to the 🚪 exit when you are ready.'
        ]
        level3.conditions = [
            {
                "type": "itemCoordinatesCheck",
                "itemTypes": [ITEM_TYPE_COIN],
                "coordinateX": 4,
                "coordinateY": 0
            },
            {
                "type": "agentCheck",
                "coordinateX": 0,
                "coordinateY": 4
            }
        ]
        // @ts-ignore
        level3.stack = [
            {
                uuid: uuidv4(),
                type: COMMAND_JUST_EXECUTE,
                actions: [

                ]
            },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_JUST_EXECUTE,
            //     actions: [
            //         new ActionMoveRight(),
            //         new ActionMoveDown(),
            //         new ActionCollectItem(),
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_FOR,
            //     props: {
            //         interactions: 4
            //     },
            //     actions: [
            //         new ActionMoveRight(),
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_JUST_EXECUTE,
            //     actions: [
            //         new ActionMoveUp(),
            //         new ActionDropItem(),
            //     ]
            // },
            // {
            //     uuid: uuidv4(),
            //     type: COMMAND_FOR,
            //     props: {
            //         interactions: 4
            //     },
            //     actions: [
            //         new ActionMoveDown(),
            //         new ActionMoveLeft(),
            //     ]
            // },
        ]
        level3.story = `<p class="leading-7 [&:not(:first-child)]:mt-6">
Once upon a time, in a medieval kingdom plagued by a fearsome dragon, a brave knight named Sir Robot knew he needed to act quickly to save the captured princess. However, Sir Robot lacked the necessary funds to gather an army. He
    <a href="#" class="font-medium text-primary underline underline-offset-4">devised a cunning plan</a>: he would seek the help of local merchants and offer them protection in exchange for gold.</p>
<h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">The Call to Arms</h3><p class="leading-7 [&:not(:first-child)]:mt-6">
With the gold he collected, Sir Robot hired the best knights in the kingdom. These brave warriors, clad in shining armor and wielding sharp swords, were ready to face the dragon. They trained day and night, perfecting their strategy and building their courage for the dangerous journey ahead.</p><p class="leading-7 [&:not(:first-child)]:mt-6">
The day finally came when Sir Robot and his knights confronted the dragon in its lair. After an intense battle, filled with the roars of the dragon and the clash of swords, Sir Robot struck the final blow. The dragon was defeated, and the princess was saved. The kingdom rejoiced, celebrating the heroic deeds of Sir Robot and his loyal knights.</p>
`;
        level3.recommendedCodeInteractions = 32;
        level3.objectivesDescription = [
            'Collect the 🪙 coins.',
            'Drop the collected coins at the 🐉 tavern to hire the army.',
            'Go to the dragon\'s lair to save the princess with hired army.'
        ]
        level3.annotation = 'Embark on a quest to rescue the princess from a fearsome dragon.'
        this._levels.push(level3)
    }

    private _levels: LevelData[] = [];

    get levels(): LevelData[] {
        return this._levels;
    }

    public getByNumber(levelNumber: number): LevelData | undefined {
        return this._levels.find(level => level.levelNumber === levelNumber);
    }
}