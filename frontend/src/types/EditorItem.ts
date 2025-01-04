import {Response} from "./Response";
import {Request} from "./Request";

export interface EditorItem {
    id: number
    req: Request
    res?: Response
}