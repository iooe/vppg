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


export const Layer = ({id, x, y, width, height}: TextProps) => {

// console.log(y)
    return (

        <foreignObject  x={x} y={y} id={id} width={width} height={height}>
            {id}
        </foreignObject>
    )
}