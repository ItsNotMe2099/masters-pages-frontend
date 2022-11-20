import { useState, useEffect, MutableRefObject } from 'react'

export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState)

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive)
      }
    }

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }

  }, [isActive, el])
  return [isActive, setIsActive]
}

export function listenForOutsideClicks(listening: boolean, setListening: (val: boolean) => void, menuRef: MutableRefObject<any>, setIsOpen: (val: boolean) => void) {
  return () => {
    if (listening) return
    if (!menuRef.current) return
    setListening(true);
    ['click', 'touchstart'].forEach((type) => {
      document.addEventListener('click', (evt) => {
        if (menuRef.current && menuRef.current.contains(evt.target)) return
        setIsOpen(false)
      })
    })
  }
}
