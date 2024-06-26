"use client";

import {RiRobot2Line} from "@remixicon/react";
import React from "react";
import Statement from "@/app/Services/Statement/Statement";
import {VARIABLE_TYPE_BOOLEAN, VARIABLE_TYPE_NUMBER, VARIABLE_TYPE_STRING} from "@/app/Services/Variable/Variable";
import {
    CommandArgumentVariablesViewer
} from "@/components/MyComponents/Commands/CommandArgumentViewers/command-argument-variables-viewer";
import Argument from "@/app/Services/Agent/Arguments/Argument";
import ArgumentBoolean from "@/app/Services/Agent/Arguments/ArgumentBoolean";
import {CommandArgumentBooleanViewer} from "@/components/MyComponents/Commands/CommandArgumentViewers/command-argument-boolean-viewer";
import ArgumentVariable from "@/app/Services/Agent/Arguments/ArgumentVariable";
import ArgumentString from "@/app/Services/Agent/Arguments/ArgumentString";
import ArgumentAgentCoordinates from "@/app/Services/Agent/Arguments/ArgumentAgentCoordinates";
import ArgumentCoordinates from "@/app/Services/Agent/Arguments/ArgumentCoordinates";
import {CommandArgumentStringViewer} from "@/components/MyComponents/Commands/CommandArgumentViewers/command-argument-string-viewer";
import ArgumentNumber from "@/app/Services/Agent/Arguments/ArgumentNumber";
import MasterRule from "@/app/Services/Agent/Rules/MasterRule";
import {CommandArgumentRuleViewer} from "@/components/MyComponents/Commands/CommandArgumentViewers/command-argument-rule-viewer";
import {CommandArgumentNumberViewer} from "@/components/MyComponents/Commands/CommandArgumentViewers/command-argument-number-viewer";

export const CommandTitleIf = (props: {
    commandI: number,
    statement: Statement
    onOpen: Function,
    onClosed: Function
    shouldOpenDefault: boolean
}) => {

    const methods = {
            onChangeRule: (rule: MasterRule) => {
                const changedStatement = props.statement;
                changedStatement.rule = rule
                // @ts-ignore
                window.handlers.commands.onUpdateStatement(props.commandI, 'statement', changedStatement)
            },
            getArgumentView: (argument: Argument) => {
                switch (argument.constructor) {
                    case ArgumentAgentCoordinates:
                        return <div><RiRobot2Line
                            size={24}
                            color="#000"
                            className="command-title-icon"
                        /></div>
                    case ArgumentCoordinates:
                        return <span>[{argument.getSource().getX()}:{argument.getSource().getY()}]</span>
                    case ArgumentVariable:

                        if (!argument.hasSource()) {
                            return <span>var UNDEFINED</span>
                        }

                        return <span>var {argument.getSource().key}</span>
                    case ArgumentBoolean:
                        return <span>{argument.value.toString()}</span>
                    case ArgumentString:
                        return <span>{argument.value}</span>
                    case ArgumentNumber:
                        return <span>{argument.value}</span>
                    default:
                        return <span>DEFAULT RENDER</span>
                }
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
                window.handlers.commands.onUpdateStatement(props.commandI, 'statement', changedStatement)
            },
            onChangeArgumentB: (argumentB: Argument) => {

                const changedStatement = props.statement;
                changedStatement.updateArguments(changedStatement.argumentA, argumentB)
                // @ts-ignore
                window.handlers.commands.onUpdateStatement(props.commandI, 'statement', changedStatement)
            }
        },
        argumentA = methods.getArgumentView(props.statement.argumentA),
        argumentB = methods.getArgumentView(props.statement.argumentB);


    return (

        <div className="command-title-body">
            <div>If</div>


            <div className={`statement-rule`}>
                {/*<span>{argumentA}</span>*/}

                {props.statement.argumentA instanceof ArgumentVariable ?
                    <CommandArgumentVariablesViewer
                        argumentView={argumentA}
                        argument={props.statement.argumentA}
                        onChange={methods.onChangeArgumentA}
                        onOpen={props.onOpen}
                        onClosed={props.onClosed}
                        shouldOpenDefault={props.shouldOpenDefault}
                    />
                    : ''}


                <CommandArgumentRuleViewer
                    view={<span style={{margin: "0 5px"}}> {props.statement.rule.key} </span>}
                    ruleKey={props.statement.rule.key}
                    onChange={methods.onChangeRule}
                    onOpen={props.onOpen}
                    onClosed={props.onClosed}
                    shouldOpenDefault={props.shouldOpenDefault}
                />

                {props.statement.argumentB instanceof ArgumentBoolean ?
                    <CommandArgumentBooleanViewer
                        argumentView={argumentB}
                        argument={props.statement.argumentB}
                        onChange={methods.onChangeArgumentB}
                        onOpen={props.onOpen}
                        onClosed={props.onClosed}
                        shouldOpenDefault={props.shouldOpenDefault}
                    />
                    : ''}

                {props.statement.argumentB instanceof ArgumentString ?
                    <CommandArgumentStringViewer
                        argumentView={argumentB}
                        value={props.statement.argumentB.value}
                        onChange={(value: string) => methods.onChangeArgumentB(new ArgumentString(value))}
                        onOpen={props.onOpen}
                        onClosed={props.onClosed}
                        shouldOpenDefault={props.shouldOpenDefault}
                    />
                    : ''}


                {props.statement.argumentB instanceof ArgumentNumber ?
                    <CommandArgumentNumberViewer
                        argumentView={argumentB}
                        value={props.statement.argumentB.value}
                        onChange={(value: string) => methods.onChangeArgumentB(new ArgumentNumber(value))}
                        onOpen={props.onOpen}
                        onClosed={props.onClosed}
                        shouldOpenDefault={props.shouldOpenDefault}
                    />
                    : ''}
            </div>
            {/*<div>{props.statement. instanceof ArgumentAgentCoordinates}</div>*/}


        </div>

    );
}
