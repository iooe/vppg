"use client";

import React, {memo} from "react";
import Variable, {
    VARIABLE_TYPE_BOOLEAN,
    VARIABLE_TYPE_NUMBER,
    VARIABLE_TYPE_STRING
} from "@/app/Services/Variable/Variable";
import VariableCreator from "@/app/View/AppVisualCodeModules/Variables/variable-creator";
import {VariableEditor} from "@/app/View/AppVisualCodeModules/Variables/variable-editor";
import {CommandArgumentStringViewer} from "@/app/View/Commands/CommandArgumentViewers/command-argument-string-viewer";

export const VariablesViewer = memo(function Variables(props: {
    variables: Array<Variable>,
    onChangeVariable: Function
    onCreateVariable: Function,
    onDelete: Function
}) {

    const changeVariableType = (i: number) => {
            return
            const variable = props.variables[i];

            switch (variable.type) {
                case VARIABLE_TYPE_BOOLEAN:
                    variable.type = VARIABLE_TYPE_STRING;
                    variable.value = "Your string";

                    break;
                case VARIABLE_TYPE_STRING:
                    variable.type = VARIABLE_TYPE_BOOLEAN;
                    variable.value = true;
                    break;
                default:
                    //
                    break;
            }

            props.onChangeVariable(variable)

        },
        changeVariableValue = (i: number) => {
            const variable = props.variables[i];

            switch (variable.type) {
                case VARIABLE_TYPE_BOOLEAN:
                    variable.value = !variable.value;

                    break;
                case VARIABLE_TYPE_STRING:
                    variable.value = "Your string";
                    break;
                default:
                    //
                    break;
            }

            props.onChangeVariable(variable)
        },
        controls = {
            emitDelete: (uuid: string) => {
                props.onDelete(uuid)
            }
        }

    return (

        <div className={`variables-viewer`}>
            {props.variables.map((variable, i) => {

                return (
                    <div key={variable.uuid} className={`variable`}>

                        {/*<span className={`variant-key`}>{variable.key}</span>*/}
                        <span className={`variable-v-var`}>var</span>

                        <VariableEditor
                            onDelete={() => controls.emitDelete(variable.uuid)}
                            variableKey={variable.key}
                            slotVariable={
                                <span className={`variant-key variable-v-key`}>{variable.key}:</span>
                            }/>

                        {variable.type === VARIABLE_TYPE_BOOLEAN ?
                            <span className={`variant-type-style variant-type-style--boolean`}
                                  onClick={() => changeVariableType(i)}>b</span> : ''}

                        {variable.type === VARIABLE_TYPE_STRING ?
                            <span className={`variant-type-style variant-type-style--string`}
                                  onClick={() => changeVariableType(i)}>str</span> : ''}

                        {variable.type === VARIABLE_TYPE_NUMBER ?
                            <span className={`variant-type-style variant-type-style--number`}
                                  onClick={() => changeVariableType(i)}>int</span> : ''}

                        <span>=</span>

                        <span className="variant-value variable-v-value variable-v-value--boolean"
                              onClick={() => changeVariableValue(i)}>
                            {variable.type === VARIABLE_TYPE_BOOLEAN ? variable.value.toString() : ''}
                        </span>

                        {variable.type === VARIABLE_TYPE_STRING  ?
                            <CommandArgumentStringViewer
                                value={variable.value}
                                argumentView={
                                    <span className="variant-value variable-v-value variable-v-value--string">
                                    &apos;{variable.value}&apos;
                                    </span>
                                }
                                onChange={(value: string) => {
                                    variable.value = value
                                    props.onChangeVariable(variable)
                                }}
                                onOpen={() => {
                                }}
                                onClosed={() => {
                                }}
                                shouldOpenDefault={false}/>
                            : ''}

                        {variable.type === VARIABLE_TYPE_NUMBER ?
                            <CommandArgumentStringViewer
                                value={variable.value}
                                argumentView={
                                    <span className="variant-value variable-v-value variable-v-value--number">
                                    {variable.value}
                                    </span>
                                }
                                onChange={(value: string) => {
                                    variable.value = value
                                    props.onChangeVariable(variable)
                                }}
                                onOpen={() => {
                                }}
                                onClosed={() => {
                                }}
                                shouldOpenDefault={false}/>
                            : ''}
                    </div>
                )
            })}

            <VariableCreator onCreate={props.onCreateVariable}/>


        </div>


    );
})
