package main

import (
	"embed"
	app2 "fourth/internal/app"
	"fourth/internal/proxy_store"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := app2.NewApp()

	// make sample data
	app.History.Requests = append(app.History.Requests, proxy_store.MakeSampleData())

	err := wails.Run(&options.App{
		Title:  "fourth",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.Startup,
		OnBeforeClose:    app.BeforeClose,
		Bind: []interface{}{
			app,
			&proxy_store.ProxyHistoryItem{},
		},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}
