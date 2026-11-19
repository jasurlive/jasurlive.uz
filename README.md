# jasurlive.uz

<img width="60%" alt="image" src="https://github.com/user-attachments/assets/a308be95-18ca-4ba4-a7ee-fdb58e3ba961" />
<img width="30%" alt="image" src="https://github.com/user-attachments/assets/29511947-12ef-4539-b61a-0febf6b7e671" />

Personal site — **[jasurlive.uz](https://jasurlive.uz)**

Built on the [django-react](https://github.com/jasurlive/django-react) front template · React 19 · Vite · TypeScript · Vercel

## Quick start

```bash
npm install
npm run dev     # http://localhost:1212
npm run build   # → dist/
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run preview`.

Copy `.env.example` to `.env` to toggle extra themes.

## Structure

```
api/              serverless functions (visit counter)
scripts/          add.py content helper
src/
├── app/          main.tsx, App.tsx (routes)
├── pages/        one file per route
├── components/   UI pieces
├── shared/       Menu, ThemePicker
├── hooks/LOCAL/  browser-only hooks
├── lib/          themes, trackVisit
├── css/          styles
├── data/         site.ts, content.ts, *.csv
└── media/        slides/
```

## Content

| What | Where |
| --- | --- |
| Text, projects, resume | `src/data/site.ts` |
| Awards / talks | `src/data/*.csv` |
| Home slides | `src/media/slides/` |

Or run `python scripts/add.py award|talk|slide <files>`.

## Contributing

Found a bug or typo? Contributions are welcome.

1. Fork and create a branch
2. Make your change, then run `npm run lint && npm run typecheck`
3. Open a pull request

For bigger ideas, open an [issue](https://github.com/jasurlive/jasurlive.uz/issues) first.

## License

[Apache 2.0](LICENSE)
