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
import MasterRule, {RULES} from "@/app/Services/Agent/Rules/MasterRule";

export function CommandArgumentRuleViewer(props: {
    ruleKey: string,
    view: ReactElement,
    onChange: Function,
    onOpen: Function,
    onClosed: Function,
    shouldOpenDefault: boolean
}) {
    const [cursor, setCursor] = React.useState(props.ruleKey),
        [variables, setVariables] = React.useState(RULES),
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

                props.onChange(new MasterRule(value))
            },
        }


    return (
        <DropdownMenu onOpenChange={methods.onOpenChange}>
            <DropdownMenuTrigger>
                <span>
                    {props.view}
                </span>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={cursor} onValueChange={methods.onChange}>
                    {variables.map((value, i) => {
                        return (
                            <DropdownMenuRadioItem key={value} value={value}>{value}</DropdownMenuRadioItem>
                        )
                    })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}