"use client";

import Action from "@/app/Services/Agent/Actions/Action";
import React from "react";

interface Command {
    type: string,
    actions: Array<Action>

    // y: number,
    // width: number,
    // height: number,
    // layer: TextLayer;
    // onPointerDown: (e: React.PointerEvent, id: string) => void;
    // selectionColor?: string;
}

interface CommandsList {
    stack: Array<Command>

    // y: number,
    // width: number,
    // height: number,
    // layer: TextLayer;
    // onPointerDown: (e: React.PointerEvent, id: string) => void;
    // selectionColor?: string;
}

export const Commands = (stack: Array<Command>) => {

    console.log(stack.stack)

    stack.stack.map((command, i) => (
        command.actions.map((action, i2) => (

            console.log(action.key)
        ))

    ))
    return (
        <div >


            <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                {/*if   {stack.type}*/}
                {stack.stack.map((command, i) => {

                    return (
                        <div>
                            <div key={command.type}>if {command.type}</div>

                            {command.actions.map((action, i2) => (

                                <div key={i + i2} className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                                    {action.title}
                                </div>
                            ))}

                        </div>

                    )
                })}
            </div>

        </div>
    );
}
