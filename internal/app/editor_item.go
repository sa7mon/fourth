package app

import "fourth/internal/proxy_store"

func (a *App) GetEditorItems() []proxy_store.ProxyHistoryItem { return a.EditorItems }

func (a *App) NewEditorItem(id uint) {
	hItem := a.GetHistoryItem(id)
	item := proxy_store.EditorItem{
		ID:  hItem.ID,
		Req: hItem.Req,
	}
	//item.Res = nil // don't include original response
	//item.ResBody = nil
	a.EditorItems = append(a.EditorItems, item)
}

func (a *App) GetHistoryItem(id uint) proxy_store.ProxyHistoryItem {
	return a.History.Requests[id-1]
}

func (a *App) UpdateEditorItem(id uint, newItem proxy_store.ProxyHistoryItem) {
	a.EditorItems[id] = newItem
}
