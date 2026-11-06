import base64

with open('assets/logo.jpg', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 588 396" width="100%" height="100%">
  <defs>
    <clipPath id="logo-clip">
      <rect width="588" height="396" rx="40" ry="40" />
    </clipPath>
  </defs>
  <rect width="588" height="396" fill="#0c0d10" rx="40" />
  <image href="data:image/jpeg;base64,{b64}" width="588" height="396" preserveAspectRatio="xMidYMid slice" clip-path="url(#logo-clip)" />
</svg>
'''

with open('assets/logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

favicon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 396 396" width="100%" height="100%">
  <defs>
    <clipPath id="fav-clip">
      <rect width="396" height="396" rx="80" ry="80" />
    </clipPath>
  </defs>
  <rect width="396" height="396" fill="#0c0d10" rx="80" />
  <g clip-path="url(#fav-clip)">
    <image href="data:image/jpeg;base64,{b64}" x="-96" y="0" width="588" height="396" preserveAspectRatio="none" />
  </g>
</svg>
'''

with open('assets/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(favicon_svg)

print("assets/logo.svg and assets/favicon.svg successfully written.")
