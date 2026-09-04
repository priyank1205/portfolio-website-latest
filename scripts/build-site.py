"""Stage the existing static portfolio for Sites without adding dependencies."""

from pathlib import Path
import shutil


root = Path(__file__).resolve().parent.parent
output = root / "dist"
output.mkdir(exist_ok=True)

for page in root.glob("*.html"):
    shutil.copy2(page, output / page.name)

for directory in ("assets", "projects"):
    shutil.copytree(
        root / directory,
        output / directory,
        dirs_exist_ok=True,
        ignore=shutil.ignore_patterns(".DS_Store"),
    )

assert (output / "index.html").is_file()
assert (output / "projects" / "khiladipro.html").is_file()
print("Static portfolio ready in dist/.")
