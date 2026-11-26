import sys
D = sys.argv[1]
css = open(f"{D}/app.css").read().replace("</style", "<\\/style")
js = open(f"{D}/app.js").read().replace("</script", "<\\/script")
html = f"""<title>Philosophe</title>
<meta name="description" content="Deviens philosophe en dialoguant avec les siècles.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&family=Inter:wght@400;500;600&display=swap">
<style>
:root{{--font-fraunces:"Fraunces";--font-inter:"Inter";color-scheme:dark}}
html{{height:100%;-webkit-font-smoothing:antialiased;background:#06060b}}
body{{min-height:100%;margin:0;background:#06060b;color:#fff}}
#root{{display:flex;flex-direction:column;min-height:100svh}}
</style>
<style>{css}</style>
<div id="root"></div>
<script>{js}</script>
"""
open(f"{D}/philosophe.html", "w").write(html)
