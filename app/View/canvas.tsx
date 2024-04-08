"use client";

import {Layer} from "@/app/View/Canvas/layer";
import {Agent} from "@/app/View/Canvas/agent";
import React, {useEffect, useState} from "react";
import AgentData from "@/app/Services/Agent/AgentData";
import ActionMoveDown from "@/app/Services/Agent/Actions/ActionMoveDown";
import ActionMoveRight from "@/app/Services/Agent/Actions/ActionMoveRight";
import CanvasData from "@/app/Services/CanvasData";
import Action from "@/app/Services/Agent/Actions/Action";
import {Commands} from "@/app/View/commads";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import Statement from "@/app/Services/Statement/Statement";
import ArgumentAgentCoordinates from "@/app/Services/Agent/Arguments/ArgumentAgentCoordinates";
import ArgumentCoordinates from "@/app/Services/Agent/Arguments/ArgumentCoordinates";
import Coordinates from "@/app/Services/Data/Coordinates";
import MasterRule, {RULE_LESS_OR_EQUAL} from "@/app/Services/Agent/Rules/MasterRule";
import {COMMAND_FOR, COMMAND_IF, COMMAND_JUST_EXECUTE} from "@/app/Services/Agent/Commands";
import {v4 as uuidv4} from 'uuid';

interface Agent {
    position: {
        x: number,
        y: number
    },
    currentCommand: string,
    focused: {
        commandUuid: string,
        actionUuid: string | number
    },
    agentData: AgentData,
    stack: Array<any>
}

export const Canvas = ({}) => {

    const size = 100,
        xMultiplierModifier = 100,
        yMultiplierModifier = 100;

    const canvasData = new CanvasData(5, 5);

    const agent1 = new AgentData("agent1")
    agent1.height = 50;
    agent1.width = 50;

    const [agents, setAgents] = useState<[Agent]>(
        [
            {
                position: {
                    x: 0,
                    y: 0,
                },
                agentData: agent1,
                currentCommand: "none",
                focused: {
                    commandUuid: 'none',
                    actionUuid: 'none'
                },
                stack: [
                    {
                        uuid: uuidv4(),
                        type: COMMAND_IF,
                        statement: new Statement(
                            new ArgumentAgentCoordinates(),
                            new ArgumentCoordinates(new Coordinates(11, 11)),
                            new MasterRule(RULE_LESS_OR_EQUAL)
                        ),
                        actions: [
                            ActionMoveRight,
                            ActionMoveRight
                        ]
                    },
                    {
                        uuid: uuidv4(),
                        type: COMMAND_JUST_EXECUTE,
                        actions: [
                            ActionMoveDown,
                            ActionMoveDown
                        ]
                    },
                ]
            }
        ]
    );

    useEffect(() => {
        const process = async (counter: number) => {

            for (let agentI = 0; agentI <= agents.length - 1; agentI++) {
                let agent = agents[agentI];

                let iCounter = 0;

                for await (let stack of agent.stack) {
                    console.log("stack started " + iCounter)

                    const executeCommandPromise = new Promise(async (resolve, reject) => {
                        if (stack.type === COMMAND_IF) {
                            stack.statement.updateData(agent.agentData)
                        }

                        if (stack.type === COMMAND_IF && stack.statement.verify()) {
                            let actionCounter = 0;

                            for await (let action of stack.actions) {
                                agent.currentCommand = action.title
                                agent.focused.commandUuid = stack.uuid
                                agent.focused.actionUuid = actionCounter

                                const bbb = new Promise((resolve, reject) => {
                                    const instance: Action = (new action(agent.agentData, canvasData));

                                    if (instance.isExecutable()) {
                                        agent.agentData = instance.execute()
                                    }

                                    setAgents(prevState => {
                                        // modifiedAgents
                                        let newState = [...prevState]
                                        newState[agentI] = agent
                                        return newState
                                    })

                                    console.log("stack  " + iCounter + " action " + actionCounter + " completed")

                                    setTimeout(() => {
                                        resolve(true)
                                    }, 500)
                                })

                                await bbb.then(() => {
                                    actionCounter++
                                })
                            }
                        }

                        if (stack.type === COMMAND_JUST_EXECUTE) {
                            let actionCounter = 0;

                            for await (let action of stack.actions) {

                                agent.currentCommand = action.title
                                agent.focused.commandUuid = stack.uuid
                                agent.focused.actionUuid = actionCounter

                                const bbb = new Promise((resolve, reject) => {
                                    const instance: Action = (new action(agent.agentData, canvasData));

                                    if (instance.isExecutable()) {
                                        agent.agentData = instance.execute()
                                    }


                                    setAgents(prevState => {
                                        // modifiedAgents
                                        let newState = [...prevState]
                                        newState[agentI] = agent
                                        return newState
                                    })

                                    console.log("stack  " + iCounter + " action " + actionCounter + " completed")

                                    setTimeout(() => {
                                        resolve(true)
                                    }, 500)
                                })

                                await bbb.then(() => {
                                    actionCounter++
                                })
                            }
                        }

                        if (stack.type === COMMAND_FOR) {
                            for (let i = 0; i <= stack.props.interactions - 1; i++) {
                                stack.actions.map((action: Action) => {
                                    agent.currentCommand = action.title
                                    const instance = (new action(agent.agentData, canvasData));

                                    if (instance.isExecutable()) {
                                        // instance.execute()
                                    }
                                })
                            }
                        }

                        console.log('stack completed ' + iCounter)

                        setTimeout(() => {
                            resolve(true)
                        }, 1000)
                    });

                    await executeCommandPromise.then(() => iCounter++)
                }

                if (agentI === agents.length - 1 && counter !== 100) {
                    setTimeout(() => process(++counter), 1000)
                }
            }
        }

        return () => {
            process(0).then(r => {
            });
            return;
        }

    }, [])


    return (
        <div>
            <svg
                className="h-[100vh] w-[100vw]"
            >
                <g
                    style={{
                        transform: "translateX(100px) translateY(100px)",
                    }}
                >


                    {agents.map((agent, y) => (
                        <Agent
                            key={agent.agentData.id}
                            id={agent.agentData.id}
                            x={agent.agentData.coordinateX * xMultiplierModifier}
                            y={agent.agentData.coordinateY * yMultiplierModifier}
                            width={agent.agentData.width}
                            height={agent.agentData.height}
                        />
                    ))}


                    {[...Array(canvasData.sizeX)].map((i, x) =>
                        [...Array(canvasData.sizeY)].map((i, y) =>
                            <Layer id={x.toString() + y.toString()} x={x * xMultiplierModifier}
                                   y={y * yMultiplierModifier} key={x + y} width={size} height={size}/>
                        )
                    )}
                </g>
            </svg>


            <div style={{
                position: "absolute",
                right: "20%",
                top: "20%",
                width: "300px"
            }}>
                <Alert>
                    <AlertTitle>Message</AlertTitle>
                    <AlertDescription>
                        You can add components and dependencies to your app using the cli.
                    </AlertDescription>
                </Alert>

                {agents.map((agent, y) => (
                    // eslint-disable-next-line react/jsx-key
                    <div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                            current: {agent.currentCommand}
                        </div>
                        <Commands stack={agent.stack} focusedCommandUuid={agent.focused.commandUuid}
                                  focusedActionUuid={agent.focused.actionUuid}/>
                    </div>
                ))}

                {/*<Button>Click me</Button>*/}


            </div>
        </div>
    );
}
