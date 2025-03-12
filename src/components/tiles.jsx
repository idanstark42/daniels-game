import canvasImage from './canvas-image'

import WALL from '../assets/tiles/wall.png'

import TOP from '../assets/tiles/top.png'
import BOTTOM from '../assets/tiles/bottom.png'
import LEFT from '../assets/tiles/left.png'
import RIGHT from '../assets/tiles/right.png'

import TOP_LEFT from '../assets/tiles/top-left.png'
import TOP_RIGHT from '../assets/tiles/top-right.png'
import BOTTOM_LEFT from '../assets/tiles/bottom-left.png'
import BOTTOM_RIGHT from '../assets/tiles/bottom-right.png'

import SIDES from '../assets/tiles/sides.png'

import TOP_LEFT_CORNER from '../assets/tiles/top-left-corner.png'
import TOP_RIGHT_CORNER from '../assets/tiles/top-right-corner.png'
import BOTTOM_LEFT_CORNER from '../assets/tiles/bottom-left-corner.png'
import BOTTOM_RIGHT_CORNER from '../assets/tiles/bottom-right-corner.png'

import NOT_BOTTOM from '../assets/tiles/not-bottom.png'
import NOT_TOP from '../assets/tiles/not-top.png'

const TILES = [
    WALL, // 0

    TOP, // 1
    BOTTOM, // 2
    LEFT, // 3
    RIGHT, // 4
    
    TOP_LEFT, // 5
    TOP_RIGHT, // 6
    BOTTOM_LEFT, // 7
    BOTTOM_RIGHT, // 8    

    SIDES, // 9

    TOP_LEFT_CORNER, // 10
    TOP_RIGHT_CORNER, // 11
    BOTTOM_LEFT_CORNER, // 12
    BOTTOM_RIGHT_CORNER, // 13

    NOT_BOTTOM, // 14
    NOT_TOP, // 15
].map(src => canvasImage(src))

export default TILES
