import "./App.css";
import Board from "./components/board";
import Keyboard from "./components/Keyboard";
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./words";
import GameOver from "./components/Gameover";

export const appContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault); //initial state
  const [curAttempt, setCurAttempt] = useState({ attempt: 0, letterPos: 0 }); //initial state
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]); //initial state is an empty array
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  }); //initial state is false
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectedLetter = (keyVal) => {
    if (curAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[curAttempt.attempt][curAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurAttempt({ ...curAttempt, letterPos: curAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (curAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[curAttempt.attempt][curAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurAttempt({ ...curAttempt, letterPos: curAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (curAttempt.letterPos !== 5) return;

    let curWord = "";
    for (let i = 0; i < 5; i++) {
      curWord += board[curAttempt.attempt][i];
    }

    if (wordSet.has(curWord.toLowerCase())) {
      setCurAttempt({ attempt: curAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word Not Found");
    }

    if (curWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (curAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <appContext.Provider
        value={{
          board,
          setBoard,
          curAttempt,
          setCurAttempt,
          onSelectedLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </appContext.Provider>
    </div>
  );
}

export default App;
