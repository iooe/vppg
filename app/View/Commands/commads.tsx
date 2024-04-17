"use client";

import Action from "@/app/Services/Agent/Actions/Action";
import React, {memo, useEffect, useState} from "react";
import {RiArrowRightLine} from "@remixicon/react";
import {DndContext} from "@dnd-kit/core";
import {DragEndEvent} from "@dnd-kit/core/dist/types";
import {Draggable2} from "@/app/View/Draggable/Draggable2";
import {Droppable} from "@/app/View/Draggable/Droppable";
import ActionMoveUp from "@/app/Services/Agent/Actions/ActionMoveUp";
import {DraggableNewAction} from "@/app/View/Draggable/DraggableNewAction";
import {Badge} from "@/components/ui/badge";
import ActionMoveDown from "@/app/Services/Agent/Actions/ActionMoveDown";
import ActionMoveLeft from "@/app/Services/Agent/Actions/ActionMoveLeft";
import ActionMoveRight from "@/app/Services/Agent/Actions/ActionMoveRight";
import {CommandTitleDefault} from "@/app/View/Commands/command-title-default";
import {COMMAND_IF} from "@/app/Services/Agent/Commands";
import {CommandTitleIf} from "@/app/View/Commands/command-title-if";
import {SortableContext} from '@dnd-kit/sortable';
import {SortableItem} from "@/app/View/Draggable/SortableItem";
interface Command {
    type: string,
    actions: Array<Action>
    uuid: string,
    lineNumber: number
    // y: number,
    // width: number,
    // height: number,
    // layer: TextLayer;
    // onPointerDown: (e: React.PointerEvent, id: string) => void;
    // selectionColor?: string;
}


export const Commands = memo(function Commands(props: {
    stack: Array<Command>,
    focusedCommandUuid: string,
    focusedActionUuid: string | number
    onDelete: Function,
    onCreate: Function
}) {

    const [stack, setFocusedUuid] = useState(props.stack)

    let lineCounter = 0;

    useEffect(() => {
        setFocusedUuid(props.stack)
    }, [props.stack]);

    props.stack.forEach((command, i) => {
        if (lineCounter === 0) {
            lineCounter++;
        } else {
            if (props.stack[i - 1].actions === undefined) {
                return
            }

            lineCounter = props.stack[i - 1].actions.length + lineCounter + 1;
        }

        command.lineNumber = lineCounter;
    })

    const [parent, setParent] = useState(null);

    function handleDragEnd(event: DragEndEvent) {


        if (event.over === null && event.active.data.current?.type !== 'placeholder') {
            props.onDelete(event.active.data.current?.commandIndex, event.active.data.current?.actionIndex)
        }

        if (event.over !== null && event.active.data.current?.type === 'placeholder') {

            props.onCreate(event.over.data.current?.commandIndex, event.active.data.current.class)
            return
        }
    }

    const [actionsPlaceholders] = useState([
        {
            class: ActionMoveUp,
            title: "step up"
        },
        {
            class: ActionMoveDown,
            title: "Step down"
        },
        {
            class: ActionMoveLeft,
            title: "step left"
        },
        {
            class: ActionMoveRight,
            title: "step right"
        }
    ]);




    const [items] = useState([1, 2, 3]);

    return (


        <DndContext onDragEnd={handleDragEnd}>




         {/*   <SortableContext items={items}>*/}
         {/*<SortableItem/>*/}
         {/*   </SortableContext>*/}


            <div className="command-buttons">
                {actionsPlaceholders.map((actionPlaceholder) => {
                    return (
                        <DraggableNewAction
                            id={actionPlaceholder.title}
                            class={actionPlaceholder.class}
                            key={actionPlaceholder.title}
                            type={`placeholder`}
                        >

                            <Badge variant="destructive"
                                   className=" command-button command-button--blue">{actionPlaceholder.title}</Badge>
                        </DraggableNewAction>
                    )
                })}
            </div>
            <div className="sidebar-item">
                <div className="commands-stack">
                    {stack.map((command, i) => {

                        return (
                            <div className="command font-mono text-sm" key={command.uuid}>

                                <div key={command.type}
                                     className={`command-title ${props.focusedCommandUuid === command.uuid ? 'command-title--focused1' : ''}`}>


                                    {props.focusedCommandUuid === command.uuid ? <RiArrowRightLine
                                        size={20}
                                        color="#000"
                                        className="command-cursor"
                                    /> : ""}

                                    {command.lineNumber}

                                    {command.type === COMMAND_IF ? <CommandTitleIf statement={command.statement}/> : <CommandTitleDefault commandType={command.type}/>}
                                </div>



                                <Droppable id={`droppable` + command.uuid} commandIndex={i}>
                                    {command.actions !== undefined ? command.actions.map((action, i2) => (

                                        // eslint-disable-next-line react/jsx-key
                                        <div>
                                            <Draggable2 id={action.uuid} command={command} action={action} commandIndex={i}
                                                        actionIndex={i2} key={`draggable` + action.uuid}>

                                                <div key={action.uuid}
                                                     className={`action-title ${props.focusedCommandUuid === command.uuid && props.focusedActionUuid === i2 ? 'action-title--focused1' : ''}`}
                                                >
                                                    {props.focusedCommandUuid === command.uuid && props.focusedActionUuid === i2 ?
                                                        <RiArrowRightLine
                                                            size={15}
                                                            color="#000"
                                                            className="command-cursor"
                                                        /> : ""}

                                                    {command.lineNumber + i2 + 1} {action.title}
                                                </div>
                                            </Draggable2>
                                        </div>
                                    )) : ''}

                                    {command.actions.length === 0 ? <div className={`command-droppable-zone`}>Drop here</div> : ''}

                                </Droppable>

                            </div>
                        )
                    })}
                </div>
            </div>
        </DndContext>

    );
})
