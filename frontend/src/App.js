// import logo from './logo.svg';
import './App.css';
import { connect, sendMsg } from "./api";
import { useEffect, useState } from 'react';
import Header from "./components/Header";
import ChatHistory from './components/ChatHistory';

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


  function send() {
    sendMsg("hello");
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
      <button onClick={send}>Hit</button>
    </div>
  );
}

export default App;
