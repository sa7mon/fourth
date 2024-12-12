package main

import (
	"context"
	"fourth/internal/proxy_store"
)

// App struct
type App struct {
	ctx      context.Context
	history  proxy_store.ProxyHistory
	testData []string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{testData: []string{"apple", "banana", "peach"}}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetHistory() []proxy_store.ProxyHistoryItem {
	return a.history.Requests
}

func (a *App) AddSampleHistory() {
	a.history.Requests = append(a.history.Requests, proxy_store.MakeSampleData())
}

func (a *App) GetTestData() []string {
	return a.testData
}
