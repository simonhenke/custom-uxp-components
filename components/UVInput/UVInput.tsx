import React, { useCallback, useEffect, useState } from 'react';
import { UnitAbbreviation, UV } from '../../types/plugin-specific';
import { classNames } from '../../util/string';

interface UVInputProps {
  value?: UV | UV[]
  id?: string
  multi?: boolean
  placeholder?: string
  disabled?: boolean
  className?: string
  noPercent?: boolean
  min?: number
  max?: number
  blockInvalidFromProps?: boolean
  onEnter?: (uvS: UV | UV[]) => void
  onChange?: (uvS: UV | UV[]) => void
}
const units = Object.values(UnitAbbreviation)

const UVInput: React.FC<UVInputProps> = ({ value, id, multi, placeholder, disabled,
   className, noPercent, min, max, blockInvalidFromProps, onEnter, onChange }) => {
  
  const [valid, setValid] = useState(false)
  const [text, setText] = useState("0px")

  useEffect(() => {
    if (value) {
      const isValid = uvsAreValid(value, noPercent, min, max)
      if(isValid || !blockInvalidFromProps) {
        setText(uvsToString(value))
        setValid(isValid)
      }
    }
  }, [value])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const uvs = stringToUvS(text, multi)
      if (onEnter && uvsAreValid(uvs, noPercent, min, max)) {
        onEnter(uvs)
      }
    }
  },[])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value
    const uvs = stringToUvS(str)
    const isValid = uvsAreValid(uvs, noPercent, min, max)
    setText(str)
    setValid(isValid)
    if (onChange && isValid) {
      onChange(uvs)
    }
  },[])
  
  return (
   
    <div className={classNames('input-wrapper', className)}>
      <input
        id={id}
        spellCheck={false}
        type="text"
        className={valid ? '' : 'invalid'}
        disabled={disabled}
        value={text}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        onChange={handleChange} />
    </div>
  )
}

export default UVInput

function uvsToString(uvs: UV | UV[]): string {
  if (Array.isArray(uvs)) {
    return uvs.map(uvObj => uvToString(uvObj)).join(' ')
  } else {
    return uvToString(uvs)
  }
}

export function uvToString(uv: UV): string {
  return (uv.value === 0 ? 0 : uv.value || '') + (uv.unit || '')
}

/* valid if the following 2 conditions are true 
 * 1) value is a number or unitvalue is empty
 * 2) unit is in allowedUnits or empty */
function uvsAreValid(uvs: UV | UV[], noPercent?: boolean, min?: number, max?: number) {
  if (Array.isArray(uvs)) {
    return (uvs as UV[]).every(uv => uvIsValid(uv, noPercent, min, max))
  } else {
    return uvIsValid(uvs as UV, noPercent, min, max)
  }
}

function uvIsValid(uv: UV, noPercent?: boolean, min?: number, max?: number) {
  const noValue = !uv.value
  const noUnit = !uv.unit
  const isNumber = !isNaN(uv.value)
  const allowedUnits = noPercent ? units.filter(u => u !== UnitAbbreviation.percent) : units
  const allowedUnit = allowedUnits.includes(uv.unit)
  const validNumber = ((noValue && noUnit) || isNumber) && 
    (typeof min !== 'undefined' ? uv.value >= min : true) &&
    (typeof max !== 'undefined' ? uv.value <= max : true)

  const validUnit = (!uv.unit || allowedUnit)
  return validNumber && validUnit

}

function stringToUv(uvStr: string): UV {
  const tuple = uvStr.split(/([0-9]+)/).filter(Boolean)
  return {
    value: parseFloat(tuple[0]),
    unit: tuple[1] as UnitAbbreviation
  }
}

function stringToUvS(str: string, multi?: boolean): UV | UV[] {
  if (multi) {
    const parts = str.split(' ')
    const uvs = parts.map(uvText => stringToUv(uvText))
    return uvs
  } else {
    return stringToUv(str)
  }
}