package storage

import (
	"net/http"
	"time"
)

type ProxyHistory struct {
	Requests []ProxyHistoryItem
}

type ProxyHistoryItem struct {
	ID      uint
	Req     *http.Request
	Res     *http.Response
	ResBody []byte
	ReqTime time.Time
	Sess    int64
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
