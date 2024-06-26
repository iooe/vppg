"use client";

import {CanvasLayer} from "@/components/MyComponents/AppVisualCodeModules/Canvas/canvas-layer";
import {CanvasAgent} from "@/components/MyComponents/AppVisualCodeModules/Canvas/canvas-agent";
import React, {useEffect, useState} from "react";
import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";
import Action from "@/app/Services/Agent/Actions/Action";
import {Commands} from "@/components/MyComponents/Commands/commads-viewer";
import Statement from "@/app/Services/Statement/Statement";
import MasterRule, {RULE_NOT_EQUAL} from "@/app/Services/Agent/Rules/MasterRule";
import {COMMAND_FOR, COMMAND_IF} from "@/app/Services/Agent/Commands";
import {v4 as uuidv4} from 'uuid';
import Variable from "@/app/Services/Variable/Variable";
import {VariablesViewer} from "@/components/MyComponents/AppVisualCodeModules/Variables/variables-viewer";
import ArgumentVariable from "@/app/Services/Agent/Arguments/ArgumentVariable";
import ArgumentBoolean from "@/app/Services/Agent/Arguments/ArgumentBoolean";
import TickProcessor from "@/app/Services/Core/TickProcessor";
import ActionIncrementVariable from "@/app/Services/Agent/Actions/ActionIncrementVariable";
import Item from "@/app/Services/Item/Item";
import {CanvasItem} from "@/components/MyComponents/AppVisualCodeModules/Canvas/canvas-item";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable"
import {LevelDescription} from "@/components/MyComponents/TextContent/LevelDescription";
import {CommandDialogIncVar} from "@/components/MyComponents/Commands/CommandDiaglogs/command-dialog-inc-var";
import ActionDecrementVariable from "@/app/Services/Agent/Actions/ActionDecrementVariable";
import {TheNavbar} from "@/components/MyComponents/AppSkeleton/TheNavbar";
import {NavigationMenuLink} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {TheCompletedDialog} from "@/components/MyComponents/AppSkeleton/Level/TheCompletedDialog";
import Levels from "@/app/Config/Levels";
import MyUtils from "@/app/Services/Core/MyUtils";
import AudioService from "@/app/Services/AudioService";
import LocalStorage from "@/app/Services/Core/LocalStorage";

export const Canvas = ({}) => {

    const LEVEL_DATA = new Levels().levels[MyUtils.getCurrentLevelIndex()],
        DEFAULT_CONFIG = {
            items: LEVEL_DATA.items,
            canvas: {
                size: 120
            },
            agents: [new AgentData({id: "agent1", width: 50, height: 50})],
            variables: LEVEL_DATA.variables
        },
        instances = {
            canvas: new CanvasData(5, 5)
        }


    const updateVariable = (key: string, value: any, type: undefined | string = undefined) => {
            // @ts-ignore
            setVariables(prevState => {
                let newState = [...prevState]

                let index = variables.findIndex((variable) => variable.key === key)

                if (index === -1) {
                    return newState;
                }

                const instance = variables[index];
                instance.value = value;

                if (type != undefined) {
                    instance.type = type;
                }

                newState[index] = instance
                return newState
            })
        },
        getVariable = (key: string) => {
            let index = variables.findIndex((variable) => variable.key === key)

            if (index === -1) {
                return undefined;
            }

            return variables[index];
        }

    const
        [levelData, setLevelData] = useState(LEVEL_DATA),
        [hasChanges, setHasChanges] = useState(false),
        [isWorking, setIsWorking] = useState(false),
        [isRunning, setIsRunning] = useState(false),
        [controlButtonText, setControlButtonText] = useState("Stop and Reset"),
        [commandsViewerUuid, updateUuid] = useState(uuidv4()),
        [variables, setVariables] = useState<[Variable]>(
            // @ts-ignore
            [...DEFAULT_CONFIG.variables.map(value => value.copy())]
        ),
        // @ts-ignore
        [items, setItems] = useState<[Item]>([...DEFAULT_CONFIG.items.map(item => item.copy())]),
        // @ts-ignore
        [agents, setAgents] = useState<[CanvasAgent]>(
            [
                {
                    position: {
                        x: 0,
                        y: 0,
                    },
                    agentData: DEFAULT_CONFIG.agents[0].copy(),
                    focused: {
                        commandUuid: 'none',
                        actionUuid: 'none'
                    },
                    stack: [
                        ...levelData.stack,
                        // {
                        //     uuid: uuidv4(),
                        //     type: COMMAND_IF,
                        //     statement: new Statement(
                        //         new ArgumentAgentCoordinates(),
                        //         new ArgumentCoordinates(new Coordinates(0, 1)),
                        //         new MasterRule(RULE_EQUAL)
                        //     ),
                        //     actions: [
                        //         // new ActionMoveRight(),
                        //         // new ActionMoveRight()
                        //         new ChangeVariable(() => {
                        //             updateVariable("custom-variable", !getVariable("custom-variable")?.value)
                        //         })
                        //     ]
                        // },
                        // {
                        //     uuid: uuidv4(),
                        //     type: COMMAND_IF,
                        //     statement: new Statement(
                        //         new ArgumentVariable('str_var1'),
                        //         new ArgumentString('changed value'),
                        //         new MasterRule(RULE_EQUAL)
                        //     ),
                        //     actions: [
                        //         new ActionMoveRight(),
                        //         new ActionMoveRight(),
                        //         new ActionChangeVariable(() => {
                        //             updateVariable("b_var", false)
                        //         })
                        //             .setTitle("b_var", 'false')
                        //     ]
                        // },
                        // {
                        //     uuid: uuidv4(),
                        //     type: COMMAND_FOR,
                        //     props: {
                        //         interactions: 3
                        //     },
                        //     actions: [
                        //         new ActionMoveRight(),
                        //         new ActionMoveRight(),
                        //     ]
                        // },
                        // {
                        //     uuid: uuidv4(),
                        //     type: COMMAND_IF,
                        //     statement: new Statement(
                        //         new ArgumentVariable('b_var'),
                        //         new ArgumentBoolean(true),
                        //         new MasterRule(RULE_NOT_EQUAL)
                        //     ),
                        //     actions: [
                        //         new ActionMoveDown(),
                        //         new ActionMoveDown(),
                        //         new ActionChangeVariable(() => {
                        //             updateVariable("b_var", !getVariable("b_var")?.value)
                        //             updateVariable("str_var", 'changed value')
                        //         })
                        //             .setTitle("b_var", String(!getVariable("b_var")?.value))
                        //     ]
                        // },
                        // {
                        //     uuid: uuidv4(),
                        //     type: COMMAND_IF,
                        //     statement: new Statement(
                        //         new ArgumentAgentCoordinates(),
                        //         new ArgumentCoordinates(new Coordinates(11, 11)),
                        //         new MasterRule(RULE_LESS_OR_EQUAL)
                        //     ),
                        //     actions: [
                        //         // new ActionMoveRight(),
                        //         // new ActionMoveRight()
                        //         new ChangeVariable(() => {
                        //             updateVariable("custom-variable", !getVariable("custom-variable")?.value)
                        //         })
                        // new ActionMoveDown(),
                        // new ActionMoveDown(),
                        // new ActionCollectItem(),
                        // new ActionIncrementVariable(() => {
                        //     updateVariable("number_var", getVariable("number_var")?.value + 1)
                        // }).setTitle("number_var")
                        //     ]
                        // },
                    ]
                }
            ]
        );

    const controller = async () => {
        console.log("SYSTEM " + 1)

        if (isWorking) {
            return
        }

        setIsWorking(true)

        process(0)
            .then((state) => {
                console.log("SYSTEM " + 1 + state)
                console.log("SYSTEM " + 2)

                setTimeout(() => {
                        if (typeof window === "undefined") {
                            return;
                        }
                        // @ts-ignore
                        console.log("TEST" + isRunning + window.isRunning)
                        // @ts-ignore
                        if (window.isRunning) {
                            console.log("SYSTEM " + 31)
                            setIsWorking(false)
                            controller()
                            return
                        }
                        // @ts-ignore
                        setAgents(prevState => {
                            let newState = [...prevState]

                            let agentI: number = 0;
                            let agent = agents[agentI];

                            agent.agentData = DEFAULT_CONFIG.agents[0].copy()
                            agent.focused.commandUuid = 'none';
                            agent.focused.actionUuid = 'none';
                            agent.position.x = 0;
                            agent.position.y = 0;

                            newState[agentI] = agent
                            return newState
                        })
                        // @ts-ignore
                        setItems(() => {
                            return [...DEFAULT_CONFIG.items.map(value => value.copy())]
                        })
                        // @ts-ignore
                        // setVariables(() => {
                        //     return [...DEFAULT_CONFIG.variables.map(value => value.copy())]
                        // })

                        console.log("SYSTEM " + 32)

                        const timer = setInterval(() => {
                            if (typeof window !== "undefined") {
                                // @ts-ignore
                                if (!window.isRunning) {
                                    return
                                }
                            }
                            clearTimeout(timer);

                            console.log("SYSTEM " + 33)
                            setIsWorking(false)
                            //
                            // agents[0].focused.commandUuid = 'none';
                            // agents[0].focused.actionUuid = 'none';

                            controller()
                        }, 100)
                    },
                    500)
            })
            .catch(() => {
                console.log("SYSTEM " + 5)
            })
    }
    const process = async (counter: number) => {
        const tickProcessor = new TickProcessor(() => agents, setAgents, () => instances.canvas)

        await tickProcessor.process(counter, getVariable)

    }

    controller().then(r => {
    })

    useEffect(() => {
        if (isRunning) {
            setControlButtonText("Stop & Reset")
        } else {
            setControlButtonText("Play Code")
        }
    }, [isRunning])

    const
        handlers = {
            variables: {
                onChange: (variable: Variable) => {
                    updateVariable(variable.key, variable.value, variable.type)
                },
                get: (key: string) => {
                    let index = variables.findIndex((variable) => variable.key === key)

                    if (index === -1) {
                        return undefined;
                    }

                    return variables[index];
                },
                all: () => {
                    return variables
                },
                onDelete: (uuid: string) => {

                    const index = variables.findIndex((variable: Variable) => variable.uuid === uuid)

                    if (index === -1) {
                        return
                    }

                    const changedVariables = variables;
                    const key = variables[index].key

                    changedVariables.splice(index, 1)

                    setVariables(prevState => {
                        return [...changedVariables]
                    })

                    const defaultIndex = DEFAULT_CONFIG.variables.findIndex((variable: Variable) => variable.key === key)

                    if (defaultIndex === -1) {
                        return
                    }

                    DEFAULT_CONFIG.variables.splice(defaultIndex, 1)
                },
                onCreate: (variable: Variable) => {
                    DEFAULT_CONFIG.variables.push(variable.copy())
                    // @ts-ignore
                    setVariables(prevState => {
                        let newState = [...prevState]

                        newState.push(variable);
                        return newState
                    })
                },
            },
            actions: {
                onCreate: (commandI: number, action: Action) => {
                    // @ts-ignore
                    if (new action() instanceof ActionIncrementVariable || new action() instanceof ActionDecrementVariable) {
                        const func = () => setDialog(<CommandDialogIncVar
                            // @ts-ignore
                            config={{className: action, commandIndex: commandI}}
                            onChange={handlers.actions.create}
                            onClose={() => setDialog(<CommandDialogIncVar
                                config={{className: '', commandIndex: -1}}
                                onChange={handlers.actions.create}
                                onClose={() => func()}
                                isOpened={false}
                            />)}
                            isOpened={true}
                        />)

                        func()

                        return
                    }

                    handlers.actions.create(commandI, action, {key: ''})
                },
                onDelete: (commandI: number, actionI: number) => {
                    let agentI: number = 0;
                    let agent = agents[agentI],
                        actions = agents[agentI].stack[commandI].actions;

                    actions.splice(actionI, 1)

                    agent.stack[commandI].actions = actions;
                    // @ts-ignore
                    setAgents(prevState => {
                        // modifiedAgents
                        let newState = [...prevState]
                        newState[agentI] = agent
                        return newState
                    })

                    updateUuid(uuidv4())
                },
                create: (commandI: number, action: Action, data: { key: string }) => {
                    let agentI: number = 0;
                    let agent = agents[agentI],
                        actions = agents[agentI].stack[commandI].actions;
                    // @ts-ignore
                    let actionInstance = new action();

                    if (actionInstance instanceof ActionIncrementVariable) {
                        actionInstance = new ActionIncrementVariable(() => {
                            updateVariable(data.key, getVariable(data.key)?.value + 1)
                        }).setTitle(data.key)
                    }

                    if (actionInstance instanceof ActionDecrementVariable) {
                        actionInstance = new ActionDecrementVariable(() => {
                            updateVariable(data.key, getVariable(data.key)?.value - 1)
                        }).setTitle(data.key)
                    }

                    actions.push(actionInstance)

                    agent.stack[commandI].actions = actions;
                    // @ts-ignore
                    setAgents(prevState => {
                        // modifiedAgents
                        let newState = [...prevState]
                        newState[agentI] = agent
                        return newState
                    })

                    updateUuid(uuidv4())

                    const func = () => setDialog(<CommandDialogIncVar
                        config={{className: '', commandIndex: -1}}
                        onChange={handlers.actions.create}
                        isOpened={false}
                        onClose={() => func()}
                    />)

                    func()
                },
            },
            commands: {
                onCreate: (newIndex: number, type: String) => {
                    let agentI: number = 0;
                    let agent = agents[agentI];

                    let command = {
                        uuid: uuidv4(),
                        type: type,
                        actions: [],
                    }

                    if (type === COMMAND_IF) {
                        // @ts-ignore
                        command.statement = new Statement(
                            new ArgumentVariable('undefined'),
                            new ArgumentBoolean(true),
                            new MasterRule(RULE_NOT_EQUAL)
                        )
                    }

                    if (type === COMMAND_FOR) {
                        // @ts-ignore
                        command.props = {
                            interactions: 3
                        }
                    }

                    agent.stack.splice(newIndex, 0, command);

                    // @ts-ignore
                    setAgents(prevState => {
                        // modifiedAgents
                        let newState = [...prevState]
                        newState[agentI] = agent
                        return newState
                    })

                    updateUuid(uuidv4())
                },
                onDelete: (commandI: number) => {
                    let agentI: number = 0;
                    let agent = agents[agentI];

                    agent.stack.splice(commandI, 1)
                    // @ts-ignore
                    setAgents(prevState => {
                        // modifiedAgents
                        let newState = [...prevState]
                        newState[agentI] = agent
                        return newState
                    })

                    updateUuid(uuidv4())
                },
                onUpdateStatement: (commandI: number, key: string, value: any | Statement) => {
                    const agentI: number = 0,
                        agent = agents[agentI],
                        stack = agent.stack,
                        command = agent.stack[commandI];


                    command[key] = value

                    stack[commandI] = command;
                    agent.stack = stack

                    // @ts-ignore
                    setAgents(prevState => {
                        // modifiedAgents
                        let newState = [...prevState]
                        newState[agentI] = agent
                        return newState
                    })

                    updateUuid(uuidv4())
                }
            },
            items: {
                get: () => {
                    return items;
                },
                collect: (uuid: string) => {
                    const index = items.findIndex(item => item.uuid === uuid)

                    if (index === -1) {
                        return
                    }

                    const item = items[index]
                    item.collect()
                    // @ts-ignore
                    setItems(prevState => {
                        // modifiedAgents
                        let newState = [...prevState]
                        newState[index] = item
                        return newState
                    })

                    updateUuid(uuidv4())
                },
                drop: (uuid: string, {x, y}) => {
                    const index = items.findIndex(item => item.uuid === uuid)

                    if (index === -1) {
                        return
                    }

                    const item = items[index]
                    item.coordinateX = x;
                    item.coordinateY = y;
                    item.drop()

                    // @ts-ignore
                    setItems(prevState => {
                        // modifiedAgents
                        let newState = [...prevState]
                        newState[index] = item
                        return newState
                    })

                    updateUuid(uuidv4())
                }
            },
            control: {
                stop: () => {
                    if (typeof window !== "undefined") {
                        // @ts-ignore
                        const value = false

                        setIsRunning(value)
                        // @ts-ignore
                        window.isRunning = value;
                    }
                },
            }
        },
        onClick = () => {

            if (typeof window !== "undefined") {
                // @ts-ignore
                const value = !window.isRunning

                setIsRunning(value)
                // @ts-ignore
                window.isRunning = value;
            }

        }

    if (typeof window !== "undefined") {
        // @ts-ignore
        window.getVariable = getVariable
        // @ts-ignore
        window.getVariables = () => {
            return variables
        }

        // @ts-ignore
        window.handlers = handlers;
    }

    const func = () => <CommandDialogIncVar
        onChange={handlers.actions.create}
        config={{className: '', commandIndex: -1}}
        isOpened={false}
        onClose={() => func()}
    />

    const [dialog, setDialog] = useState(
            func()
        ),
        [completedDialog, setCompletedDialog] = useState(
            <TheCompletedDialog
                isOpened={false}
                onClose={() => {
                }}
            />
        )

    const evaluateConditions = (conditions) => {
        for (const condition of conditions) {
            switch (condition.type) {
                case 'variableCheck':
                    const variable = getVariable(condition.variableName);
                    if (variable === undefined || variable.value !== condition.expectedValue) {
                        return false;
                    }
                    break;

                case 'itemCheck':
                    const hasIndex = items.findIndex(
                        (item) => condition.itemTypes.includes(item.type) && item.isCollected === condition.isCollected
                    );
                    if (hasIndex !== -1) {
                        return false;
                    }


                    break;

                case 'agentCheck':
                    const agentIndex = agents.findIndex(
                        (agent) => agent.agentData.coordinateX === condition.coordinateX && agent.agentData.coordinateY === condition.coordinateY
                    );
                    if (agentIndex === -1) {
                        return false;
                    }
                    break;
                case 'itemCoordinatesCheck':
                    const itemIndex = items.findIndex(
                        (item) => condition.itemTypes.includes(item.type) && item.coordinateX === condition.coordinateX && item.coordinateY === condition.coordinateY
                    );
                    if (itemIndex === -1) {
                        return false;
                    }
                    break;
                default:
                    console.error('Unknown condition type:', condition.type);
                    return false;
            }
        }
        return true;
    };


    const isCompleted = () => {
        if (typeof window !== "undefined") {
            // @ts-ignore
            return window.isCompleted
        }

        return false
    }, setIsCompleted = (val: boolean) => {
        if (typeof window !== "undefined") {
            // @ts-ignore
            window.isCompleted = val
        }
    }

    const interval = setInterval(() => {

        const state = evaluateConditions(levelData.conditions);


        if (state && !isCompleted()) {

            setIsCompleted(true);
            clearInterval(interval)
            handlers.control.stop();

            const value = parseInt(LocalStorage.getItem('code-interactions-counter'));

            LocalStorage.setItem('code-interactions-counter', String(value));


            AudioService.playWinSound();

            setCompletedDialog(
                <TheCompletedDialog
                    isOpened={true}
                    currentCodeInteractionsCounter={value}
                    recommendedCodeInteractionsCounter={levelData.recommendedCodeInteractions}
                    onClose={() => {
                    }}
                />
            );
            onClick();
        }
    }, 200)


    useEffect(() => {
        handlers.control.stop()

        return () => {
            console.log('Component will unmount');
        };
    }, []);


    return (


        <ResizablePanelGroup direction="horizontal" style={{maxHeight: "100vh"}}>


            <ResizablePanel>

                <TheNavbar
                    objectives={levelData.objectivesDescription}
                    controlView={
                        <Link href="#" legacyBehavior passHref>
                            <NavigationMenuLink onClick={onClick} className={'nav-item--button'}>
                                <span>{controlButtonText}</span>
                            </NavigationMenuLink>
                        </Link>}
                />
                <div className={'polka-background'}></div>


                <div style={{position: "absolute", top: 0, right: 0}}>
                    {!hasChanges ? "PROBLEM! infinite loop" : ""}
                </div>

                {/*<div style={{position: "absolute", top: 0, left: 0}}>*/}
                {/*    is win {isWinner ? "YES" : "NO"}*/}
                {/*</div>*/}

                <svg
                    className="h-[100vh] w-[100vw] canvas not-selectable">
                    <g style={{transform: "translateX(100px) translateY(100px)"}}>

                        {[...Array(instances.canvas.sizeX)].map((i, x) =>
                            [...Array(instances.canvas.sizeY)].map((i, y) =>
                                <CanvasLayer
                                    id={x.toString() + y.toString()}
                                    x={x * DEFAULT_CONFIG.canvas.size}
                                    y={y * DEFAULT_CONFIG.canvas.size} key={x + y}
                                    width={DEFAULT_CONFIG.canvas.size}
                                    height={DEFAULT_CONFIG.canvas.size}
                                    tile={levelData.getBackgroundTileByCoordinates(x, y)}
                                />
                            )
                        )}

                        {agents.map((agent, y) => (
                            <CanvasAgent
                                key={agent.agentData.id}
                                id={agent.agentData.id}
                                x={agent.agentData.coordinateX * DEFAULT_CONFIG.canvas.size}
                                y={agent.agentData.coordinateY * DEFAULT_CONFIG.canvas.size}
                                width={120}
                                height={120}
                            />
                        ))}

                        {items.map((item) => (
                            !item.isCollected ? <CanvasItem
                                key={item.uuid}
                                id={item.uuid}
                                x={item.coordinateX * DEFAULT_CONFIG.canvas.size}
                                y={item.coordinateY * DEFAULT_CONFIG.canvas.size}
                                width={120}
                                height={120}
                                type={item.type}
                            /> : ''
                        ))}
                    </g>
                </svg>
                <LevelDescription levelNumber={levelData.levelNumber} title={levelData.title} story={levelData.story}/>
            </ResizablePanel>
            <ResizableHandle withHandle style={{zIndex: 11}}/>
            <ResizablePanel style={{
                background: "#202020",
                zIndex: 10,
                boxShadow: "rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;"
            }}>

                {completedDialog}
                {dialog}

                <div className="sidebar">

                    <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-white code-editor-header">
                        🚀 Code Editor
                    </h2>
                    <div className={'commands-content'}>

                        {/*<p>This is a presentation version of the build with a pre-composed sequence of commands to solve*/}
                        {/*    the levels. You can remove the commands from the bottom and make up your own, or run a*/}
                        {/*    second build that does not have a pre-made solution.</p>*/}

                        {agents.map((agent, y) => (
                            <Commands
                                key={commandsViewerUuid}
                                stack={agent.stack}

                                focusedCommandUuid={agent.focused.commandUuid}
                                focusedActionUuid={agent.focused.actionUuid}

                                onDeleteAction={handlers.actions.onDelete}
                                onCreateAction={handlers.actions.onCreate}
                                onCreateCommand={handlers.commands.onCreate}
                                onDeleteCommand={handlers.commands.onDelete}

                                slotVariables={<VariablesViewer
                                    key={commandsViewerUuid}
                                    variables={variables}
                                    onChangeVariable={handlers.variables.onChange}
                                    onCreateVariable={handlers.variables.onCreate}
                                    onDelete={handlers.variables.onDelete}
                                />}
                            />
                        ))}
                    </div>
                </div>


            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
