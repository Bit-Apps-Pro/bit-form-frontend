export type colorPickerProps = {
  id: string,
  value: string|valueObject,
  onChangeHandler: (value: string|valueObject|object) => void,
  allowImportant?: boolean,
  allowSolid?: boolean,
  allowGradient?: boolean,
  allowImage?: boolean,
  allowVariable?: boolean,
}


export type valueObject = {
  color: string,
  'background-position'?: string,
  'background-size'?: string,
  'background-image'?: string,
  'background-repeat'?: string,
}


type colorObj = {
  h: number,
  s: number,
  v: number,
  a: number,
}|{}
