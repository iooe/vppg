import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
        data: {
            commandIndex: props.commandIndex
        }
    });
    const style = {
        opacity: isOver ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={`actions-droppable`}>
            {props.children}
        </div>
    );
}