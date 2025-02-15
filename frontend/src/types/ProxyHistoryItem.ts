import {Response} from "./Response";
import {Request} from "./Request";

export interface ProxyHistoryItem {
    id: number
    req: Request
    res: Response
}