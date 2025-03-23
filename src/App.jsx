import { useEffect, useState } from 'react'
import './App.css'

import SCREEN_ROOM from './assets/rooms/screen.jpg'
import MOTHERBOARD_ROOM from './assets/rooms/motherboard.jpg'
import DISK_ROOM from './assets/rooms/disk.jpg'
import CPU_ROOM from './assets/rooms/cpu.jpg'
import INTERNET_CARD_ROOM from './assets/rooms/internet-card.jpg'
import INTERNET_ROOM from './assets/rooms/internet.jpg'
import DNS_ROOM from './assets/rooms/dns.jpg'
import VIRS_ENTRANCE from './assets/rooms/virs-entrance.jpg'
import ALL_INTERNET_IMAGE from './assets/world-internet.jpg'  
import SERVER_ROOM from './assets/rooms/server.webp'

import FUNNY_IMAGE_1 from './assets/funny_image_1.gif'
import FUNNY_IMAGE_2 from './assets/funny_image_2.jpg'
import FUNNY_IMAGE_3 from './assets/funny_image_3.gif'
import BAD_STREET from './assets/rooms/wrong-place.jpg'

import dnsDialog from './dialogs/dns-dialog'

import { messageLevel, roomEntranceKeyLevel, computerLevel, dialogLevel, roomLookupLevel, internetLevel, roomHiddenCodeLevel } from './levels'

const STUFF = [
  FUNNY_IMAGE_2,
  FUNNY_IMAGE_1,
  FUNNY_IMAGE_3,
  BAD_STREET,
]

const LEVELS = [{},
  computerLevel([
    { name: 'מסך', image: SCREEN_ROOM },
    { name: 'לוח אם', image: MOTHERBOARD_ROOM },
    { name: 'כונן קשיח', image: DISK_ROOM },
    { name: 'יחידת עיבוד מרכזית', image: CPU_ROOM }
  ]),
  roomEntranceKeyLevel(SCREEN_ROOM,'מסך'),
  roomEntranceKeyLevel(MOTHERBOARD_ROOM,'לוח אם'),
  roomEntranceKeyLevel(INTERNET_CARD_ROOM, 'כרטיס רשת'),
  roomEntranceKeyLevel(INTERNET_ROOM, 'אינטרנט'),
  internetLevel(INTERNET_ROOM, ALL_INTERNET_IMAGE, STUFF, false),
  dialogLevel(DNS_ROOM, dnsDialog, true),
  internetLevel(INTERNET_ROOM, ALL_INTERNET_IMAGE, STUFF, true, '25ב'),
  roomEntranceKeyLevel(SERVER_ROOM, 'שרת'),
  roomLookupLevel(SERVER_ROOM, [
    { x: 62, y: 41, w: 13, h: 13, name: 'גלובוס' },
    { x: 28, y: 81, w: 9, h: 9, name: 'פרח צהוב' },
    { x: 62, y: 10, w: 12, h: 12, name: 'מאורר' },
    { x: 55, y: 75, w: 25, h: 20, name: 'מזוודה' },
    { x: 88.5, y: 64, w: 8, h: 8, name: 'כתר' },
    { x: 65, y: 25, w: 8, h: 15, name: 'סולם' },
    { x: 15, y: 45, w: 22, h: 32, name: 'מחשב' },
    { x: 38, y: 86, w: 9, h: 6, name: 'מטבע' },
  ]),
  messageLevel('הסיסמה היא "אינטרנט"', true),
  internetLevel(INTERNET_ROOM, ALL_INTERNET_IMAGE, STUFF, true, '13א'),
  roomHiddenCodeLevel(VIRS_ENTRANCE, 'אינטרנט'),
  messageLevel('הצלחתם להחזיר את הקובץ ולנצח את דוקטור ויר! כל הכבוד!', false)
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
