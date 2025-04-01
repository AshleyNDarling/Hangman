import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';

import noose from './assests/noose.png';
import upperBody from './assests/upperbody.png';
import upperAndLower from './assests/upperandlowerbody.png';
import oneArm from './assests/1arm.png';
import oneLeg from './assests/1leg.png';
import bothArms from './assests/botharms.png';
import dead from './assests/Dead.png';




const pics = [noose, upperBody, upperAndLower, oneArm, bothArms, oneLeg, dead];
const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React",
  "Sunshine", "Rainbow", "Princess", "Diamond", "Glitter", "Butterfly", "Cupcake", "Harmony",
  "Paradise", "Sparkle", "Ballet", "Mermaid", "Galaxy", "Fashion", "Adventure", "Dream",
  "Bouquet", "Confetti", "Chocolate", "Candle", "Serenade", "Blossom", "Whimsical", "Fantasy"];
const wordHints = {"Morehouse": "A historically Black college in Atlanta.",
  "Spelman": "A women's college in Atlanta, known for its strong liberal arts program.",
  "Basketball": "A sport involving two teams of five players each.",
  "Table": "A flat surface with four legs used for various activities.",
  "Museum": "A place to view historical artifacts and art.",
  "Excellent": "Something of very high quality.",
  "Fun": "Something that brings joy or pleasure.",
  "React": "A popular JavaScript library for building user interfaces.",
  "Sunshine": "The light and warmth from the sun.",
  "Rainbow": "A colorful arc that appears after rain.",
  "Princess": "A female royal family member.",
  "Diamond": "A precious gemstone known for its hardness and brilliance.",
  "Glitter": "Tiny, shiny particles used in decorations.",
  "Butterfly": "An insect known for its colorful wings.",
  "Cupcake": "A small, individual-sized cake, often decorated with frosting.",
  "Harmony": "A pleasing combination of different elements.",
  "Paradise": "An ideal place or state of perfect happiness.",
  "Sparkle": "To shine brightly with flashes of light.",
  "Ballet": "A highly technical form of dance.",
  "Mermaid": "A mythical sea creature with the upper body of a woman and the tail of a fish.",
  "Galaxy": "A vast collection of stars, planets, and other celestial bodies.",
  "Fashion": "A popular trend in clothing, accessories, or behavior.",
  "Adventure": "An exciting or unusual experience.",
  "Dream": "A series of thoughts, images, and sensations occurring in a person's mind during sleep.",
  "Bouquet": "A bunch of flowers, typically arranged in a decorative way.",
  "Confetti": "Small pieces of paper thrown during celebrations.",
  "Chocolate": "A sweet treat made from cocoa beans.",
  "Candle": "A wax stick with a wick, used for light or decoration.",
  "Serenade": "A musical performance given to express love or admiration.",
  "Blossom": "A flower or group of flowers.",
  "Whimsical": "Playfully quaint or unusual.",
  "Fantasy": "A genre of imaginative fiction."};


class HangmanGame extends React.Component {
  state = {
    wordList: words,
    curWord:  0,
    lifeLeft: 5,
    usedLetters: [],
    revealedLetters: [],
    gameOver: false,
    word: "",
    hint: "",
    hintUsed: false,
  }


  componentDidMount() {
    if(this.state.wordList.length > 0){
      this.startNewGame();
    } else {
      console.error("Word List is empty!!!!!!!!!1")
    }
    
   // console.log(words);
   /* this.setState({
     // wordList: words,
     // curWord:Math.floor(Math.random() * words.length),
     // revealedLetters: new Array(words[0].length).fill(false),

     

    }); */
  }


  getPlayerName = (name) => {
    this.setState({
      playerName: name
    });
  }


  startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * this.state.wordList.length);
    const newWord = this.state.wordList[randomIndex].toUpperCase();
    //const newWord = this.state.wordList[randomIndex].toUpperCase(); 
    const hint = wordHints[this.state.wordList[randomIndex]];


    console.log('Random Index:', randomIndex); // Debugging: check if randomIndex is valid
    console.log('Word List:', this.state.wordList); // Debugging: check if wordList is populated
    

    if(this.state.wordList[randomIndex]){
      const newWord = this.state.wordList[randomIndex].toUpperCase();

      this.setState({
        curWord: randomIndex,
        lifeLeft: 5,
        usedLetters: [],
        //revealedLetters: new Array(this.state.wordList[randomIndex].length).fill(false),
        revealedLetters: new Array(newWord.length).fill('_'),
        gameOver: false,
        word: newWord,
        hint: hint,
        hintUsed: false,
        
      });


    } else {
      console.error('Invalid word index or empty WordList' );
    }



    
  };


  handleHintClick = () => {
    const { wordHints, curWord } = this.state;
    const selectedWord = this.state.wordList[curWord]; // Assuming wordList and curWord are properly set.
    const hint = wordHints[selectedWord.toUpperCase()];

    if(this.state.hintUsed){
      console.log('You already use the hint!');
      return;
    }
  

   


    // Check if a hint exists for the selected word and log it in the console
    if (hint) {
      console.log('Hint for', selectedWord, ':', hint);
      this.setState({ hintUsed: true });
    } else {
      console.log('No hint available for this word.');
    }


  };
  
  
 /* restartGame = () => {
    this.setState({
      lifeLeft: 5,
      usedLetters: 5,
      revealedLetters: [],
      gameOver: false,
    
    }, this.startNewGame);
  }; */

  handleLetterGuess = (letter) => {
    const { word, usedLetters, lifeLeft, revealedLetters } = this.state;
    const upperLetter = letter.toUpperCase();
   // const upperLetter = letter.toUpperCase();

    if (usedLetters.includes(upperLetter) || this.state.gameOver)  {
      alert("you've already guessed this letter, try again...")
      return;
    }

    let newRevealedLetters = [...revealedLetters];
    let correctGuess = false;

    for (let i = 0; i < word.length; i++) {
      if (word[i] === upperLetter) {
        newRevealedLetters[i] = upperLetter;
        correctGuess = true;
      }
    }

    this.setState({
      usedLetters: [...usedLetters, upperLetter],
      revealedLetters: newRevealedLetters,
      lifeLeft: correctGuess ? lifeLeft : lifeLeft - 1,
    }, () => {
      if (this.state.lifeLeft === 0){
        this.setState({
          gameOver: true,
          word:  `Game Over! The word was: ${word}`,
        })
      }

      if(!newRevealedLetters.includes('_')){
        this.setState({
          gameOver: true,
          word:"🎉 Congratulations! You guessed the word!",

        });
      }

    });
  };





  /*render(){
    const word = this.state.wordList[this.state.curWord];
    return(
      <div>
        <img src={pics[this.state.lifeLeft]}/>
        <button onClick={this.startNewGame}>New Game</button>
        <p>{word}</p>
        <SingleLetterSearchbar></SingleLetterSearchbar>

        <LetterBox 
          letter="a"
          isVisible={true}
          boxStyle={{ backgroundColor: 'lightblue' }}
          letterStyle={{ color: 'white', fontSize: '30px' }}
        ></LetterBox>
      </div>
    )
  } */


    render() {
      const { word, revealedLetters, lifeLeft, gameOver } = this.state;
      const gameWon = revealedLetters.every(letter => letter !== '_');
      return (
        <div className="hangman-game">
          <h1>Hangman Game</h1>
          <img src={pics[Math.min(6,5 - lifeLeft)]} alt="Hangman" />
  
          <div className="word-display">
            {word.split('').map((letter, index) => (
              <LetterBox
                key={index}
                letter={letter}
                isVisible={gameOver || revealedLetters[index] !== '_'}
                boxStyle={{ backgroundColor: 'lightblue' }}
                letterStyle={{ color: 'white', fontSize: '30px' }}
              />
            ))}
          </div>
  
          <SingleLetterSearchbar onSearch={this.handleLetterGuess} gameOver={gameOver} />
  
          <div className="used-letters">
            <p>Used Letters: {this.state.usedLetters.join(', ')}</p>
          </div>
  
          {gameOver && <p className="game-message">{this.state.word}</p>}
  
          <div className="buttons">
            <button onClick={this.startNewGame}>New Game</button>
            <button onClick={this.handleHintClick} disabled={gameOver}>
              Get Hint!
            </button>
          </div>
        </div>
      );
    }

}
   



export default HangmanGame;
