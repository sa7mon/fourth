package app

import (
	"fmt"
	"fourth/internal/proxy"
	"fourth/internal/proxy_store"
	"github.com/elazarl/goproxy"
	"log"
	"net/http"
	"time"
)

func NewProxy(app *App) *goproxy.ProxyHttpServer {
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

			item := proxy_store.ProxyHistoryItem{Req: ctx.Req, Res: ctx.Resp, ResBody: bytes, ReqTime: time.Now(), Sess: ctx.Session}
			app.History.Store(item)
			return resp
		})

	return p
}
