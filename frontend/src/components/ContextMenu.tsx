import {MouseEventHandler} from "react";

type ContextMenuProps = {
    event: React.MouseEvent<HTMLElement>
}

export const ContextMenu = () => {
    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault();
                console.log("Right Click", e.pageX, e.pageY);
            }}
        >
        </div>
    )
}

