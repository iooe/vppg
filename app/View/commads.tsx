"use client";

import Action from "@/app/Services/Agent/Actions/Action";
import React, {memo, useEffect, useState} from "react";

interface Command {
    type: string,
    actions: Array<Action>
    uuid: string
    // y: number,
    // width: number,
    // height: number,
    // layer: TextLayer;
    // onPointerDown: (e: React.PointerEvent, id: string) => void;
    // selectionColor?: string;
}


export const Commands = memo(function Commands(props: {stack: Array<Command>, focusedCommandUuid: string, focusedActionUuid: string|number}) {

    const [focusedUuid, setFocusedUuid] = useState(props.focusedCommandUuid)


    // props.stack.forEach((command, i) => (
    //     command.actions.forEach((action, i2) => (
    //
    //
    //        console.log()
    //     ))
    //
    // ))
    return (
        <div >

            <div className="">
                {props.stack.map((command, i) => {

                    return (
                        <div className="rounded-md px-4 py-2 font-mono text-sm shadow-sm " key={command.uuid}>

                            <div key={command.type} className={`${props.focusedCommandUuid === command.uuid ? 'bg-red-500' : ''}`}>command {command.type}</div>

                            {command.actions.map((action, i2) => (

                                <div key={i + i2}
                                     className={`rounded-md border px-4 py-2 font-mono text-sm shadow-sm ${props.focusedCommandUuid === command.uuid && props.focusedActionUuid === i2 ? 'bg-red-500' : ''}`}
                                >
                                    {i2}
                                    {action.title}
                                </div>
                            ))}

                        </div>
                    )
                })}
            </div>
        </div>
    );
})
