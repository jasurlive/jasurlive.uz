import { useEffect, useState } from 'react'

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches

const shuffle = <T,>(list: T[]) => [...list].sort(() => Math.random() - 0.5)

// types a word, waits, deletes it, moves to the next one (loops forever)
export function useTypewriter(words: string[], { type = 55, erase = 20, hold = 3500 } = {}) {
  const [order] = useState(() => shuffle(words))
  const [i, setI] = useState(0)
  const [len, setLen] = useState(0)
  const [erasing, setErasing] = useState(false)

  const word = order[i % order.length]

  useEffect(() => {
    if (REDUCED) {
      const t = setTimeout(() => setI((n) => n + 1), hold)
      return () => clearTimeout(t)
    }

    const done = !erasing && len === word.length
    const empty = erasing && len === 0
    const t = setTimeout(
      () => {
        if (done) setErasing(true)
        else if (empty) {
          setErasing(false)
          setI((n) => n + 1)
        } else setLen((l) => l + (erasing ? -1 : 1))
      },
      done ? hold : erasing ? erase : type,
    )
    return () => clearTimeout(t)
  }, [len, erasing, word, type, erase, hold])

  return REDUCED ? word : word.slice(0, len)
}
