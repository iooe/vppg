"use client";

import React from "react";
import Argument from "@/app/Services/Agent/Arguments/Argument";
import ArgumentNumber from "@/app/Services/Agent/Arguments/ArgumentNumber";
import {CommandArgumentNumberViewer} from "@/components/MyComponents/Commands/CommandArgumentViewers/command-argument-number-viewer";

export const CommandTitleFor = (props: {
    commandI: number,
    interactions: number
    onOpen: Function,
    onClosed: Function
    shouldOpenDefault: boolean
}) => {

    const methods = {
        onChangeArgument: (argument: Argument) => {

            if (argument.value < 1) {
                return
            }

            const changedProps = {
                interactions: argument.value
            }
            // @ts-ignore
            window.handlers.commands.onUpdateStatement(props.commandI, 'props', changedProps)
        }
    }


    return (

        <div className="command-title-body">
            <div>For</div>


            <div className={`statement-rule`}>


                <CommandArgumentNumberViewer
                    argumentView={<span> 1 ... {props.interactions} times</span>}
                    value={props.interactions}
                    onChange={(value: string) => methods.onChangeArgument(new ArgumentNumber(value))}
                    onOpen={props.onOpen}
                    onClosed={props.onClosed}
                    shouldOpenDefault={props.shouldOpenDefault}
                />

            </div>
            {/*<div>{props.statement. instanceof ArgumentAgentCoordinates}</div>*/}


        </div>

    );
}
