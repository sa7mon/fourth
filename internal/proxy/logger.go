package proxy

import (
	"bytes"
	"fmt"
	"github.com/elazarl/goproxy"
	"io"
	"net/http"
)

type HttpLogger struct {
	path string
}

type ByteWriter struct {
	bytes []byte
}

func NewByteWriter() *ByteWriter {
	return &ByteWriter{bytes: make([]byte, 0)}
}

func (bw *ByteWriter) Write(p []byte) (n int, err error) {
	bw.bytes = append(bw.bytes, p...)
	fmt.Println("Write(): ", string(bw.bytes))
	return len(p), nil
}

func (bw *ByteWriter) Close() error {
	return nil
}

func (bw *ByteWriter) Len() int {
	return len(bw.bytes)
}

func (bw *ByteWriter) Read(p []byte) (n int, err error) {
	p = append(p, bw.bytes...)
	return len(bw.bytes), nil
}

func NewByteReader(data []byte) *ByteReader {
	return &ByteReader{R: bytes.NewReader(data)}
}

type ByteReader struct {
	R *bytes.Reader
}

func (br *ByteReader) Read(p []byte) (n int, err error) {
	return br.R.Read(p)
}

func (br *ByteReader) Close() error {
	return nil
}

func NewLogger(basepath string) (*HttpLogger, error) {
	logger := &HttpLogger{basepath}
	return logger, nil
}

func (logger *HttpLogger) LogResp(resp *http.Response, ctx *goproxy.ProxyCtx) []byte {
	bw := NewByteWriter()
	if resp == nil {
		resp = emptyResp
	} else {
		_, err := io.Copy(bw, resp.Body)
		if err != nil {
			fmt.Println(err)
		}
		resp.Body = NewByteReader(bw.bytes)
	}
	return bw.bytes
}

func (logger *HttpLogger) Close() error {
	//close(logger.c)
	//return <-logger.errch
	return nil
}

var emptyResp = &http.Response{}
