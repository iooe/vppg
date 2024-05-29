interface TextProps {
    id: string;
    x: number,
    y: number,
    width: number,
    height: number,
    tile: StaticImageData,
    // layer: TextLayer;
    // onPointerDown: (e: React.PointerEvent, id: string) => void;
    // selectionColor?: string;
}

import Image, {StaticImageData} from 'next/image';

// import src from '../../../../app/Images/background/floor.jpg';

export const CanvasLayer = ({id, x, y, width, height, tile}: TextProps) => {

// console.log(y)
    return (

        <foreignObject x={x} y={y} id={id} width={width} height={height}>
            <div className={"canvas-layer"}>
                {/*#{id}*/}
                <Image className={'canvas-layer-background'} src={tile} alt={''}/>

            </div>
        </foreignObject>
    )
}