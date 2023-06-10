package webscoket

import (
	"fmt"
	"github.com/gorilla/websocket"
	"io"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return ws, err
	}
	return ws, nil
}

func Reader(conn *websocket.Conn) {
	//loops
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Println("客户端端发来信息:" + string(p))
		str := "服务端发来信息:" + string(p)
		//回写
		if err := conn.WriteMessage(messageType, []byte(str)); err != nil {
			log.Println(err)
			return
		}
	}
}

func Writer(conn *websocket.Conn) {
	for {
		fmt.Println("Sending")
		//下一个客户端 io.Reader
		messageType, r, err := conn.NextReader()
		if err != nil {
			log.Println(err)
			return
		}

		//下一个写回 io.WriteCloser
		w, err := conn.NextWriter(messageType)
		if err != nil {
			log.Println(err)
			return
		}

		//how to understand  io.WriteCloser--->io.Reader
		if _, err := io.Copy(w, r); err != nil {
			log.Println(err)
			return
		}

		if err := w.Close(); err != nil {
			log.Println(err)
			return
		}
	}
}
