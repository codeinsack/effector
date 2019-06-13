import React from "react"
import { createStore, clearNode, is } from "effector"
import { useStore as useStoreNative } from "effector-react"

function noop() {
}

export function useStore(storeOrCallBack) {
  const storeRef = React.useRef()
  const unsubscribeRef = React.useRef()
  if (storeRef.current === undefined) {
    if (typeof storeOrCallBack === "function") {
      let store = storeOrCallBack()

      if (Array.isArray(store)) {
        const tuple = store
        store = tuple[0]
        unsubscribeRef.current = tuple[1]
      }

      storeRef.current = store
    } else {
      storeRef.current = storeOrCallBack
      unsubscribeRef.current = noop
    }
  }

  React.useEffect(
    () => () => {
      console.log("unsubscribeRef")
      unsubscribeRef.current()
      clearNode(storeRef.current)
    },
    [],
  )

  return useStoreNative(storeRef.current)
}

export function mapSafety(store, mapper, unmount) {
  if (!is.store(store)) throw new TypeError("Invalid store")
  if (typeof mapper !== "function") throw new TypeError("Invalid mapper")

  const storeMapped = createStore(mapper(store.getState()))
    .on(
      store,
      (_, newState) => mapper(newState),
    )

  unmount.watch(() => {
    storeMapped.off(store)
    clearNode(storeMapped)
  })

  return storeMapped
}
