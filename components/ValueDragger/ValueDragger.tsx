import React, { useCallback } from "react"

interface Props {
  onDragEnd?: () => void
  onDeltaChange?: (px: number) => void
}

const ValueDragger: React.FC<Props> = ({ children, onDragEnd, onDeltaChange }) => {

  let lastPos: number

  const moveListener = useCallback((e: MouseEvent) => {
    e.preventDefault()
    const delta = lastPos - e.pageY;
    lastPos = e.clientY
    if (delta !== 0 && onDeltaChange) {
      onDeltaChange(delta)
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    lastPos = e.clientY
    const upListener = () => {
      if (onDragEnd) { onDragEnd() }
      document.removeEventListener('mousemove', moveListener)
      document.removeEventListener('mouseup', upListener)
    }
    document.addEventListener('mousemove', moveListener);
    document.addEventListener('mouseup', upListener);
  }, [])

  return (
    <div onMouseDown={handleMouseDown} style={{ cursor: 'ns-resize' }}>
      { children}
    </div>
  )
}

export default ValueDragger;