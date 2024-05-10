import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import Action from "../../Services/Agent/Actions/Action";

export const DRAGGABLE_TYPE_COMMAND = 'command';
export function DraggableCommand(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data: {
            index: props.index,
            type: props.type
        },
        disabled: !props.isDraggable
    });
    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}    disabled={true}>
            {props.children}
        </div>
    );
}