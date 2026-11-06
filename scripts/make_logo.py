import base64
from PIL import Image

im = Image.open('assets/logo.jpg').convert('RGBA')
pixels = im.load()
w, h = im.size

new_im = Image.new('RGBA', (w, h), (0, 0, 0, 0))
new_pixels = new_im.load()

# Thresholds for clean background removal:
# Background is dark around lum <= 32
# Transition range 32 to 62 provides anti-aliasing without black halo
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        if lum <= 32:
            new_pixels[x, y] = (0, 0, 0, 0)
        elif lum >= 62:
            new_pixels[x, y] = (r, g, b, 255)
        else:
            alpha = int(255 * (lum - 32) / (62 - 32))
            # Slightly brighten the semi-transparent edge to prevent dark halos
            factor = min(1.3, 255 / max(1, lum))
            new_pixels[x, y] = (
                min(255, int(r * factor)),
                min(255, int(g * factor)),
                min(255, int(b * factor)),
                alpha
            )

bbox = new_im.getbbox()
cropped = new_im.crop(bbox)
cw, ch = cropped.size
cropped.save('assets/logo-transparent.png')

with open('assets/logo-transparent.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

# Transparent SVG for navbar and header
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}" width="100%" height="100%">
  <image href="data:image/png;base64,{b64}" width="{cw}" height="{ch}" preserveAspectRatio="xMidYMid meet" />
</svg>
'''

with open('assets/logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

# Transparent square SVG for Favicon
sq = max(cw, ch) + 20
off_x = (sq - cw) // 2
off_y = (sq - ch) // 2

favicon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {sq} {sq}" width="100%" height="100%">
  <image href="data:image/png;base64,{b64}" x="{off_x}" y="{off_y}" width="{cw}" height="{ch}" preserveAspectRatio="xMidYMid meet" />
</svg>
'''

with open('assets/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(favicon_svg)

print("Saved transparent logo.svg and favicon.svg successfully.")
