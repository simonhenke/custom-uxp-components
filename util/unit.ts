import { UnitAbbreviation, UV } from "../types/types"

export function pxToMm(pixel: number, ppi: number): number {
  return (pixel * 25.4) / ppi
}

export function pxToCm(pixel: number, ppi: number): number {
  return pxToMm(pixel, ppi) / 10
}

export function pxToInch(pixel: number, ppi: number): number {
  return pixel / ppi
}

export function pxToPrct(pixel: number, reference: number): number {
  return pixel / reference * 100
}

export function pxToPica(pixel: number): number {
  return 0.0625 * pixel
}

export function picaToPx(pica: number): number {
  return pica / 0.0625
}

export function inchToPx(inch: number, ppi: number): number {
  return inch * ppi
}

export function mmToPx(mm: number, ppi: number): number {
  return mm / 25.4 * ppi
}

export function cmToPx(cm: number, ppi: number): number {
  return mmToPx(cm * 10, ppi)
}

export function prctToPx(prct: number, reference: number): number {
  return prct * reference / 100
}

export function pxToPt(pixel: number, ppi: number): number {
  return pixel * 72 / ppi
}

export function ptToPx(pt: number, ppi: number): number {
  return pt / 72 * ppi
}

export function distanceToPx(dst: number, ppi: number) {
  return dst * ppi / 72
}

export function pxToDistance(px: number, ppi: number) {
  return px / ppi * 72
}

export function convertValue(value: number, fromUnit: UnitAbbreviation, toUnit: UnitAbbreviation, ppi: number): number {
  return pixelTo(toPixel(value, fromUnit, ppi), toUnit, ppi)
}

export function toPixel(value: number, unit: UnitAbbreviation, ppi?: number, percentReference?: number): number {
  const _ = UnitAbbreviation
  switch (unit) {
    case _.pixel: return value
    case _.millimeter: return mmToPx(value, ppi)
    case _.centimeter: return cmToPx(value, ppi)
    case _.inch: return inchToPx(value, ppi)
    case _.point: return ptToPx(value, ppi)
    case _.pica: return picaToPx(value)
    case _.distance: return distanceToPx(value, ppi)
    case _.percent: return prctToPx(value, percentReference)
  }
}

export function toPx(uv: UV, ppi?: number, percentReference?: number): number {
  return toPixel(uv.value || 0, uv.unit || UnitAbbreviation.pixel, ppi, percentReference)
}

export function pixelTo(pixel: number, unit: UnitAbbreviation, ppi?: number, percentReference?: number): number {
  const _ = UnitAbbreviation
  switch (unit) {
    case _.pixel: return pixel
    case _.millimeter: return pxToMm(pixel, ppi)
    case _.centimeter: return pxToCm(pixel, ppi)
    case _.inch: return pxToInch(pixel, ppi)
    case _.point: return pxToPt(pixel, ppi)
    case _.distance: return pxToDistance(pixel, ppi)
    case _.pica: return pxToPica(pixel)
    case _.percent: return pxToPrct(pixel, percentReference)
  }
}