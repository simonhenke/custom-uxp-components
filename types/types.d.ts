
export enum UnitAbbreviation {
  pixel = 'px',
  inch = 'in',
  percent = '%',
  point = 'pt',
  millimeter = 'mm',
  centimeter = 'cm',
  pica = 'pc',
  distance = 'distance',
}

export interface UV {
  unit?: UnitAbbreviation
  value: number
}