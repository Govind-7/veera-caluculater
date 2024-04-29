import { useState, useEffect } from "react";
import "./index.css";

const SpeachRecogni = () => {
  const [err, setErr] = useState("");
  const [arr, setArr] = useState([]);
  const [prevData, setPrev] = useState([]);

  let recognition =
    new window.webkitSpeechRecognition() || new window.SpeechRecognition();
  recognition.continuous = true;
  //   recognition.interimResults = true;
  recognition.lang = "en-US";

  const startFunc = () => {
    recognition.start();
    setErr("listenig.....");
  };

  const prevFunc = async () => {
    const url1 = "http://localhost:5000/api/speech/recorded";
    const respo1 = await fetch(url1);
    const dt1 = await respo1.json();
    // console.log(dt1);
    setPrev(dt1);
  };

  const stopFunc = async () => {
    recognition.stop();
    setErr("listenig stoped.....");
    // const url = "http://localhost:5000/api/speech";
    const url = "http://localhost:5000/api/speech";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(arr),
    };

    const respo = await fetch(url, options);
    await respo.json();
    // console.log(dt);
    prevFunc();
  };

  console.log(err);
  console.log(arr);

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;

      setArr((item) => [...item, transcript]);
    };
  });
  useEffect(() => {
    prevFunc();
  }, []);

  return (
    <div className="speech-bg">
      <div>
        <h1>Speach To Text Converter</h1>
        <p className="indicator">{err}</p>
        <button className="listen-but" id="start" onClick={startFunc}>
          Start Listening
        </button>
        <button className="listen-but" id="stop" onClick={stopFunc}>
          Stop Listening
        </button>
      </div>
      <ol>
        {prevData.map((item) => (
          <li>{item.content}</li>
        ))}
      </ol>
    </div>
  );
};

export default SpeachRecogni;
