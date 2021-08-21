package main

import (
	"embed"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/signal"

	"github.com/zserge/lorca"
)

//go:embed public
var fs embed.FS

func main() {
	ui, err := lorca.New("", "", 480, 320)
	if err != nil {
		fmt.Println(err)
	}

	ln, err := net.Listen("tcp", "127.0.0.1:3000")
	go http.Serve(ln, http.FileServer(http.FS(fs)))
	ui.Load(fmt.Sprintf("http://%s/public", ln.Addr()))

	defer ui.Close()
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.Done():
	}
}
