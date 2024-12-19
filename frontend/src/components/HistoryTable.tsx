import {Table} from "react-bootstrap";
import {ProxyHistoryItem} from "../types/ProxyHistoryItem";

type HistoryTableParams = {
    data: ProxyHistoryItem[]
    selectedRow: number | undefined
    setSelectedRow: React.Dispatch<React.SetStateAction<number | undefined>>
}

export function HistoryTable({data, selectedRow, setSelectedRow}: HistoryTableParams) {
    const handleRowClick = (e: React.MouseEvent<HTMLElement>) => {
        let rowIdAttr = e.currentTarget.attributes.getNamedItem('data-row-id')
        if (!rowIdAttr) {
            console.error('[handleRowClick] data-row-id attribute was null')
            return
        }
        console.log("setting selected row to ", Number(rowIdAttr.value))
        setSelectedRow(Number(rowIdAttr.value))
    }

    return (
        <Table striped={true} className={"sticky-header table-sm c-default"}>
            <thead>
            <tr style={{lineHeight: '12px'}} className="text-start">
                <th>ID</th>
                <th>Host</th>
                <th>Method</th>
                <th>Path</th>
                <th>Query</th>
                <th>Status</th>
                <th>Size</th>
            </tr>
            </thead>
            <tbody>
            {data && (
                data.map((h, i) => (
                    <HistoryRow h={h} id={i} onClick={handleRowClick} selectedRow={selectedRow}/>
                ))
            )}
            </tbody>
        </Table>
    )
}

type HistoryRowParams = {
    h: ProxyHistoryItem
    id: number
    onClick: any
    selectedRow: number | undefined
}

function HistoryRow({h, id, onClick, selectedRow}: HistoryRowParams) {
    const bgClass = (selectedRow === id ? "selected" : "")

    return (
        <tr style={{lineHeight: '12px'}} className={bgClass + " text-start unselectable"} data-row-id={id}
            onClick={onClick}>
            <td>{h.id}</td>
            <td>{h.req.host}</td>
            <td>{h.req.method}</td>
            <td>{h.req.path}</td>
            <td>{h.req.query}</td>
            <td>{h.res?.status}</td>
            <td>{h.res?.size}</td>
        </tr>
    )
}