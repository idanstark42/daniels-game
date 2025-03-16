import { useEffect, useState } from 'react'
import './App.css'

import SCREEN_ROOM from './assets/rooms/screen.jpg'
import MOTHERBOARD_ROOM from './assets/rooms/motherboard.jpg'
import DISK_ROOM from './assets/rooms/disk.jpg'
import CPU_ROOM from './assets/rooms/cpu.jpg'

import { roomEntranceKeyLevel, roomVirusesLevel, roomCodeLevel, messageLevel } from './levels'

import { ThreeCardMonte } from './monte'

const roomLevel = (background, viruses, key, codeState, codeChildren) => [
  roomEntranceKeyLevel(background, key),
  roomVirusesLevel(background, viruses),
  roomCodeLevel(background, codeState, codeChildren)
]

const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')

const COLOR_TARGETS = [
  ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF'],
  ['#FF00FF', '#FFFF00', '#00FFFF', '#000000'],
  [randomColor(), randomColor(), randomColor(), randomColor()],
]

const rgb = c => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]

const colorDifference = (c1, c2) => {
  const [r1, g1, b1] = rgb(c1)
  const [r2, g2, b2] = rgb(c2)
  return Math.sqrt((r1 - r2)**2 + (g1 - g2)**2 + (b1 - b2)**2)
}

const MATH_PROBLEMS = [
  { question: '2+2', answer: 4 },
  { question: '10+10', answer: 20 },
  { question: '5X5', answer: 25 },
  { question: '100:10', answer: 10 },
  { question: '10-5', answer: 5 },
  { question: '10-5X2', answer: 0 },
  { question: '10:2', answer: 5 },
  { question: '5X2X5', answer: 50 },
]

const LEVELS = [{},
  ...roomLevel(SCREEN_ROOM, 5, 'מסך', { round: 0, currentColors: Array(COLOR_TARGETS[0].length).fill('#000000') }, (state, setState, nextLevel) => {
    return !Boolean(state.currentColors) ? '' : <div style={{ height: '100%', background: 'rgba(0, 0, 0, 0.8)', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
      {state.currentColors.map((color, i) => <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 100, height: 100, backgroundColor: COLOR_TARGETS[state.round][i] }} />
        <input type='color' value={color} style={{ width: 50, height: 50, fontSize: 30 }} onChange={e => {
          setState({ ...state, currentColors: state.currentColors.map((color, j) => j === i ? e.target.value : color) })
          console.log(COLOR_TARGETS[state.round].map((target, j) => colorDifference(target, j === i ? e.target.value : state.currentColors[j])))
          if (COLOR_TARGETS[state.round].every((target, j) => colorDifference(target, j === i ? e.target.value : state.currentColors[j]) < 100)) {
            if (state.round === COLOR_TARGETS.length - 1) {
              nextLevel()
            } else {
              setState({ ...state, round: state.round + 1, currentColors: Array(COLOR_TARGETS[state.round + 1].length).fill('#000000') }) 
            }
          }
        }} />
      </div>)}
  </div>
  }),
  ...roomLevel(MOTHERBOARD_ROOM, 10, 'לוח אם', { connections: [], hold: null, wrong: null, buttons: 'אבגדהוזחטי'.split('').concat(Array(10).fill(1).map((x,i) => `${i + 1}`)).map(value => ({ value, x: 10 + 80*Math.random(), y: 10 + 80*Math.random() })) }, (state, setState, nextLevel) => {
    return !Boolean(state.buttons) ? '' : <div style={{ height: '100%', background: 'rgba(0, 0, 0, 0.8)', position: 'relative', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
      {state.buttons.filter(button => state.connections.every(conn => !conn.includes(button.value))).map((button, i) => <button style={{ border: '2px solid black', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: `${button.y}%`, left: `${button.x}%`, width: 50, height: 50, fontSize: '2rem', backgroundColor: state.hold === button.value ? 'blue' : state.wrong?.includes(button.value) ? 'red' : 'white' }}
        onClick={() => {
          if (state.hold === null) {
            setState({ ...state, hold: button.value })
          } else {
            if (state.hold && state.hold.toLowerCase() === button.value.toLowerCase()) { // canceling connection
              setState({ ...state, hold: null })
            } else {
              // correct connection is a letter and a number, i.e. א and 1.
              const firstButtonType = isNaN(parseInt(state.hold)) ? 'letter' : 'number'
              const secondButtonType = isNaN(parseInt(button.value)) ? 'letter' : 'number'
              const firstButtonIndex = state.buttons.findIndex(b => b.value === state.hold) - (firstButtonType === 'number' ? 10 : 0)
              const secondButtonIndex = state.buttons.findIndex(b => b.value === button.value) - (secondButtonType === 'number' ? 10 : 0)
              
              if (firstButtonType !== secondButtonType && firstButtonIndex === secondButtonIndex) {
                setState({ ...state, connections: [...state.connections, [state.hold, button.value]], hold: null })
                if (state.connections.length === state.buttons.length / 2 - 1) nextLevel()
              } else {
                setState({ ...state, wrong: [state.hold, button.value], hold: null })
                setTimeout(() => {
                  setState({ ...state, hold: null, wrong: null })
                }, 1000)
              }
            }
          }
        }}
        >
        {button.value}
      </button>)}
    </div>
  }),
  ...roomLevel(DISK_ROOM, 20, 'דיסק קשיח', {}, (state, setState, nextLevel) => {
    return <div className='parchment'>
שלום לכם!<br/>
כאן דוקטור ויר.<br/>
אני משאיר לכם את המכתב הזה פה כדי שתדעו שהצלחתי להגיע לדיסק הקשיח שלכם.<br/>
אתם בטח חושבים שבגלל שניקיתם את כל הוירוסים מהמחשב, ניצחתם אותי, נכון?<br/>
אז אני אגלה לכם שאתם לא קרובים לנצח אפילו! אני לקחתי את קובץ הבסיס, הקובץ הכי חשוב וסודי במחשב של עידן, והחבאתי אותו במחשב שלי. אתם לא יכולים לדעת איפה הוא בכלל!
אבל זה לא הכל!<br/>
חשבתם שזה גרוע שהגעתי לכאן עם הוירוסים שלי? מה תגידו אם אני אגיד לכם שהגעתי אפילו יותר עמוק לתוך המחשב? אני הגעתי למקום הכי חשוב במחשב ושמתי את הוירוסים שלי שם. נראה אתכם מגיעים לשם בזמן בשביל לעצור אותם!<br/>
<button onClick={() => nextLevel()} style={{ background: 'rgb(228, 59, 161)', padding: '1rem', fontSize: '1.2rem' }}>סיימתי לקרוא</button>
    </div>
  }),
  ...roomLevel(CPU_ROOM, 30, 'יחידת העיבוד המרכזית', { currentProblem: 0, answer: '' }, (state, setState, nextLevel) => {
    return !state.hasOwnProperty('currentProblem') ? '' : <div className='parchment' style={{ gap: '1rem' }}>
      <span>{MATH_PROBLEMS[state.currentProblem].question}</span>
      <span>=</span>
      <input type='text' value={state.answer} onChange={e => setState({ ...state, answer: e.target.value })} style={{ width: 50, height: 50, fontSize: 30, textAlign: 'center' }} />
      <button onClick={() => {
        if (parseInt(state.answer) === MATH_PROBLEMS[state.currentProblem].answer) {
          if (state.currentProblem === MATH_PROBLEMS.length - 1) {
            nextLevel()
          } else {
            setState({ ...state, currentProblem: state.currentProblem + 1, answer: '' })
          }
        } else {
          alert('נסי שוב')
        }
      }}
      style={{ background: 'rgb(228, 59, 161)', padding: '1rem', fontSize: '1.2rem', border: 'none' }}
      >אישור</button>
    </div>
  }),
  messageLevel('אתם ניצחתם את דוקטור ויר! כל הכבוד!', false)
]

function App() {
  const [level, setLevel] = useState(1)
  const [state, setState] = useState(LEVELS[1].initialState || {})

  const nextLevel = () => setLevel(lvl => lvl + 1)

  useEffect(() => {
    if (LEVELS[level - 1].close) LEVELS[level - 1].close(state, setState)

    setState(LEVELS[level].initialState || {})
    if (LEVELS[level].initialize) LEVELS[level].initialize(state, setState, nextLevel)
  }, [level])

  console.log(state)

  return <>
    <div className='instructions'>{LEVELS[level].instructions}</div>
    <div className='content'>{LEVELS[level].content(state, setState, nextLevel)}</div>
  </>
}

export default App
