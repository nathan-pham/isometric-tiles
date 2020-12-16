import { resize, generateAssets, generateBlocks } from "./utils.js"

const canvas = document.getElementById("app")
const ctx = canvas.getContext("2d")

const map = [
  [12, 12,  0,  0,  0, 17],
  [12, 12, 12, 12,  0, 17],
  [12, 12, 12,  0,  0, 17],
  [12, 17, 12, 12, 17, 17],
  [12, 12, 12, 17, 17, 17],
  [12, 12, 12, 17, 17, 17],
]

// 17 = lave
// 12 = bedrock
// 0  = stone
// 51 = white wwool

const size = 40
const tileSize = {
  x: 32,
  y: 32
}

let offsetX = window.innerWidth / 2
let offsetY = window.innerHeight / 2

let files, blocks

let player = {
  x: 0,
  y: 0,
  appearance: 51
}

const drawMap = () => {
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  const block = (i, x, y) => {
    let chosen = blocks[i]

    ctx.drawImage(files["isometric.png"],
      chosen.sx, chosen.sy, tileSize.x, tileSize.y,
      x, y, size, size
    )
  }

  let tileH = (size - 8) / 2
  let tileW = (size - 8) / 4

  for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[i].length; j++) {
      let tile = map[i][j]
      
      block(tile, 
        (i - j) * tileH + offsetX,
        (i + j) * tileW + offsetY // not based on math lmao
      )
      // console.log(player)
      if(player.x == i && player.y == j) {
        block(player.appearance,
          (i - j) * tileH + offsetX,
          (i + j) * tileH / 2 + offsetY - tileH - 6
        )
      }
    }
  } 
}

const init = async () => {
  files = await generateAssets([ "isometric.png" ])
  blocks = generateBlocks()

  drawMap()
}

window.addEventListener("keydown", e => {
  switch(e.key) {
    case "a":
      player.x--
      break
    case "d":
      player.x++
      break
    case "w":
      player.y--
      break
    case "s":
      player.y++
      break
  }
  drawMap()
})

resize(canvas)
init()