"""Add content to the site without touching code.

    python scripts/add.py award         # asks date, title, description, image
    python scripts/add.py portfolio     # asks title, description, link, image
    python scripts/add.py talk          # asks date, title, youtube url
    python scripts/add.py slide a.jpg   # adds photo(s) to the home swiper

Local images are resized + converted to .webp if Pillow is installed
(pip install pillow), otherwise copied as they are. Image URLs are kept as-is.
New rows go to the top of the csv (newest first).
"""
import csv
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"

TABLES = {
    "award": ("awards.csv", ["date", "title", "description", "image"], ROOT / "public" / "img" / "awards"),
    "portfolio": ("portfolio.csv", ["title", "description", "link", "image"], ROOT / "public" / "img" / "portfolio"),
    "talk": ("talks.csv", ["date", "title", "url"], None),
}
SLIDES = ROOT / "src" / "media" / "slides"


def save_image(src: str, folder: Path, max_size=1000) -> Path:
    path = Path(src.strip().strip('"')).expanduser()
    if not path.is_file():
        sys.exit(f"image not found: {path}")
    folder.mkdir(parents=True, exist_ok=True)
    try:
        from PIL import Image, ImageOps

        out = folder / (path.stem + ".webp")
        img = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        img.thumbnail((max_size, max_size))
        img.save(out, "WEBP", quality=65)
    except ImportError:
        out = folder / path.name
        shutil.copy(path, out)
    print(f"  saved {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")
    return out


def add_row(kind: str):
    file, fields, img_dir = TABLES[kind]
    row = {}
    for field in fields:
        value = input(f"{field}: ").strip()
        if field == "image" and value and not value.startswith("http"):
            value = "/" + save_image(value, img_dir).relative_to(ROOT / "public").as_posix()
        row[field] = value

    path = DATA / file
    with path.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fields, lineterminator="\n")
        writer.writeheader()
        writer.writerows([row, *rows])
    print(f"added to src/data/{file}")


if __name__ == "__main__":
    kind = sys.argv[1] if len(sys.argv) > 1 else ""
    if kind == "slide" and len(sys.argv) > 2:
        for image in sys.argv[2:]:
            save_image(image, SLIDES, max_size=1200)
    elif kind in TABLES:
        add_row(kind)
    else:
        print(__doc__)
