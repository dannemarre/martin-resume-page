"""Render site/public/og-image.jpg, the 1200x630 link-preview card.

Same look as the site's hero banner: the headshot on the left, its studio backdrop
(martin-dannelind-backdrop.png, a 1px strip taken from the photo's right edge) stretched
across the card, and name, headline and tagline in white. Name, headline and tagline are
read from docs/profile/bio.md, so re-run this after changing any of them:

    python3 site/scripts/make-og-image.py

Needs Pillow and PyYAML. Uses macOS's Helvetica Neue (Inter is not installed locally).
"""

from pathlib import Path

import yaml
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "site/public"
W, H = 1200, 630
FONT = "/System/Library/Fonts/HelveticaNeue.ttc"


def frontmatter(path: Path) -> dict:
    return yaml.safe_load(path.read_text(encoding="utf-8").split("---")[1])


def wrap(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=font) <= width:
            line = trial
        else:
            lines.append(line)
            line = word
    return [*lines, line] if line else lines


def main() -> None:
    bio = frontmatter(ROOT / "docs/profile/bio.md")
    photo = Image.open(PUBLIC / bio["headshot"].lstrip("/")).convert("RGB")
    strip = Image.open(PUBLIC / bio["headshotBackdrop"].lstrip("/")).convert("RGB")

    card = strip.resize((W, H), Image.Resampling.BICUBIC)
    portrait = photo.resize((H, H), Image.Resampling.LANCZOS)
    # Feather the photo's right edge into the backdrop (the last 4% is backdrop only).
    mask = Image.new("L", (H, H), 255)
    fade = int(H * 0.06)
    for x in range(fade):
        for y in range(H):
            mask.putpixel((H - fade + x, y), int(255 * (1 - x / fade)))
    card.paste(portrait, (0, 0), mask)

    draw = ImageDraw.Draw(card)
    x, width = H + 20, W - H - 70
    # Largest name size (max 64px) that fits the text column with margin.
    size = 64
    while ImageFont.truetype(FONT, size, index=10).getlength(bio["name"]) > width and size > 36:
        size -= 2
    name_font = ImageFont.truetype(FONT, size, index=10)  # Helvetica Neue Medium
    head_font = ImageFont.truetype(FONT, 30, index=0)
    tag_font = ImageFont.truetype(FONT, 28, index=0)
    y = 170
    draw.text((x, y), bio["name"], font=name_font, fill=(255, 255, 255))
    y += 92
    draw.text((x, y), bio["headline"], font=head_font, fill=(255, 255, 255, 230))
    y += 64
    for line in wrap(draw, bio["tagline"], tag_font, width):
        draw.text((x, y), line, font=tag_font, fill=(214, 216, 219))
        y += 38

    out = PUBLIC / "og-image.jpg"
    card.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
