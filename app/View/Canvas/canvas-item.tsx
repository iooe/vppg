import {RiAppleFill, RiAppleLine, RiBox1Fill, RiBox1Line, RiCoinFill, RiCoinLine, RiRobot2Line} from "@remixicon/react";
import React from "react";
import Image from "next/image";

interface TextProps {
    id: string;
    x: number,
    y: number,
    width: number,
    height: number,
    type: string
    // layer: TextLayer;
    // onPointerDown: (e: React.PointerEvent, id: string) => void;
    // selectionColor?: string;
}
import appleSrc from './../../Images/apple.png';
import boxSrc from './../../Images/isometric-box.png';
import coinSrc from './../../Images/isometric-coin.png';

export const CanvasItem = ({id, x, y, width, height, type}: TextProps) => {

    const getIcon = () => {
        switch (type) {
            case 'apple':
                return appleSrc
            case 'box':
                return boxSrc
            case 'coin':
                return coinSrc
            default:
                return 'ITEM_ICON'
        }
    }

    return (

        <foreignObject  x={x} y={y} id={id} width={width} height={height}>
            <div className={"canvas-agent"}>
                <Image className={'canvas-layer-background canvas-layer-background--size-65 canvas-layer-background--centered'}
                       alt={''}
                       src={getIcon()}
                />

            </div>
        </foreignObject>
    )
}