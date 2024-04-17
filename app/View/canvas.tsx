"use client";

import {Layer} from "@/app/View/Canvas/layer";
import {Agent} from "@/app/View/Canvas/agent";
import React, {useEffect, useState} from "react";
import AgentData from "@/app/Services/Agent/AgentData";
import ActionMoveDown from "@/app/Services/Agent/Actions/ActionMoveDown";
import ActionMoveRight from "@/app/Services/Agent/Actions/ActionMoveRight";
import CanvasData from "@/app/Services/CanvasData";
import Action from "@/app/Services/Agent/Actions/Action";
import {Commands} from "@/app/View/Commands/commads";
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

    const [commandsViewerUuid, updateUuid] = useState(uuidv4())
    const canvasData = new CanvasData(5, 5);

    const agent1 = new AgentData("agent1")
    agent1.height = 50;
    agent1.width = 50;

    const [hasChanges, setHasChanges] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const [controlButtonText, setControlButtonText] = useState("Start");
    const [hasChangesUuid, setHasChangesUuid] = useState(false);

    const [agents, setAgents] = useState<[Agent]>(
        [
            {
                position: {
                    x: 0,
                    y: 0,
                },
                agentData: agent1,
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
                            new ActionMoveRight(),
                            new ActionMoveRight()
                        ]
                    },
                    {
                        uuid: uuidv4(),
                        type: COMMAND_JUST_EXECUTE,
                        actions: [
                            new ActionMoveDown(),
                            new ActionMoveDown()
                        ]
                    },
                ]
            }
        ]
    );


    const process = async (counter: number) => {
        setIsRunning(false)
        console.log(isRunning)
        setHasChanges(false)

        for (let agentI = 0; agentI <= agents.length - 1; agentI++) {
            let agent = agents[agentI];
            let iCounter = 0;

            if (isRunning) {
                for await (let stack of agent.stack) {
                    console.log("stack started " + iCounter)

                    const executeCommandPromise = new Promise(async (resolve, reject) => {
                        if (stack.type === COMMAND_IF) {
                            stack.statement.updateData(agent.agentData)
                        }

                        if (stack.type === COMMAND_IF && stack.statement.verify()) {
                            let actionCounter = 0;

                            for await (let action of stack.actions) {



                                agent.focused.commandUuid = stack.uuid
                                agent.focused.actionUuid = actionCounter

                                const bbb = new Promise((resolve, reject) => {
                                    const instance: Action = action;
                                    instance.init(agent.agentData, canvasData)

                                    if (instance.isExecutable()) {
                                        setHasChanges(true)
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

                                agent.focused.commandUuid = stack.uuid
                                agent.focused.actionUuid = actionCounter

                                const bbb = new Promise((resolve, reject) => {
                                    const instance: Action = action;
                                    instance.init(agent.agentData, canvasData)

                                    if (instance.isExecutable()) {
                                        setHasChanges(true)
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
                                    const instance: Action = action;
                                    instance.init(agent.agentData, canvasData)

                                    if (instance.isExecutable()) {
                                        setHasChanges(true)
                                        // instance.execute()
                                    }
                                })
                            }
                        }

                        console.log('stack completed ' + iCounter)

                        setTimeout(() => {
                            resolve(true)
                        }, 2000)
                    });

                    await executeCommandPromise.then(() => iCounter++)
                }
            }

            if (agentI === agents.length - 1 && counter !== 100) {
                setTimeout(() =>
                        process(++counter),
                    1000)
            }
        }
    }
    useEffect(() => {


        return () => {
            process(0).then(r => {
            });
            return;
        }

    }, [isRunning, process])

    const onClick = () => {

        setIsRunning(!isRunning)

        if (isRunning) {
            setControlButtonText("Start")
        } else {
            setControlButtonText("Stop and Reset")
        }
    }

    const onDeleteHandler = (commandI: number, actionI: number) => {
        let agentI: number = 0;
        let agent = agents[agentI],
            actions = agents[agentI].stack[commandI].actions;

        actions.splice(actionI, 1)

        agent.stack[commandI].actions = actions;

        console.log(agent.stack[commandI])

        setAgents(prevState => {
            // modifiedAgents
            let newState = [...prevState]
            newState[agentI] = agent
            return newState
        })

        updateUuid(uuidv4())
    }

    const onCreateHandler = (commandI: number, action: Action) => {

        console.log()

        let agentI: number = 0;
        let agent = agents[agentI],
            actions = agents[agentI].stack[commandI].actions;

        actions.push(new action())

        agent.stack[commandI].actions = actions;

        setAgents(prevState => {
            // modifiedAgents
            let newState = [...prevState]
            newState[agentI] = agent
            return newState
        })

        updateUuid(uuidv4())
    }
    return (
        <div>
            <svg
                className="h-[100vh] w-[100vw] canvas"
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

            <div className="sidebar">
                <button onClick={onClick}>{controlButtonText}</button>
                <div>
                    {!hasChanges ? "PROBLEM! infinite loop" : ""}
                </div>

                {agents.map((agent, y) => (
                    <Commands
                        key={commandsViewerUuid}
                        stack={agent.stack}
                        focusedCommandUuid={agent.focused.commandUuid}
                        focusedActionUuid={agent.focused.actionUuid}
                        onDelete={onDeleteHandler}
                        onCreate={onCreateHandler}
                    />

                ))}
            </div>
        </div>
    );
}
