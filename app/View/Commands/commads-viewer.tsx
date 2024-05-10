"use client";

import Action from "@/app/Services/Agent/Actions/Action";
import React, {memo, useEffect, useState} from "react";
import {RiArrowRightLine, RiDragDropFill, RiDraggable} from "@remixicon/react";
import {DndContext} from "@dnd-kit/core";
import {DragEndEvent} from "@dnd-kit/core/dist/types";
import {DRAGGABLE_TYPE_ACTION, DraggableAction} from "@/app/View/Draggable/DraggableAction";
import {Droppable} from "@/app/View/Draggable/Droppable";
import ActionMoveUp from "@/app/Services/Agent/Actions/ActionMoveUp";
import {
    DRAGGABLE_TYPE_PLACEHOLDER_ACTION,
    DraggablePlaceholderAction
} from "@/app/View/Draggable/DraggablePlaceholderAction";
import {Badge} from "@/components/ui/badge";
import ActionMoveDown from "@/app/Services/Agent/Actions/ActionMoveDown";
import ActionMoveLeft from "@/app/Services/Agent/Actions/ActionMoveLeft";
import ActionMoveRight from "@/app/Services/Agent/Actions/ActionMoveRight";
import {CommandTitleDefault} from "@/app/View/Commands/command-title-default";
import {COMMAND_IF, COMMAND_JUST_EXECUTE} from "@/app/Services/Agent/Commands";
import {CommandTitleIf} from "@/app/View/Commands/command-title-if";
import {
    DRAGGABLE_TYPE_PLACEHOLDER_COMMAND,
    DraggablePlaceholderCommand
} from "@/app/View/Draggable/DraggablePlaceholderCommand";
import {DRAGGABLE_TYPE_COMMAND, DraggableCommand} from "@/app/View/Draggable/DraggableCommand";
import ActionIncrementVariable from "@/app/Services/Agent/Actions/ActionIncrementVariable";
import ActionDecrementVariable from "@/app/Services/Agent/Actions/ActionDecrementVariable";

interface Command {
    type: string,
    actions: Array<Action>
    uuid: string,
    lineNumber: number,
    isDraggable: boolean
}


export const Commands = memo(function Commands(props: {
    stack: Array<Command>,
    focusedCommandUuid: string,
    focusedActionUuid: string | number
    onDeleteAction: Function,
    onCreateAction: Function,
    onCreateCommand: Function,
    onDeleteCommand: Function,
    slotVariables: any
}) {


    const [stack, setStack] = useState(props.stack),

        methods = {

            handleDragEnd: (event: DragEndEvent) => {

                if (event.over === null && event.active.data.current?.type === DRAGGABLE_TYPE_ACTION) {
                    props.onDeleteAction(event.active.data.current?.commandIndex, event.active.data.current?.actionIndex)
                    return;
                }

                if (event.over !== null && event.active.data.current?.type === DRAGGABLE_TYPE_PLACEHOLDER_ACTION) {
                    props.onCreateAction(event.over.data.current?.commandIndex, event.active.data.current.class)
                    return
                }

                if (event.over !== null && event.active.data.current?.type === DRAGGABLE_TYPE_PLACEHOLDER_COMMAND) {

                    const nextIndex = event.over.data.current?.commandIndex + 1;

                    if (event.active.data.current.class === COMMAND_JUST_EXECUTE) {
                        if (stack[event.over.data.current?.commandIndex].type === COMMAND_JUST_EXECUTE) {
                            return;
                        }

                        if (stack.length - 1 >= nextIndex && stack[nextIndex].type === COMMAND_JUST_EXECUTE) {
                            return;
                        }
                    }

                    if (event.active.data.current.class === COMMAND_IF) {

                    }

                    props.onCreateCommand(nextIndex, event.active.data.current.class)
                    return
                }

                if (event.over === null && event.active.data.current?.type === DRAGGABLE_TYPE_COMMAND) {
                    props.onDeleteCommand(event.active.data.current?.index)

                    if (stack.length === 0) {
                        props.onCreateCommand(0, COMMAND_JUST_EXECUTE)
                    }

                    return
                }
            },
            forceUpdate: (commandI: number, isDraggable: boolean) => {

                setStack(prevState => {
                    let newState = [...prevState]
                    let command = stack[commandI];

                    command.isDraggable = isDraggable;

                    newState[commandI] = command
                    return newState
                })
            },
        }

    let lineCounter = 0;

    useEffect(() => {
        setStack(props.stack)
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


    const [actionsPlaceholders] = useState([
            {
                class: ActionMoveUp,
                title: "[do] step up"
            },
            {
                class: ActionMoveDown,
                title: "[do] Step down"
            },
            {
                class: ActionMoveLeft,
                title: "[do] Step left"
            },
            {
                class: ActionMoveRight,
                title: "[do] step right"
            },
            {
                class: ActionIncrementVariable,
                title: "[var] increment"
            },
            {
                class: ActionDecrementVariable,
                title: "[var] decrement"
            },
            {
                class: ActionMoveRight,
                title: "[do] pickup"
            }
        ]),
        [commandPlaceholders] = useState([
            {
                type: COMMAND_JUST_EXECUTE,
                title: "[command] Just Execute"
            },
            {
                type: COMMAND_IF,
                title: "[command] IF"
            }
        ]);


    return (
        <DndContext onDragEnd={methods.handleDragEnd}>


            <div className="sidebar-item sidebar-item--floated not-selectable ">
                <div className="sidebar-item sidebar-item--outlined commands-dnd">
                    <h4 className="sidebar-item-title scroll-m-20 font-medium leading-none ">
                        <RiDragDropFill
                            size={18}
                            color="#000"
                        /> Drag Me!
                    </h4>

                    <div className={`sidebar-item-body`}>
                        {actionsPlaceholders.map((actionPlaceholder, key) => {
                            return (
                                <DraggablePlaceholderAction
                                    id={actionPlaceholder.title + key}
                                    class={actionPlaceholder.class}
                                    key={actionPlaceholder.title + key}
                                    type={DRAGGABLE_TYPE_PLACEHOLDER_ACTION}
                                >

                                    <Badge variant="destructive"
                                           className="command-button command-button--blue">{actionPlaceholder.title}</Badge>
                                </DraggablePlaceholderAction>
                            )
                        })}

                        {commandPlaceholders.map((placeholder, key) => {
                            return (
                                <DraggablePlaceholderCommand
                                    id={placeholder.title + key}
                                    class={placeholder.type}
                                    key={placeholder.title + key}
                                    type={DRAGGABLE_TYPE_PLACEHOLDER_COMMAND}
                                >

                                    <Badge variant="destructive"
                                           className="command-button command-button--red">{placeholder.title}</Badge>
                                </DraggablePlaceholderCommand>
                            )
                        })}
                    </div>
                </div>

                <div className={`sidebar-item sidebar-item--outlined`}>
                    <h4 className="sidebar-item-title scroll-m-20 font-medium leading-none ">
                        <RiDraggable
                            size={18}
                            color="#000"
                        /> Your Variables
                    </h4>
                    <div className={`sidebar-item-body`}>
                        {props.slotVariables}
                    </div>
                </div>
            </div>


            <div className="sidebar-item not-selectable sidebar-item--righted">
                <div className="commands-stack">
                    {stack.map((command, i) => {

                        return (
                            <div key={command.uuid}>
                                <DraggableCommand

                                    id={`dnd-command` + command.uuid}
                                    index={i}
                                    type={DRAGGABLE_TYPE_COMMAND}
                                    isDraggable={command.isDraggable || command.isDraggable === undefined}
                                >
                                    <div className="command font-mono text-sm">

                                        <div key={command.type}
                                             className={`command-title ${command.type === COMMAND_JUST_EXECUTE ? 'command-title--hidden' : ''} ${props.focusedCommandUuid === command.uuid ? 'command-title--focused' : ''}`}>

                                            {props.focusedCommandUuid === command.uuid ? <RiArrowRightLine
                                                size={20}
                                                color="#fff"
                                                className="command-cursor"
                                            /> : ""}

                                            {command.lineNumber}

                                            {command.type === COMMAND_IF
                                                ? <CommandTitleIf
                                                    commandI={i}
                                                    statement={command.statement}
                                                    onOpen={() => methods.forceUpdate(i, false)}
                                                    onClosed={() => methods.forceUpdate(i, true)}

                                                    shouldOpenDefault={command.isDraggable !== undefined && !command.isDraggable}
                                                />
                                                : <CommandTitleDefault commandType={command.type}/>
                                            }

                                        </div>


                                        <Droppable id={`droppable` + command.uuid} commandIndex={i}>
                                            {command.actions !== undefined ? command.actions.map((action, i2) => (

                                                <DraggableAction
                                                    id={action.uuid}
                                                    command={command}
                                                    action={action}
                                                    commandIndex={i}
                                                    actionIndex={i2}
                                                    type={DRAGGABLE_TYPE_ACTION}
                                                    key={`draggable` + action.uuid}>

                                                    <div key={action.uuid}
                                                         className={`action-title ${command.type === COMMAND_JUST_EXECUTE ? 'action-title--command-style' : ''} ${props.focusedCommandUuid === command.uuid && props.focusedActionUuid === i2 ? 'action-title--focused' : ''}`}
                                                    >
                                                        {props.focusedCommandUuid === command.uuid && props.focusedActionUuid === i2 ?
                                                            <RiArrowRightLine
                                                                size={15}
                                                                color="#fff"
                                                                className="command-cursor"
                                                            /> : ""}

                                                        <span
                                                            className={`code-index`}>{command.lineNumber + i2 + 1}</span>
                                                        <span dangerouslySetInnerHTML={{__html: action.title}}/>
                                                    </div>
                                                </DraggableAction>

                                            )) : ''}

                                            {command.actions.length === 0 ?
                                                <div className={`command-droppable-zone`}>Drop here</div> : ''}

                                        </Droppable>

                                    </div>
                                </DraggableCommand>
                            </div>
                        )
                    })}
                </div>
            </div>
        </DndContext>

    );
})
