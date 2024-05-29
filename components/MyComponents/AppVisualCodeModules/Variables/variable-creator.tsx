import {Input} from "@/components/ui/input";
import React, {ChangeEventHandler, useState} from "react";
import {VariableDropdown} from "@/components/MyComponents/AppVisualCodeModules/Variables/variable-dropdown";
import Variable, {
    VARIABLE_TYPE_BOOLEAN,
    VARIABLE_TYPE_NUMBER,
    VARIABLE_TYPE_STRING,
    VARIABLE_TYPES
} from "@/app/Services/Variable/Variable";

export default function VariableCreator(props: {
    onCreate: Function
}) {
    const [type, setType] = useState(VARIABLE_TYPE_BOOLEAN),
        [key, setKey] = useState(''),
        [value, setValue] = useState(true),
        updateKey = (event: ChangeEventHandler<HTMLInputElement>) => {
            // @ts-ignore
            const value = event.target.value.replace(/[^A-Za-z0-9\-]/ig, '-')
            setKey(value)
        },
        updateValue = (value: any) => {
            setValue(value)
        },
        updateType = (value: string) => {
            switch (value) {
                case VARIABLE_TYPE_BOOLEAN:
                    updateValue(true)
                    break;
                case VARIABLE_TYPE_STRING:
                    updateValue("")
                    break;
                case VARIABLE_TYPE_NUMBER:
                    updateValue(0)
                    break;
                default:
                    //
                    break;
            }

            setType(value)
        },
        handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') {
                return;
            }

            // @ts-ignore
            if (key.length === 0 || value.length === 0) {
                return;
            }

            props.onCreate(new Variable(key, type, value))

            setType(VARIABLE_TYPE_BOOLEAN)
            setKey('')
            setValue(true)
        }

    return (
        <div className={`variable-creator`}>
            <span className={`variable-v-var`}>var</span>

            <Input type="text"
                   placeholder={`Key`}
                   value={key}
                // @ts-ignore
                   onChange={updateKey}
                   onKeyDown={handleKeyDown}
            />

            <span>:</span>

            <VariableDropdown
                options={VARIABLE_TYPES}
                default={type}
                onChange={updateType}
            />

            <span>=</span>

            {type === VARIABLE_TYPE_BOOLEAN ? <span onClick={() => updateValue(!value)}>{value.toString()}</span> : ''}
            {type === VARIABLE_TYPE_STRING || type === VARIABLE_TYPE_NUMBER ?

                <Input type="text" placeholder={`Value`}
                    // @ts-ignore
                       value={value}
                       onChange={(e) => updateValue(e.target.value)}
                       onKeyDown={handleKeyDown}
                /> : ''}

            {/*<div onClick={() => props.onCreate(new Variable(key, type, value))}>Create</div>*/}
        </div>
    );
}
