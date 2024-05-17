import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogFooter,} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import Variable, {VARIABLE_TYPE_NUMBER} from "@/app/Services/Variable/Variable";
import ActionIncrementVariable from "@/app/Services/Agent/Actions/ActionIncrementVariable";
import ActionDecrementVariable from "@/app/Services/Agent/Actions/ActionDecrementVariable";

export function CommandDialogIncVar(props: {
    onChange: Function,
    onClose: Function,
    isOpened: boolean,
    config: { className: string, commandIndex: number },
}) {
    const [cursor, setCursor] = React.useState('undefined');
    const [variables, setVariables] = React.useState(['undefined']);

    React.useEffect(() => {
        if (props.isOpened) {
            loadVariables();
        }
    }, [props.isOpened]);

    const loadVariables = () => {
        // @ts-ignore
        let vars = window.handlers.variables.all()

        // @ts-ignore
        if (new (props.config.className) instanceof ActionIncrementVariable || new (props.config.className) instanceof ActionDecrementVariable) {
            vars = vars.filter((variable: Variable) => variable.type === VARIABLE_TYPE_NUMBER)
        }

        setVariables(vars.map((variable: Variable) => variable.key));
    };

    const handleChange = (value: string) => {
        setCursor(value);
    };

    const handleClick = () => {
        if (cursor !== 'undefined') {
            props.onChange(props.config.commandIndex, props.config.className, {key: cursor});
        }
    };

    // @ts-ignore
    return (
        <Dialog open={props.isOpened}>

            <DialogContent className="sm:max-w-[425px]">

                <div className="grid gap-4 py-4">
                    <DropdownMenu onOpenChange={loadVariables}>
                        <DropdownMenuTrigger>
                            <span>{cursor}</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={cursor} onValueChange={handleChange}>
                                {variables.map((value) => (
                                    <DropdownMenuRadioItem key={value} value={value}>
                                        {value}
                                    </DropdownMenuRadioItem>
                                ))}
                                {variables.length === 0 && (
                                    <p style={{padding: '10px'}}>You must add at least one variable.</p>
                                )}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleClick}>Next!</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={() => props.onClose}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
