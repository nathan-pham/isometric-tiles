const resize = (canvas) => {
  const r = () => {
    Object.assign(canvas, {
      width: window.innerWidth,
      height: window.innerHeight
    }) 
  }

  r()
  window.addEventListener("resize", r)
}

const generateAssets = async (names) => {
  let files = {}

  const download = (name) => {
    return new Promise((resolve, reject) => {
      const asset = new Image()
      asset.onload = () => {
        console.log(`Downloaded ${name}`)
        files[name] = asset
        resolve()
      }
      asset.onerror = () => {
        console.log(`Failed to download ${name}`)
        reject()
      }
      asset.src = `/assets/${name}`
    })
  }

  const downloadPromise = Promise.all(names.map(download))
    // names.map(v => download(`/assets/${v}`))

  await downloadPromise
  return files
}

const generateBlocks = () => {
  let blocks = {}

  let sx = 0, sy = 0
    // sWidth = 32, sHeight = 32

  for(let i = 0; i < (16 * 35); i++) {
    blocks[i] = {
      sx,
      sy
    }

    sx += 32
    if(i % 16 == 0 && i !== 0) {
      sy += 32
      sx = 0
    }
  }

  return blocks
}

export {
  resize,
  generateAssets,
  generateBlocks
}