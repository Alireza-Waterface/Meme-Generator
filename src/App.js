import './App.css';
import React from 'react';
import Header from './Header';

function Meme () {
  const [meme, setMeme] = React.useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    async function getMemes () {
      const response = await fetch ('https://api.imgflip.com/get_memes');
      const data = await response.json();
      setAllMemes (data.data.memes);
    }
    getMemes();
  }, [])
  
  function getMemeImage () {
    const randomNum = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNum].url;
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function editText (event) {
    const {name, value} = event.target;

    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value,
    }))
  }

  return (
    <main className='main'>
      <div className='form'>
        <div className='inputs'>
          <input
            type='text'
            className='input top-text'
            placeholder='Top Text'
            name='topText'
            value={meme.topText}
            onChange={editText}
            ></input>
          <input
            type='text'
            className='input bottom-text'
            placeholder='Bottom Text'
            name='bottomText'
            value={meme.bottomText}
            onChange={editText}
            ></input>
        </div>
        <button className='btn' onClick={getMemeImage}>Get a new meme image 🖼️</button>
      </div>
        <div className='meme-img'>
          <p className='text-up'>{meme.topText}</p>
          <img src={meme.randomImage} alt='meme-img'></img>
          <p className='text-down'>{meme.bottomText}</p>
      </div>
    </main>
  );
}

export default function App () {
  return (
    <>
      <Header/>
      <Meme/>
    </>
  );
}