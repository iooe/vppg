"use client";
export const CommandTitleDefault = (props: { commandType: String }) => {

    return (
        <div className="command-title-body">
            {props.commandType}
        </div>
    );
}
