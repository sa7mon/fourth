package proxy_store

import (
	"encoding/json"
	"net/http"
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
	d := HttpRequestDTO{
		Method:        ph.Req.Method,
		URL:           ph.Req.URL.String(),
		Proto:         ph.Req.Proto,
		ContentLength: ph.Req.ContentLength,
		Host:          ph.Req.URL.Host,
		Path:          ph.Req.URL.Path,
		Query:         ph.Req.URL.Query().Encode(),
	}

	headers := make(map[string]string)
	for name, values := range ph.Req.Header {
		headers[name] = values[0] // Only take the first header value
	}
	d.Headers = headers

	resD := HttpResponseDTO{Proto: ph.Res.Proto, Body: string(ph.ResBody)}
	if ph.Res != nil {
		resD.Status = ph.Res.StatusCode
		resD.Size = ph.Res.ContentLength
		headers = make(map[string]string)
		for name, values := range ph.Res.Header {
			headers[name] = values[0] // Only take the first header value
		}
		resD.Headers = headers
	}

	return json.Marshal(&struct {
		ID  uint            `json:"id"`
		Req HttpRequestDTO  `json:"req"`
		Res HttpResponseDTO `json:"res"`
	}{
		ID:  ph.ID,
		Req: d,
		Res: resD,
	})
}

type HttpRequestDTO struct {
	Method        string            `json:"method"`
	URL           string            `json:"url"`
	Proto         string            `json:"proto"`
	Host          string            `json:"host"`
	Path          string            `json:"path"`
	Query         string            `json:"query"`
	Headers       map[string]string `json:"headers"`
	ContentLength int64             `json:"content_length"`
}

type HttpResponseDTO struct {
	Status  int               `json:"status"`
	Size    int64             `json:"size"` // in bytes
	Proto   string            `json:"proto"`
	Body    string            `json:"body"`
	Headers map[string]string `json:"headers"`
}

func (ph *ProxyHistory) Store(item ProxyHistoryItem) {
	ph.Requests = append(ph.Requests, item)
}

func (ph *ProxyHistory) Length() int {
	return len(ph.Requests)
}
