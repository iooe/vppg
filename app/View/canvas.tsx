"use client";

import {Layer} from "@/app/View/Canvas/layer";
import {Agent} from "@/app/View/Canvas/agent";
import React, {useEffect, useState} from "react";
import AgentData from "@/app/Services/Agent/AgentData";
import ActionMoveDown from "@/app/Services/Agent/Actions/ActionMoveDown";
import ActionMoveUp from "@/app/Services/Agent/Actions/ActionMoveUp";
import ActionMoveLeft from "@/app/Services/Agent/Actions/ActionMoveLeft";
import ActionMoveRight from "@/app/Services/Agent/Actions/ActionMoveRight";
import CanvasData from "@/app/Services/CanvasData";
import Action from "@/app/Services/Agent/Actions/Action";
import Statement from "@/app/Services/Statement/Statement";
import ArgumentAgentCoordinates from "@/app/Services/Agent/Arguments/ArgumentAgentCoordinates";
import {Button} from "@/components/ui/button";
import {Commands} from "@/app/View/commads";

interface Agent {
    position: {
        x: number,
        y: number
    },
    currentCommand: string,
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
                    stack: [
                        {
                            type: "none",
                            actions: [
                                ActionMoveRight
                            ]
                        },
                        // {
                        //     type: "if",
                        //     statement: {
                        //         argumentA: "agent_position",
                        //         argumentB: {x: 5, y: 5},
                        //         symbol: "<="
                        //     },
                        //     actions: [
                        //         ActionMoveRight
                        //     ]
                        // },
                        {
                            type: "if",
                            statement: {
                                argumentA: "agent_position_right",
                                argumentB: "wall",
                                symbol: "==="
                            },
                            actions: [
                                ActionMoveDown
                            ]
                        }
                    ]
                }
            ]

    );

    // new Statement(new ArgumentAgentCoordinates(agent1))

    useEffect(() => {
        const intervalId = setInterval(() => {


            const modifiedAgents =  agents.map( (agent) => {


                agent.stack.map((stack) => {
                    if(stack.type === "if") {

                            if(
                                (stack.statement.argumentA === "agent_position" &&
                                    ((stack.statement.symbol === "<=" && agent.agentData.coordinateX <= stack.statement.argumentB.x
                                            && agent.agentData.coordinateY<= stack.statement.argumentB.y)
                                        || (stack.statement.symbol === "===" && agent.agentData.coordinateX === stack.statement.argumentB.x
                                            && agent.agentData.coordinateY=== stack.statement.argumentB.y)

                                        || (stack.statement.symbol === ">=" && agent.agentData.coordinateX >= stack.statement.argumentB.x
                                            && agent.agentData.coordinateY>= stack.statement.argumentB.y))
                                )

                                || (stack.statement.argumentA === "agent_position_right" && (
                                    (stack.statement.argumentB === "wall" && ((agent.agentData.coordinateX + 1) >= canvasData.sizeX))
                                ))
                            ) {
                                    stack.actions.map((action: Action) => {
                                        agent.currentCommand = action.title
                                        const instance = (new action(agent.agentData, canvasData));

                                        if(instance.isExecutable()) {
                                            instance.execute()
                                        }
                                    })
                            }

                    }



                    if(stack.type === "none") {
                        stack.actions.map((action: Action) => {
                            agent.currentCommand = action.title
                            const instance = (new action(agent.agentData, canvasData));

                            if(instance.isExecutable()) {
                                instance.execute()
                            }
                        })
                    }

                    if(stack.type === "for") {
                        for (let i = 0; i <= stack.props.interactions - 1; i++) {
                            stack.actions.map((action: Action) => {
                                agent.currentCommand = action.title
                                const instance = (new action(agent.agentData, canvasData));

                                if(instance.isExecutable()) {
                                    instance.execute()
                                }
                            })
                        }
                    }
                })


                return agent;
            })

            setAgents(modifiedAgents)
        }, 1000);

        return () => clearInterval(intervalId)

    })


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
                            x={agent.agentData.coordinateX * xMultiplierModifier} y={agent.agentData.coordinateY * yMultiplierModifier}
                            width={agent.agentData.width}
                            height={agent.agentData.height}
                        />
                    ))}


                    {[...Array(canvasData.sizeX)].map((i, x) =>
                        [...Array(canvasData.sizeY)].map((i, y) =>
                            <Layer id={x.toString() + y.toString()} x={x * xMultiplierModifier} y={y * yMultiplierModifier} key={x + y} width={size} height={size}/>
                        )
                    )}
                </g>
            </svg>


            <div style={{
                position: "absolute",
                right: "20%",
                top: "20%"
            }}>

                {agents.map((agent, y) => (
                    // eslint-disable-next-line react/jsx-key
                    <div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                            current: {agent.currentCommand}
                        </div>

                        <Commands stack={agent.stack}/>
                    </div>
                ))}

                {/*<Button>Click me</Button>*/}


            </div>
        </div>
    );
}
