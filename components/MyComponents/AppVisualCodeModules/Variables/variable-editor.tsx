import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React, {useEffect, useState} from "react";

export const VariableEditor = (props: {
    slotVariable: any,
    variableKey: String,
    onDelete: Function
}) => {


    return (
        <Popover>
            <PopoverTrigger asChild>
                {/*<Button variant="outline">Open popover 1{key}1</Button>*/}
                {props.slotVariable}
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">{props.variableKey}</h4>
                        <p className="text-sm text-muted-foreground">
                            Control the state of the variable.
                        </p>
                    </div>
                    {/*<Input type="text" placeholder={variable.key} value={variable.key}/>*/}
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Button variant="destructive" onClick={() => props.onDelete()}>Delete</Button>
                        </div>
                        {/*<div className="grid grid-cols-3 items-center gap-4">*/}
                        {/*    <Label htmlFor="width">Width</Label>*/}
                        {/*    <Input*/}
                        {/*        id="width"*/}
                        {/*        defaultValue="100%"*/}
                        {/*        className="col-span-2 h-8"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="grid grid-cols-3 items-center gap-4">*/}
                        {/*    <Label htmlFor="maxWidth">Max. width</Label>*/}
                        {/*    <Input*/}
                        {/*        id="maxWidth"*/}
                        {/*        defaultValue="300px"*/}
                        {/*        className="col-span-2 h-8"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="grid grid-cols-3 items-center gap-4">*/}
                        {/*    <Label htmlFor="height">Height</Label>*/}
                        {/*    <Input*/}
                        {/*        id="height"*/}
                        {/*        defaultValue="25px"*/}
                        {/*        className="col-span-2 h-8"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="grid grid-cols-3 items-center gap-4">*/}
                        {/*    <Label htmlFor="maxHeight">Max. height</Label>*/}
                        {/*    <Input*/}
                        {/*        id="maxHeight"*/}
                        {/*        defaultValue="none"*/}
                        {/*        className="col-span-2 h-8"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}