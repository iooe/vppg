import Action from "@/app/Services/Agent/Actions/Action";
import {COMMAND_FOR, COMMAND_IF, COMMAND_JUST_EXECUTE} from "@/app/Services/Agent/Commands";
import {STATEMENT_CALLBACKS} from "@/app/Services/Statement/Statement";
import AgentData from "@/app/Services/Agent/AgentData";
import CanvasData from "@/app/Services/CanvasData";
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
export default class TickProcessor {

    private getAgents = ():Array<Agent> => {
        return []
    }

    private getCanvasData = ():CanvasData => {
        return new CanvasData(-1, -1);
    }

    private setAgents = (value:any):void => {

    }

    constructor(getAgents: Function,setAgents: Function, getCanvasData: Function) {
        // @ts-ignore
        this.getAgents = getAgents
        // @ts-ignore
        this.getCanvasData = getCanvasData
        // @ts-ignore
        this.setAgents = setAgents
    }

    private async actionCompiler(agentI: number, agent: Agent, stackCounter: number, stackUuid: string, actions: Array<Action>) {
        let actionCounter = 0;

        for await (let action of actions) {

            if (window.isRunning !== undefined && !window.isRunning) {
                break
            }

            agent.focused.commandUuid = stackUuid;
            agent.focused.actionUuid = actionCounter;

            const bbb = new Promise((resolve, reject) => {
                const instance: Action = action;
                instance.init(agent.agentData, this.getCanvasData())

                if (instance.isExecutable()) {
                    // setHasChanges(true)
                    agent.agentData = instance.execute()
                }

                this.setAgents(prevState => {
                    // modifiedAgents
                    let newState = [...prevState]
                    newState[agentI] = agent
                    return newState
                })

                console.log("stack  " + stackCounter + " action " + actionCounter + " completed")

                setTimeout(() => {
                    resolve(true)
                }, 250)
            })

            await bbb.then(() => {
                actionCounter++
            })
        }
    }

    public async process(counter:number, getVariable: Function) {
        // setHasChanges(false)

        const agents = this.getAgents()

        for (let agentCounter = 0; agentCounter <= agents.length - 1; agentCounter++) {
            let agent = agents[agentCounter];
            let stackCounter = 0;

            for await (let stack of agent.stack) {
                console.log("stack started " + stackCounter)
                console.log(stack)

                const executeCommandPromise = new Promise(async (resolve, reject) => {
                    if (stack.type === COMMAND_IF) {
                        stack.statement.setCallback(STATEMENT_CALLBACKS.GET_VARIABLE, (key: string) => getVariable(key))
                        stack.statement.setCallback(STATEMENT_CALLBACKS.GET_AGENT_COORDINATES, () => agent.agentData)
                    }

                    if (stack.type === COMMAND_IF && stack.statement.verify()) {
                        await this.actionCompiler(agentCounter, agent, stackCounter, stack.uuid, stack.actions)
                    }

                    if (stack.type === COMMAND_JUST_EXECUTE) {
                        await this.actionCompiler(agentCounter, agent, stackCounter, stack.uuid, stack.actions)
                    }

                    if (stack.type === COMMAND_FOR) {
                        for (let i = 0; i <= stack.props.interactions - 1; i++) {
                            await this.actionCompiler(agentCounter, agent, stackCounter, stack.uuid, stack.actions)
                        }
                    }

                    console.log('stack completed ' + stackCounter)

                    if (stack.type === COMMAND_JUST_EXECUTE) {
                        setTimeout(() => {
                            resolve(true)
                        }, 250)
                    } else {
                        setTimeout(() => {
                            resolve(true)
                        }, 850)
                    }
                });

                await executeCommandPromise.then(() => stackCounter++)
            }

            if (agentCounter === agents.length - 1 && counter !== 100) {
                return new Promise((resolve, reject) => {
                    resolve(true)
                })
            }
        }
    }
}