package main

import (
	"fmt"
	"log"
	"net/http"
	"realtime-chat-go-react/pkg/webscoket"
)

func setupRoutes() {
	pool := webscoket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(writer http.ResponseWriter, request *http.Request) {
		fmt.Println(writer, "Simple Server")
		serveWs(pool, writer, request)
	})

}

/*
*
w http.ResponseWriter
值传递
*/
func serveWs(pool *webscoket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")

	//upgrade http request to websocket request
	wsConn, err := webscoket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
	}
	//多个客户端
	client := &webscoket.Client{
		Conn: wsConn,
		Pool: pool,
	}
	pool.Register <- client
	//go webscoket.Writer(wsConn)
	webscoket.Reader(wsConn)
}
func main() {
	fmt.Println("Distributed Chat App v0.0.1")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
