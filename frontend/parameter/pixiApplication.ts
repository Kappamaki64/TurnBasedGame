import { IApplicationOptions, ITextStyle } from 'pixi.js'

export const pixiApplicationOptions: IApplicationOptions & {
  width: number
  height: number
} = {
  width: 800,
  height: 600,
  backgroundColor: 0xf0f0f0
}

export const textStyle: Pick<ITextStyle, 'fill' | 'fontSize' | 'align'> = {
  fontSize: 30,
  fill: 0x000000,
  align: 'center'
}

export const buttonMargin = 5
export const buttonRoundRadius = 10
