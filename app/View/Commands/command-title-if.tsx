"use client";

import {RiRobot2Line} from "@remixicon/react";
import React from "react";
import Statement from "@/app/Services/Statement/Statement";
import Coordinates from "@/app/Services/Data/Coordinates";

export const CommandTitleIf = (props = {statement: Statement}) => {


    const icons = {
        ArgumentAgentCoordinates: () => {
            return <div><RiRobot2Line
                size={24}
                color="#000"
                className="command-title-icon"
            /></div>
        },
        ArgumentCoordinates: (argument: Coordinates) => {
            return <div>[{argument.getX()}:{argument.getY()}]</div>
        }
    }

    const argumentA = icons[props.statement.argumentA.constructor.name](props.statement.argumentA.value)
    const argumentB = icons[props.statement.argumentB.constructor.name](props.statement.argumentB.value)


    return (

        <div className="command-title-body">
            <div>If</div>

            {argumentA}
            {props.statement.rule.key}
            {argumentB}
            {/*<div>{props.statement. instanceof ArgumentAgentCoordinates}</div>*/}


        </div>

    );
}
