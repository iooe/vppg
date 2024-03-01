"use client";

import {Layer} from "@/app/Services/Board/layer";
import {Player} from "@/app/Services/Board/player";
import {useEffect, useState} from "react";

interface CanvasData {
    sizeX: number,
    sizeY: number,
}

interface Agent {
    id: string,
    width: number,
    height: number,
    position: {
        x: number,
        y: number
    },
    stack: Array<any>
}

export const Canvas = ({}) => {

    const size = 100,
        xMultiplierModifier = 100,
        yMultiplierModifier = 100;

    const canvasData: CanvasData = {
        sizeX: 5,
        sizeY: 5
    };

    const [agents, setAgents] = useState<[Agent]>(
            [
                {
                    id: "agent1",
                    width: 50,
                    height: 50,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    stack: [
                        {
                            type: "if",
                            statement: {

                            },
                            actions: [
                                {
                                    key: "MOVE",
                                    value: "down"
                                },
                                {
                                    key: "MOVE",
                                    value: "right"
                                }
                            ]
                        }
                    ]
                }
            ]

    );

    // setTimeout(() => {
    //     const modifiedAgents = [...agents];
    //
    //     modifiedAgents[0].position.y = 3
    //     modifiedAgents[0].position.x = 3
    //
    //     setAgents(modifiedAgents)
    //
    // }, 1000)


    const handles = {
        onMove: (canvasData: CanvasData, agent: Agent, value: string) => {

            if(value === "top" && ((agent.position.y - 1) >= 0)) {
                agent.position.y = agent.position.y - 1;
            }

            if(value === "down" && ((agent.position.y + 1) < canvasData.sizeY)) {
                agent.position.y = agent.position.y + 1;
            }


            if(value === "left" && ((agent.position.x - 1) >= 0)) {
                agent.position.x = agent.position.x - 1;
            }


            if(value === "right" && ((agent.position.x + 1) < canvasData.sizeX)) {
                agent.position.x = agent.position.x + 1;
            }


            return agent.position;
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {

            const modifiedAgents =  agents.map((agent) => {
                agent.stack.map((stack) => {
                    stack.actions.map((action) => {
                        if(action.key === "MOVE") {
                            agent.position = handles.onMove(canvasData, agent, action.value)
                        }
                    })
                })

                return agent;
            })

            setAgents(modifiedAgents)
        }, 1000);

        return () => clearInterval(intervalId)

    })


    return (
        <svg
            className="h-[100vh] w-[100vw]"
        >
            <g
                style={{
                    transform: "translateX(100px) translateY(100px)",
                }}
            >

                {agents.map((agent, y) => (
                    <Player
                        key={agent.id}
                        id={agent.id}
                        x={agent.position.x * xMultiplierModifier} y={agent.position.y * yMultiplierModifier}
                        width={agent.width}
                        height={agent.height}
                    />
                ))}


                {[...Array(canvasData.sizeX)].map((i, x) =>
                    [...Array(canvasData.sizeY)].map((i, y) =>
                        <Layer id={x.toString() + y.toString()} x={x * xMultiplierModifier} y={y * yMultiplierModifier} key={x + y} width={size} height={size}/>
                    )
                )}
            </g>
        </svg>
    );
}
