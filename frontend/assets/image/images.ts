import { Texture } from 'pixi.js'

import character from '../image/character.png'

const imagePaths: { [imageName: string]: string } = {
  character
}

export function getImageTexture(imageName: keyof typeof imagePaths) {
  const imagePath = imagePaths[imageName]
  if (imagePath === undefined)
    throw new Error(`imageName ${imageName} is not found`)
  return Texture.from(imagePath)
}
