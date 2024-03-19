import Argument from "@/app/Services/Agent/Arguments/Argument";

export default class Rule {
    public execute(argumentA: Argument, argumentB: Argument) {
        return argumentA.value === argumentB;
    }
}