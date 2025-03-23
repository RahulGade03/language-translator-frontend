import { useState, useEffect, useRef } from 'react'
import './App.css'
import Title from './components/Title'
import Languages from './components/Languages'
import { RiExchangeFill } from "react-icons/ri";
import HistoryList from './components/HistoryList'
import { GiHamburgerMenu } from "react-icons/gi";

function App() {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [toLang, setToLang] = useState('');
  const [fromLang, setFromLang] = useState('');
  const [histList, setHistList] = useState([]);
  const [isOpen, setIsOpen] = useState (false)
  const dataRef = useRef();
  const fromLangRef = useRef();
  const toLangRef = useRef();

  useEffect(() => {
    async function run() {
      let data = await fetch('https://language-translator-backend-rose.vercel.app/')
      const data1 = await data.json()
      setHistList(data1)
    }
    run()
  }, [])


  async function fetchData() {
    let a = await fetch(`https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLang}|${toLang}`)
    a = await a.json()
    return a.responseData.translatedText
  }

  function handleExchange() {
    let temp = fromText;
    setFromText(toText)
    setToText(temp)
    temp = toLang;
    setToLang(fromLang)
    setFromLang(temp)
  }

  async function handleTranslate() {
    setToText('Translating...')
    let a = await fetchData()
    setToText(a);
    const hist = await fetch('https://language-translator-backend-rose.vercel.app/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searched: fromText })
    });

    const data = await fetch('https://language-translator-backend-rose.vercel.app/')
    const data1 = await data.json()
    // console.log('data1: ', data1)
    setHistList(data1)
    // console.log('histList: ', histList)
  }

  return (
    <div className='bg-[#B7E4C7] w-screen h-screen flex flex-col items-center justify-start'>
      <div className={`translationHistory h-screen w-[500px] bg-[#081C15] text-white rounded-2xl p-4 absolute all duration-300 ease-in-out ${isOpen?'left-[0px]':'left-[-500px]'}`}>
        <h2 className='font-bold text-2xl mb-5'>Translation History</h2>
        <ul className='flex flex-col items-center gap-0.5 w-full scroll-auto overflow-x-hidden h-[90%]'>
          <HistoryList histList={histList} />
        </ul>
      </div>
      <GiHamburgerMenu onClick={()=>{setIsOpen(!isOpen)}} className='fixed right-5 top-5 scale-200 select-none'/>
      <Title />
      <div className="App bg-[#52B788] flex justify-center items-center w-[75vw] h-[60vh] rounded-2xl">
        <div className="mainArea flex flex-col h-full w-full justify-around">
          <div className="translateArea flex gap-30 justify-center w-full">
            <div className="from bg-[#2D6A4F] rounded-3xl p-4 w-[40%]">
              <input type="text" value={fromText} ref={dataRef} onChange={(e) => { setFromText(e.target.value) }} className='w-full text-white placeholder:text-gray-300 resize-none outline-none' placeholder="Translate here..." />
            </div>
            <div className="to bg-[#2D6A4F] rounded-3xl p-4 w-[40%]">
              <input type="text" value={toText} onChange={(e) => { setToText(e.target.value) }} className='h-auto text-wrap w-full text-white placeholder:text-gray-300 resize-none outline-none' placeholder="Translation will be..." readOnly />
            </div>
          </div>
          <div className="functionality flex justify-around">
            <div className="from bg-[#2D6A4F] rounded-2xl">
              <select ref={fromLangRef} value={fromLang} onChange={(e) => { setFromLang(e.target.value) }} className='outline-none p-2 text-white select-none'>
                <Languages />
              </select>
            </div>
            <div className="exchangeIcon select-none" onClick={handleExchange}>
              <i><RiExchangeFill className='size-10 select-none' /></i>
            </div>
            <div className="to bg-[#2D6A4F] rounded-2xl">
              <select ref={toLangRef} value={toLang} onChange={(e) => { setToLang(e.target.value) }} className='outline-none p-2 text-white select-none'>
                <Languages />
              </select>
            </div>
          </div>
          <div className='flex justify-center'>
            <button id="translateBtn" className='bg-[#081C15] w-[300px] text-white p-3 rounded-3xl font-bold disabled:bg-[#2b8f6c] select-none' disabled={fromText.length < 1 || fromLang.length < 2 || toLang.length < 2} onClick={handleTranslate}>
              TRANSLATE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
