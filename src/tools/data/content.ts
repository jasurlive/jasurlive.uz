import awardsCsv from '../../data/awards.csv?raw'
import portfolioCsv from '../../data/portfolio.csv?raw'
import talksCsv from '../../data/talks.csv?raw'

// minimal csv reader: header row + quoted fields ("a, b" and "" escapes)
function parseCsv<T>(text: string): T[] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false

  const endCell = () => {
    row.push(cell)
    cell = ''
  }
  const endRow = () => {
    endCell()
    rows.push(row)
    row = []
  }

  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c !== '"') cell += c
      else if (text[i + 1] === '"') cell += text[++i]
      else quoted = false
    } else if (c === '"') quoted = true
    else if (c === ',') endCell()
    else if (c === '\n') endRow()
    else if (c !== '\r') cell += c
  }
  if (cell || row.length) endRow()

  const [head, ...body] = rows
  return body
    .filter((r) => r.some(Boolean))
    .map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])) as T)
}

export type Award = { date: string; title: string; description: string; image: string }
export type Work = { title: string; description: string; link: string; image: string }
export type Talk = { date: string; title: string; url: string }

export const awards = parseCsv<Award>(awardsCsv)
export const portfolio = parseCsv<Work>(portfolioCsv)
export const talks = parseCsv<Talk>(talksCsv)

// every image dropped into src/media/slides shows up in the home swiper
export const slides = Object.values(
  import.meta.glob<string>('../../media/slides/*.{webp,jpg,jpeg,png,avif}', {
    eager: true,
    import: 'default',
  }),
)

export const youtubeId = (url: string) =>
  url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/)?.[1] ?? ''
