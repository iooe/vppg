"use client"

import * as React from "react"
import {ReactElement} from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Argument from "@/app/Services/Agent/Arguments/Argument";
import ArgumentVariable from "@/app/Services/Agent/Arguments/ArgumentVariable";

export function CommandArgumentVariablesViewer(props: {
    argument: Argument,
    argumentView: ReactElement,
    onChange: Function,
    onOpen: Function,
    onClosed: Function,
    shouldOpenDefault: boolean
}) {
    const [cursor, setCursor] = React.useState(
            props.argument.hasSource() ? props.argument.getSource().key : 'undefined'
        ),
        [variables, setVariables] = React.useState([
            props.argument.hasSource() ? props.argument.getSource().key : 'undefined'
        ]),
        methods = {
            onOpenChange: (open: boolean) => {
                // @ts-ignore
                setVariables(window.handlers.variables.all().map(v => v.key))
                if (open) {
                    props.onOpen()
                    return
                }

                props.onClosed()
            },
            onChange: (value: string) => {
                setCursor(value)

                props.onChange(new ArgumentVariable(value))
            },
        }
    // @ts-ignore
    setTimeout(() => setVariables(window.handlers.variables.all().map(v => v.key)), 100)

    return (
        <DropdownMenu onOpenChange={methods.onOpenChange}>
            <DropdownMenuTrigger>
                <span>
                    {props.argumentView}
                </span>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={cursor} onValueChange={methods.onChange}>
                    {variables.map((value, i) => {
                        return (
                            <DropdownMenuRadioItem key={value} value={value}>{value}</DropdownMenuRadioItem>
                        )
                    })}

                    {variables.length === 0 ? <p style={{padding: '10px'}}>You must add at least one variable.</p> : ''}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}