package app

import (
	"context"
	"fourth/internal/proxy_store"
	"log"
	"net/http"
	"sync"
)

// App struct
type App struct {
	Ctx         context.Context
	wg          sync.WaitGroup
	History     proxy_store.ProxyHistory
	EditorItems []proxy_store.ProxyHistoryItem
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{wg: sync.WaitGroup{}}
}

// Startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.Ctx = ctx
	a.wg.Add(1)
	go func() {
		defer a.wg.Done()
		log.Println("proxy running")
		proxyErr := http.ListenAndServe("localhost:8181", NewProxy(a))
		log.Fatal(proxyErr)
	}()
}

func (a *App) BeforeClose(ctx context.Context) bool {
	a.wg.Done()
	return false
}

func (a *App) GetHistory() []proxy_store.ProxyHistoryItem {
	return a.History.Requests
}

func (a *App) GetEditorItems() []proxy_store.ProxyHistoryItem { return a.EditorItems }

func (a *App) NewEditorItem(id uint) {
	a.EditorItems = append(a.EditorItems, a.GetHistoryItem(id))
}

func (a *App) GetHistoryItem(id uint) proxy_store.ProxyHistoryItem {
	return a.History.Requests[id-1]
}
