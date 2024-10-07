import Die from "./components/Die";
import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies]= useState(false);

  useEffect(()=>{
    const allHeld = dice.every(dice=> dice.isHeld);
    const firstItem = dice[0].value;
    const allSameValue = dice.every(dice=>dice.value===firstItem);
    if(allHeld && allSameValue){
      setTenzies(true);
    }
  },[dice]) 
  
  
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
function holdDice(id){
  
  setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
}
  const diceElement = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });
  function rollDice() {

    if(!tenzies){
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }else{
      setTenzies(false);
      setDice(allNewDice())
    }
    
  }
  return (
    <main>
      <div className="dice-container">{diceElement}</div>
      <button className="rolle-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
