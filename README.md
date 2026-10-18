# jasurlive.uz

Lightweight personal site built on [react-template](https://github.com/jasurlive/react-template)
(React 19 + Vite + TypeScript, simple and minimal).

Pages: Home · Resume · Portfolio · Awards · Blog · **Terminal** (`/terminal` — type `help`).
Themes: light · dark · matrix · sega (menu button / `ctrl+j` cycles them, or `theme sega` in the terminal).
The terminal opens fullscreen; `exit`, `cd <page>` or the red dot leaves it.

```bash
npm install
npm run dev     # http://localhost:1212
npm run build   # output in dist/
```

## Adding content (no code needed)

| What                | Where                         |
| ------------------- | ----------------------------- |
| Home swiper photos  | drop images in `src/media/slides/` |
| Awards              | `src/data/awards.csv` (+ images in `public/img/awards/`) |
| Portfolio           | `src/data/portfolio.csv` (image = URL or `/img/portfolio/x.webp`) |
| Talks (YouTube)     | `src/data/talks.csv` |
| Text / projects / resume | `src/tools/data/site.ts` |

Or use the helper (resizes + converts images to WebP if `pip install pillow`):

```bash
python scripts/add.py award
python scripts/add.py portfolio
python scripts/add.py talk
python scripts/add.py slide photo1.jpg photo2.jpg
```

`vercel.json` rewrites all paths to `index.html` so `/resume`, `/terminal` etc. work on refresh.
