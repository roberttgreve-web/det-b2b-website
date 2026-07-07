#!/usr/bin/env python3
"""
Download all Figma CDN assets from the HTML files and rewrite paths to local /assets/.
Run from inside the Studio2B folder:  python3 download_assets.py
"""

import os, re, sys, urllib.request, urllib.error, mimetypes, hashlib, time

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR  = os.path.join(PROJECT_DIR, "assets")
os.makedirs(ASSETS_DIR, exist_ok=True)

HTML_FILES = [
    "index.html",
    "lehrkraefte.html",
    "medienbox.html",
    "videostunden.html",
    "videostunde-detail.html",
]

FIGMA_PATTERN = re.compile(r'https://www\.figma\.com/api/mcp/asset/([a-f0-9\-]+)')

EXT_MAP = {
    "image/png":  ".png",
    "image/jpeg": ".jpg",
    "image/jpg":  ".jpg",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
    "image/gif":  ".gif",
}

def guess_ext(url, content_type):
    ct = (content_type or "").split(";")[0].strip().lower()
    return EXT_MAP.get(ct, ".png")

def download(url, dest_path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        ct = resp.headers.get("Content-Type", "image/png")
        data = resp.read()
    return data, ct

def main():
    # 1. Collect all unique URLs across all files
    all_urls = {}  # url -> uuid
    for fname in HTML_FILES:
        path = os.path.join(PROJECT_DIR, fname)
        if not os.path.exists(path):
            print(f"  skip (not found): {fname}")
            continue
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        for m in FIGMA_PATTERN.finditer(content):
            url  = m.group(0)
            uuid = m.group(1)
            all_urls[url] = uuid

    print(f"Found {len(all_urls)} unique Figma asset URLs across {len(HTML_FILES)} files.\n")

    # 2. Download each asset
    url_to_local = {}   # figma_url -> "assets/filename.ext"
    already = {}        # uuid -> local path (avoid re-downloading same asset in multiple files)

    for i, (url, uuid) in enumerate(all_urls.items(), 1):
        short = uuid[:8]
        if uuid in already:
            url_to_local[url] = already[uuid]
            print(f"  [{i}/{len(all_urls)}] reuse  {short}…  →  {already[uuid]}")
            continue

        # Probe existing files with this uuid prefix
        existing = [f for f in os.listdir(ASSETS_DIR) if f.startswith(short)]
        if existing:
            local_rel = f"assets/{existing[0]}"
            url_to_local[url] = local_rel
            already[uuid] = local_rel
            print(f"  [{i}/{len(all_urls)}] cached {short}…  →  {local_rel}")
            continue

        # Download
        try:
            data, ct = download(url, None)
            ext      = guess_ext(url, ct)
            fname_dl = f"{short}{ext}"
            dest     = os.path.join(ASSETS_DIR, fname_dl)
            with open(dest, "wb") as f:
                f.write(data)
            local_rel = f"assets/{fname_dl}"
            url_to_local[url] = local_rel
            already[uuid]     = local_rel
            kb = len(data) // 1024
            print(f"  [{i}/{len(all_urls)}] ✓  {short}…  {ct.split('/')[1]:<6}  {kb:>5} KB  →  {local_rel}")
        except Exception as e:
            print(f"  [{i}/{len(all_urls)}] ✗  {short}…  ERROR: {e}")
            url_to_local[url] = url   # keep original URL if download fails

        time.sleep(0.05)   # gentle rate limit

    # 3. Rewrite HTML files
    print(f"\nRewriting HTML files…")
    for fname in HTML_FILES:
        path = os.path.join(PROJECT_DIR, fname)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        original = content
        for figma_url, local_path in url_to_local.items():
            content = content.replace(figma_url, local_path)
        if content != original:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
            count = sum(1 for u in url_to_local if original.count(u) > 0)
            print(f"  ✓  {fname}  ({count} URLs replaced)")
        else:
            print(f"  –  {fname}  (no changes)")

    print(f"\nDone. Assets saved to: {ASSETS_DIR}")
    downloaded = sum(1 for v in url_to_local.values() if not v.startswith("http"))
    failed     = sum(1 for v in url_to_local.values() if v.startswith("http"))
    print(f"  Downloaded : {downloaded}")
    if failed:
        print(f"  Failed     : {failed}  (kept original CDN URLs)")

if __name__ == "__main__":
    main()
