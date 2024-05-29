import {RiRobot2Line} from "@remixicon/react";
import React from "react";
import Image from "next/image";

interface TextProps {
    id: string;
    x: number,
    y: number,
    width: number,
    height: number,
    // layer: TextLayer;
    // onPointerDown: (e: React.PointerEvent, id: string) => void;
    // selectionColor?: string;
}

import src from '../../../../app/Images/textures/robot.png';


export const CanvasAgent = ({id, x, y, width, height}: TextProps) => {

    return (

        <foreignObject  x={x} y={y} id={id} width={width} height={height}>
            <div className={"canvas-agent"}>
                {/*<RiRobot2Line*/}
                {/*    size={24}*/}
                {/*    color="#000"*/}
                {/*    className="command-title-icon"*/}
                {/*/>*/}

                <Image className={'canvas-layer-background'} src={src} alt={''}/>

            </div>
        </foreignObject>
    )
}