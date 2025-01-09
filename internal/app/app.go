package app

import (
	"bufio"
	"context"
	"fmt"
	"fourth/internal/proxy_store"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"log"
	"net/http"
	"strings"
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

// TODO: don't make this a receiver of App. Convert to singleton pattern for app-wide state so we can get state from anywhere
// TODO: support HTTPS
func (a *App) Send(rawReq string, id uint) *proxy_store.ProxyHistoryItem {
	reader := bufio.NewReader(strings.NewReader(fmt.Sprintf("%s\n", rawReq)))
	req, err := http.ReadRequest(reader)
	if err != nil {
		fmt.Println("Error reading request: ", err)
		return nil
	}

	// Since the req.URL will not have all the information set,
	// such as protocol scheme and host, we create a new URL
	req.RequestURI = ""
	req.URL.Scheme = "http"
	req.URL.Host = req.Host

	client := &http.Client{}
	response, resErr := client.Do(req)
	if resErr != nil {
		fmt.Println("[EditorItem.Send] Error sending request: ", resErr)
		return nil
	}
	fmt.Println("[Send] Response status: ", response.Status)

	// Get old editor item, update, then save
	editorItem := a.GetEditorItems()[id]
	editorItem.Req = req
	editorItem.Res = response
	a.UpdateEditorItem(id, editorItem)

	//dump, err := httputil.DumpResponse(response, true)
	//if err != nil {
	//	fmt.Println("[EditorItem.Send] Error dumping response: ", err)
	//	return ""
	//}

	// notify frontend
	runtime.EventsEmit(a.Ctx, "editor_new-response", &editorItem)

	return &editorItem
}
