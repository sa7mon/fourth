import {Highlighted} from "./Highlighted";
import {Request, Response} from '../types/ProxyHistoryItem'
import {Item, Menu, Separator, Submenu, useContextMenu} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export type HttpMessageDetailsParams = {
    request?: Request
    response?: Response
}

const MENU_ID = "HttpMessageDetails";

export const HttpMessageDetails = ({request, response}: HttpMessageDetailsParams) => {
    if (!request && !response) {
        console.error("[HttpMessageDetails] either request or response is required")
    }

    const {show} = useContextMenu({
        id: MENU_ID
    });

    function displayMenu(e: any) {
        // put whatever custom logic you need
        // you can even decide to not display the Menu
        show({
            event: e,
        });
    }

    if (request) {
        const startLine = `${request.method} ${request.path}${request.query} ${request.proto}\n`
        let headerText = `Host: ${request.host}\n`
        for (const [key, value] of Object.entries(request.headers)) {
            headerText += `${key}: ${value}\n`
        }
        return (
            <div className={"p-2 text-start"} onContextMenu={displayMenu}>
                <strong className="mb-1 d-block">Request</strong>
                <Highlighted startLine={startLine} headers={headerText} body={""}/>
                <MessageDetailsContextMenu/>
            </div>
        )
    }
    if (response) {
        const startLine = `${response.proto} ${response.status}\n`
        let headerText = `Content-Length: ${response.size}\n`
        for (const [key, value] of Object.entries(response.headers)) {
            headerText += `${key}: ${value}\n`
        }
        const body = `\n${response.body}\n`
        return (
            <>
                <div className="d-flex justify-content-between">
                    <strong className="d-block">Response</strong>
                    <span>{response.size} bytes</span>
                </div>
                <Highlighted startLine={startLine} headers={headerText} body={body}/>
            </>
        )
    }
    return <></>
}

const MessageDetailsContextMenu = () => {
    function sendToEditor({event, props, triggerEvent, data}: any) {
        console.log(event, props, triggerEvent, data);
    }

    return (
        <Menu id={MENU_ID}>
            <Item onClick={sendToEditor}>
                Edit
            </Item>
            {/*<Item onClick={handleItemClick}>*/}
            {/*    Item 2*/}
            {/*</Item>*/}
            {/*<Separator/>*/}
            {/*<Submenu label="Submenu">*/}
            {/*    <Item onClick={handleItemClick}>*/}
            {/*        Sub Item 1*/}
            {/*    </Item>*/}
            {/*    <Item onClick={handleItemClick}>Sub Item 2</Item>*/}
            {/*</Submenu>*/}
        </Menu>
    )
}