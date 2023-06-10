package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

func setupRoutes() {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		fmt.Println(writer, "Simple Server")
	})
	http.HandleFunc("/ws", serveWs)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func reader(conn *websocket.Conn) {
	//loops
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

/*
*
w http.ResponseWriter
值传递
*/
func serveWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	//upgrade http request to websocket request
	wsConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	reader(wsConn)
}
func main() {
	fmt.Println("Chat App v0.0.1")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
