# jasurlive.uz

<img width="60%" alt="image" src="https://github.com/user-attachments/assets/a308be95-18ca-4ba4-a7ee-fdb58e3ba961" />
<img width="30%" alt="image" src="https://github.com/user-attachments/assets/29511947-12ef-4539-b61a-0febf6b7e671" />


Personal site built on the [django-react](https://github.com/jasurlive/django-react) front template (React 19 + Vite + TypeScript).

```bash
npm install
npm run dev     # http://localhost:1212
npm run build   # dist/
```

## Structure

```
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
| Awards / portfolio / talks | `src/data/*.csv` |
| Home slides | `src/media/slides/` |

Or run `python scripts/add.py award|portfolio|talk|slide <files>`.
