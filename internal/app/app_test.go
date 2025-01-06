package app

import (
	"bufio"
	"fmt"
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
