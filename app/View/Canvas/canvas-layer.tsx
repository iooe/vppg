interface TextProps {
    id: string;
    x: number,
    y: number,
    width: number,
    height: number,
    // layer: TextLayer;
    // onPointerDown: (e: React.PointerEvent, id: string) => void;
    // selectionColor?: string;
};
import Image from 'next/image';

import src from './../../Images/floor.jpg';

export const CanvasLayer = ({id, x, y, width, height}: TextProps) => {

// console.log(y)
    return (

        <foreignObject x={x} y={y} id={id} width={width} height={height}>
            <div className={"canvas-layer"}>
                {/*#{id}*/}
                <Image className={'canvas-layer-background'} src={src} alt={''}/>

            </div>
        </foreignObject>
    )
}