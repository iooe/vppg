import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';

export const Example = ({}) => {
    const [parent, setParent] = useState(null);
    const draggable = (
        <Draggable id="draggable">
            Go ahead, drag me.
        </Draggable>
    );

    return (
       <div style={{left: "40%",
           position: "relative"}}>
           <DndContext onDragEnd={handleDragEnd}>
               {!parent ? draggable : null}
               <Droppable id="droppable">
                   {parent === "droppable" ? draggable : 'Drop here'}
               </Droppable>
           </DndContext>
       </div>
    );

    function handleDragEnd({over}) {
        setParent(over ? over.id : null);
    }
}