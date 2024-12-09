package main

import (
	"embed"
	"fmt"
	proxy "fourth/internal/proxy"
	storage "fourth/internal/proxy_store"
	"github.com/elazarl/goproxy"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

var history = storage.ProxyHistory{}

func main() {
	// Create an instance of the app structure
	app := NewApp()

	p := goproxy.NewProxyHttpServer()
	p.Verbose = true

	logger, lerr := proxy.NewLogger("db")
	if lerr != nil {
		log.Fatal("can't open log file", lerr)
	}

	p.OnRequest().DoFunc(
		func(r *http.Request, ctx *goproxy.ProxyCtx) (*http.Request, *http.Response) {
			return r, nil
		})
	p.OnResponse().DoFunc(
		func(resp *http.Response, ctx *goproxy.ProxyCtx) *http.Response {
			bytes := logger.LogResp(resp, ctx)
			fmt.Println("OnResponse(): read bytes: ", len(bytes))

			item := storage.ProxyHistoryItem{Req: ctx.Req, Res: ctx.Resp, ResBody: bytes, ReqTime: time.Now(), Sess: ctx.Session}
			history.Store(item)

			//log.Printf("history length: %v", history.Length())

			return resp
		})

	var wg sync.WaitGroup

	log.Println("proxy running")
	wg.Add(2)

	go func() {
		defer wg.Done()
		proxyErr := http.ListenAndServe("localhost:8181", p)
		log.Fatal(proxyErr)
	}()

	// Create application with options
	go func() {
		err := wails.Run(&options.App{
			Title:  "fourth",
			Width:  1024,
			Height: 768,
			AssetServer: &assetserver.Options{
				Assets: assets,
			},
			BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
			OnStartup:        app.startup,
			Bind: []interface{}{
				app,
			},
		})
		if err != nil {
			println("Error:", err.Error())
		}
	}()

	wg.Wait()
}
