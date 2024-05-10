import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import Action from "../../Services/Agent/Actions/Action";

export const DRAGGABLE_TYPE_PLACEHOLDER_COMMAND = 'placeholder-command';
export function DraggablePlaceholderCommand(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data: {
            class: props.class,
            type: props.type
        },
    });
    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
    };

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}