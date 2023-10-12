export type colorPickerProps = {
  id: string,
  valueObj: valueObject,
  onChangeHandler: (value: string|object) => void,
  clearHandler: (value: MouseEvent<HTMLButtonElement>) => void,
  allowImportant?: boolean,
  allowSolid?: boolean,
  allowGradient?: boolean,
  allowImage?: boolean,
  allowVariable?: boolean,
}


export type valueObject = {
  value: string,
  backgroundPosition?: string,
  backgroundSize?: string,
  backgroundImage?: string,
  backgroundRepeat?: string,
}


type colorObj = {
  h: number,
  s: number,
  v: number,
  a: number,
}|{}
