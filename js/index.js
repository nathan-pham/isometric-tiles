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

const size = 40
const offsetX = window.innerWidth / 2
const offsetY = window.innerHeight / 2

const init = async () => {
  const files = await generateAssets([ "isometric.png" ])
  const blocks = generateBlocks()

  const tileSize = {
    x: 32,
    y: 32
  }

  const block = (i, x, y) => {
    let chosen = blocks[i]

    ctx.drawImage(files["isometric.png"],
      chosen.sx, chosen.sy, tileSize.x, tileSize.y,
      x, y, size, size
    )
  }
  
  // block("dirt")  

  for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[i].length; j++) {
      let tile = map[i][j]
      
      block(tile, 
        (i - j) * (size - 8) / 2 + offsetX,
        (i + j) * (size - 8) / 4 + offsetY // not based on math lmao
      )
    }
  }

}

resize(canvas)
init()