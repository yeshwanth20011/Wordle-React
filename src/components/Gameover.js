import React, { useContext } from "react";
import { appContext } from "../App";

function GameOver() {
  const { gameOver, setGameOver, correctWord, curAttempt } =
    useContext(appContext);
  return (
    <div className="gameOver">
      <h3>
        {" "}
        {gameOver.guessedWord ? "Congratulations !! You Won" : "You Lost"}
      </h3>
      <h1>CorrectWord: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {curAttempt.attempt} attempts</h3>
      )}
    </div>
  );
}

export default GameOver;
