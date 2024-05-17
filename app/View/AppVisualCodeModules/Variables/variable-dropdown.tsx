"use client"

import * as React from "react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {VARIABLE_TYPE_BOOLEAN, VARIABLE_TYPE_NUMBER, VARIABLE_TYPE_STRING} from "@/app/Services/Variable/Variable";

export function VariableDropdown(props: {
    options: Array<string>,
    default: string,
    onChange: Function
}) {
    const [position, setPosition] = React.useState(props.default),
        onChange = (value: string) => {
            props.onChange(value)
            setPosition(value)
        }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={`variant-type-button`}>
                    {position === VARIABLE_TYPE_BOOLEAN ?
                        <span className={`variant-type-style variant-type-style--boolean`}>b</span> : ''}

                    {position === VARIABLE_TYPE_STRING ?
                        <span className={`variant-type-style variant-type-style--string`}>str</span> : ''}

                    {position === VARIABLE_TYPE_NUMBER ?
                        <span className={`variant-type-style variant-type-style--number`}>int</span> : ''}
                </Button>


            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={position} onValueChange={onChange}>

                    {props.options.map((value, i) => {
                        return (
                            <DropdownMenuRadioItem key={value} value={value} onClick={() => onChange(value)}>{value}</DropdownMenuRadioItem>
                        )
                    })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}