package proxy_store

import (
	"encoding/json"
	"net/http"
	"net/url"
	"time"
)

type ProxyHistory struct {
	Requests []ProxyHistoryItem
}

type ProxyHistoryItem struct {
	ID      uint `json:"id"`
	Req     *http.Request
	Res     *http.Response
	ResBody []byte
	ReqTime time.Time
	Sess    int64
}

func (ph *ProxyHistoryItem) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		ID  uint           `json:"id"`
		Req HttpRequestDTO `json:"req"`
	}{
		ID: ph.ID,
		Req: HttpRequestDTO{
			Method:        ph.Req.Method,
			URL:           ph.Req.URL.String(),
			Proto:         ph.Req.Proto,
			ContentLength: ph.Req.ContentLength,
			Host:          ph.Req.Host,
		},
	})
}

type HttpRequestDTO struct {
	Method string `json:"method"`
	URL    string `json:"url"`
	Proto  string `json:"proto"`
	//ProtoMajor int
	//ProtoMinor int
	//Header           Header
	//Body             io.ReadCloser
	//GetBody          func() (io.ReadCloser, error)
	ContentLength int64  `json:"content_length"`
	Host          string `json:"host"`
}

func MakeSampleData() ProxyHistoryItem {
	u, _ := url.Parse("https://google.com/wp-admin.php?admin=1")
	dummyRequest := http.Request{Method: "GET", URL: u, Header: http.Header{
		"User-Agent":    []string{"Go"},
		"Authorization": []string{"bearer eyJ"}}, Proto: "HTTP/1.1"}
	return ProxyHistoryItem{Req: &dummyRequest}
}

func (ph *ProxyHistory) Store(item ProxyHistoryItem) {
	ph.Requests = append(ph.Requests, item)
}

func (ph *ProxyHistory) Length() int {
	return len(ph.Requests)
}

func (ph *ProxyHistoryItem) Map() map[string]string {
	return map[string]string{
		"method": ph.Req.Method,
		"time":   ph.ReqTime.Format("2006-01-02 15:04:05"),
		"url":    ph.Req.URL.String(),
	}
}
