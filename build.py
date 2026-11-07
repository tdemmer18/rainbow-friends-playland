"""Build index.html (standalone, GitHub Pages) from src/app.html (the Claude artifact source)."""
from pathlib import Path
root = Path(__file__).parent
s = (root / "src" / "app.html").read_text()

# Print: use Claude's save dialog when it exists, otherwise hand the PDF to the browser.
old_guard = '  if(!dl){toast("Printing works when this page is opened in Claude.");return}\n'
assert s.count(old_guard) == 1
s = s.replace(old_guard, "")
old_save = '    await dl.save({filename:`${c.name} coloring page.pdf`,data:doc.output("blob")});\n'
new_save = '''    const fname=`${c.name} coloring page.pdf`,pdf=doc.output("blob");
    if(dl)await dl.save({filename:fname,data:pdf});
    else{const url=URL.createObjectURL(pdf),a=document.createElement("a");a.href=url;a.download=fname;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),120000)}
'''
assert s.count(old_save) == 1
s = s.replace(old_save, new_save)
s = s.replace('toast("Your coloring page is ready! Open it and tap Print.")',
              'toast("Your coloring page is ready! Open it, tap Share, then Print.")')

head = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Playland">
<meta name="theme-color" content="#bfe6ff">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" type="image/png" href="icon-192.png">
<link rel="manifest" href="manifest.webmanifest">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
"""
(root / "index.html").write_text(head + s + "\n</body>\n</html>\n")
print("built index.html")
