"use client";

import {RiRobot2Line} from "@remixicon/react";
import React from "react";
import Statement from "@/app/Services/Statement/Statement";
import {VARIABLE_TYPE_BOOLEAN, VARIABLE_TYPE_NUMBER, VARIABLE_TYPE_STRING} from "@/app/Services/Variable/Variable";
import {
    CommandArgumentVariablesViewer
} from "@/app/View/Commands/CommandArgumentViewers/command-argument-variables-viewer";
import Argument from "@/app/Services/Agent/Arguments/Argument";
import ArgumentBoolean from "@/app/Services/Agent/Arguments/ArgumentBoolean";
import {CommandArgumentBooleanViewer} from "@/app/View/Commands/CommandArgumentViewers/command-argument-boolean-viewer";
import ArgumentVariable from "@/app/Services/Agent/Arguments/ArgumentVariable";
import ArgumentString from "@/app/Services/Agent/Arguments/ArgumentString";
import ArgumentAgentCoordinates from "@/app/Services/Agent/Arguments/ArgumentAgentCoordinates";
import ArgumentCoordinates from "@/app/Services/Agent/Arguments/ArgumentCoordinates";
import {CommandArgumentStringViewer} from "@/app/View/Commands/CommandArgumentViewers/command-argument-string-viewer";
import ArgumentNumber from "@/app/Services/Agent/Arguments/ArgumentNumber";
import MasterRule from "@/app/Services/Agent/Rules/MasterRule";
import {CommandArgumentRuleViewer} from "@/app/View/Commands/CommandArgumentViewers/command-argument-rule-viewer";
import {CommandArgumentNumberViewer} from "@/app/View/Commands/CommandArgumentViewers/command-argument-number-viewer";

export const CommandTitleFor = (props: {
    commandI: number,
    interactions: number
    onOpen: Function,
    onClosed: Function
    shouldOpenDefault: boolean
}) => {

    const methods = {
            onChangeRule: (rule: MasterRule) => {
                const changedStatement = props.statement;
                changedStatement.rule = rule
                // @ts-ignore
                window.handlers.commands.onUpdateStatement(props.commandI, changedStatement)
            },
            onChangeArgumentA: (argumentA: Argument) => {
                const changedStatement = props.statement;
                let argumentB = changedStatement.argumentB;

                if (argumentA instanceof ArgumentVariable) {

                    if (argumentA.getSource().type === VARIABLE_TYPE_BOOLEAN) {
                        argumentB = new ArgumentBoolean(true)
                    }

                    if (argumentA.getSource().type === VARIABLE_TYPE_STRING) {
                        argumentB = new ArgumentString('type your string here')
                    }

                    if (argumentA.getSource().type === VARIABLE_TYPE_NUMBER) {
                        argumentB = new ArgumentNumber(0)
                    }
                }

                changedStatement.updateArguments(argumentA, argumentB)
                // @ts-ignore
                window.handlers.commands.onUpdateStatement(props.commandI, changedStatement)
            },
            onChangeArgumentB: (argumentB: Argument) => {

                const changedStatement = props.statement;
                changedStatement.updateArguments(changedStatement.argumentA, argumentB)
                // @ts-ignore
                window.handlers.commands.onUpdateStatement(props.commandI, changedStatement)
            }
        }


    return (

        <div className="command-title-body">
            <div>For</div>


            <div className={`statement-rule`}>




                    <CommandArgumentNumberViewer
                        argumentView={<span> 1 ... {props.interactions} times</span>}
                        value={props.interactions}
                        onChange={(value: string) => methods.onChangeArgumentB(new ArgumentNumber(value))}
                        onOpen={props.onOpen}
                        onClosed={props.onClosed}
                        shouldOpenDefault={props.shouldOpenDefault}
                    />

            </div>
            {/*<div>{props.statement. instanceof ArgumentAgentCoordinates}</div>*/}


        </div>

    );
}
