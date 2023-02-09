import { useEffect, useRef } from "react"

type ElementEventMap = HTMLElementEventMap & WindowEventMap

type EventType<T extends keyof ElementEventMap> = ElementEventMap[T]

// Hook
function useEventListener<
  T extends keyof ElementEventMap,
  Element extends HTMLElement | (Window & typeof globalThis)
>(eventName: T, handler: (event: EventType<T>) => void, element: Element) {
  element = element || window

  // Create a ref that stores handler
  const savedHandler = useRef<typeof handler>()

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener
      if (!isSupported) return
      if (!savedHandler.current) return

      // Create event listener that calls handler function stored in ref
      const eventListener: typeof handler = (event) => savedHandler.current(event)

      // Add event listener
      element.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element] // Re-run if eventName or element changes
  )
}

export default useEventListener
