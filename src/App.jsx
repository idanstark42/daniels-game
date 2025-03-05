import { useState } from 'react'
import './App.css'

const LEVELS = [{},
  {
    instructions: 'לחצי על הכפתור האדום',
    content: (state, setState) => <button style={{ background: 'red', width: 300, height: 300 }}></button>
  }
]

function App() {
  const [level, setLevel] = useState(1)
  const [state, setState] = useState({})

  return <>
    <div className='title'>שלב {level}</div>
    <div className='instructions'>{LEVELS[level].instructions}</div>
    <div className='content'>{LEVELS[level].content(state, setState)}</div>
  </>
}

export default App
