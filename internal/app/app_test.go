package app

import (
	"bufio"
	"context"
	"fmt"
	"fourth/internal/proxy_store"
	"net/http"
	"strings"
	"testing"
)

func TestRequestParse(t *testing.T) {
	rawReq := "GET / HTTP/1.1\n" + "Host: localhost:8989\r\n" + "\r\n"
	reader := bufio.NewReader(strings.NewReader(rawReq))
	req, err := http.ReadRequest(reader)
	if err != nil {
		fmt.Println("Error reading request: ", err)
		t.Fail()
	}
	fmt.Println("[EditorItem.Send] Parsed request:", req)
}

func TestSend(t *testing.T) {
	a := App{
		EditorItems: []proxy_store.EditorItem{
			{ID: 0},
		},
	}
	a.Startup(context.TODO())

	rawReq := "GET / HTTP/1.1\nHost: localhost:8989\r\n\r\n"
	worked := a.Send(rawReq, 0)
	if !worked {
		t.Fail()
	}
}
