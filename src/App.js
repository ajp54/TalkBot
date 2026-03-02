import { useState, useEffect } from "react";
import { shuffleArray, decodeHtmlEntities } from './utils/textUtils';
import Joke from "./components/Joke";
import Trivia from "./components/Trivia";
import RandomFact from "./components/RandomFact";
import Typewriter from "./components/Typewriter";


export default function App() {
  const [response, setResponse] = useState("");
  const [startingText, setStartingText] = useState("Hello! What would you like to hear today?");
  const [answers, setAnswers] = useState([]);
  const [endingText, setEndingText] = useState(null);

  const [typedText, setTypedText] = useState("");       // For combined startingText + answers
  const [revealEnding, setRevealEnding] = useState(false); // Button toggles this
  const [typedEndingText, setTypedEndingText] = useState(""); // For endingText

  // const jokeUrl = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
  const jokeUrl = "https://v2.jokeapi.dev/joke/"
  const triviaUrl = "https://opentdb.com/api.php?amount=1"
  const randomFactUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random"

  const generateJoke = (params) => {
    const xhr = new XMLHttpRequest();
    console.log("Params: " + params);
    xhr.open('GET', jokeUrl + params);
    xhr.onload = function () {
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        setResponse(JSON.stringify(response));
        console.log(response);
        setAnswers([]);
        setRevealEnding(false);
        setTypedText("");
        setTypedEndingText("");

        if (response.type === "single") {
          setStartingText(response.joke);
          setEndingText("");
          console.log("type=single");
        } else if (response.type === "twopart") {
          setStartingText(response.setup);
          setEndingText(response.delivery);
          console.log("type=twopart");
        }
      }
    };
    xhr.send();
  }

  const generateTrivia = (params) => {
    const xhr = new XMLHttpRequest();
    console.log("Params: " + params);
    xhr.open('GET', triviaUrl + params);
    xhr.onload = function () {
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        console.log("Response: ", response)
        let results = response?.results?.[0];
        setResponse(JSON.stringify(response));
        console.log(response);
        setRevealEnding(false);
        setTypedText("");
        setTypedEndingText("");

        if (results.type === "multiple") {
          const answers = results ? shuffleArray([results.correct_answer, ...results.incorrect_answers]) : [];
          const decodedQuestion = decodeHtmlEntities(results.question);
          const decodedAnswer = decodeHtmlEntities(results.correct_answer);

          setAnswers(answers);
          setStartingText(decodedQuestion);
          setEndingText("Correct Answer: " + decodedAnswer);
          console.log("type=multiple");
        }
        else if (results.type === "boolean") {
          const decodedQuestion = decodeHtmlEntities(results.question);

          setAnswers([]);
          setStartingText(decodedQuestion);
          setEndingText("Correct Answer: " + results.correct_answer);
          //   setPunchline(response.delivery);
          //   console.log("type=twopart");
        }



      }
    };
    xhr.send();
  }

  function generateRandomFact() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', randomFactUrl);
    xhr.onload = function () {
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        const decodedFact = decodeHtmlEntities(response.text);
        // let results = response?.results?.[0];
        setResponse(JSON.stringify(response));
        setAnswers([]);
        setRevealEnding(false);
        setTypedText("");
        setTypedEndingText("");
        setEndingText("");

        setStartingText(decodedFact);
      }
    };
    xhr.send();
  }

  //Typewriter effect for endingText
  useEffect(() => {
    if (!revealEnding || !endingText) return;

    let index = 0;
    let output = "";

    const interval = setInterval(() => {
      output += endingText[index];
      setTypedEndingText(output);
      index++;
      if (index >= endingText.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [revealEnding]);

  return (
    <div className="container">
      {/* <h1>Talk Bot</h1> */}
      <h1>Talk-Bot</h1>
      <div className="api-options">
        <Joke clickHandler={(params) => generateJoke(params)} />
        <Trivia clickHandler={(params) => generateTrivia(params)} />
        <RandomFact clickHandler={() => generateRandomFact()} />
      </div>
      <div className="text-container typewriter">
        {/* <pre>{typedText}</pre> <pre> preserves line breaks */}

        <Typewriter startingText={startingText} answers={answers} />

        {revealEnding && <pre>{typedEndingText}</pre>}

        {!revealEnding && endingText && (
          <button className="button" onClick={() => setRevealEnding(true)}>Continue</button>
        )}
      </div>
    </div>
  );
}