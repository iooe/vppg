"use client"

import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Argument from "@/app/Services/Agent/Arguments/Argument";
import ArgumentBoolean from "@/app/Services/Agent/Arguments/ArgumentBoolean";

export function CommandArgumentBooleanViewer(props: {
    argument: Argument,
    argumentView: string,
    onChange: Function,
    onOpen: Function,
    onClosed: Function,
    shouldOpenDefault: boolean
}) {
    const [cursor, setCursor] = React.useState(props.argument.value),
        [variables, setVariables] = React.useState([true, false]),
        methods = {
            onOpenChange: (open: boolean) => {
                if (open) {
                    props.onOpen()
                    return
                }

                props.onClosed()
            },
            onChange: (value: string) => {
                setCursor(value)

                props.onChange(new ArgumentBoolean(value))
            }
        }
    return (
        <DropdownMenu onOpenChange={methods.onOpenChange} >
            <DropdownMenuTrigger>
                <span>
                    {props.argumentView}
                </span>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={cursor} onValueChange={methods.onChange}>
                    {variables.map((value, i) => {
                        return (
                            <DropdownMenuRadioItem key={value} value={value}>{value.toString()}</DropdownMenuRadioItem>
                        )
                    })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}