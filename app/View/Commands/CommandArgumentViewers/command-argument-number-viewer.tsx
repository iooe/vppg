"use client"

import * as React from "react"
import {useState} from "react"
import Argument from "@/app/Services/Agent/Arguments/Argument";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Input} from "@/components/ui/input";
import ArgumentString from "@/app/Services/Agent/Arguments/ArgumentString";
import Variable, {VARIABLE_TYPE_BOOLEAN} from "@/app/Services/Variable/Variable";

export function CommandArgumentNumberViewer(props: {
    value: string,
    argumentView: string,
    onChange: Function,
    onOpen: Function,
    onClosed: Function,
    shouldOpenDefault: boolean
}) {
    const [value, setValue] = useState(props.value),
        methods = {
            onChange: (value: string) => {
                setValue(value)

            },
            onOpenChange: (open: boolean) => {
                if (open) {
                    props.onOpen()
                    return
                }

                props.onClosed()
            },
            handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key !== 'Enter') {
                    return;
                }

                if (value.length === 0) {
                    return;
                }

                props.onChange(value)
            }
        }

    return (
        <Popover onOpenChange={methods.onOpenChange}>
            <PopoverTrigger asChild>
                <span>
                    {props.argumentView}
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                        aaa
                        <Input type="text"
                               placeholder={'placeholder'}
                               value={value}
                               onChange={(e) => methods.onChange(e.target.value)}
                               onKeyDown={methods.handleKeyDown}
                        />
            </PopoverContent>
        </Popover>
    )
}