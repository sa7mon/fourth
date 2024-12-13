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
	ctx     context.Context
	wg      sync.WaitGroup
	History proxy_store.ProxyHistory
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{wg: sync.WaitGroup{}}
}

// Startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
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

func (a *App) AddSampleHistory() {
	a.History.Store(proxy_store.MakeSampleData())
	//a.History.Requests = append(a.History.Requests, proxy_store.MakeSampleData())
}
