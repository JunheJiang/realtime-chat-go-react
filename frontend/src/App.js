// import logo from './logo.svg';
import './App.css';
import { connect, sendMsg } from "./api";
import { useEffect, useState } from 'react';
import Header from "./components/Header";
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    connect(
      (msg) => {
        console.log(msg);
        let tempArr = [...chatHistory, msg]
        console.log(tempArr);
        setChatHistory(tempArr);
      });
  }, [chatHistory]);


  // function send() {
  //   sendMsg("hello");
  // }

  function send(event) {
    console.log(event);
    if (event.target.value) {
      sendMsg(event.target.value);
      event.target.value = "";
    }
  }

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className='App'>
      {/* no this */}
      <Header />
      <ChatHistory chatHistory={chatHistory} />
      {/* <button onClick={send}>Hit</button> */}
      <ChatInput send={send} />
    </div>
  );
}

export default App;
