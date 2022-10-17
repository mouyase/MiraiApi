export const html = (text: string) => `
<html>
<head></head>
<body>
<h1 style="text-align: center">${text}</h1>
<hr>
<div style="text-align: center">MiraiApi - Mikusa Random Image Api</div>
</body>
</html>
`
export const err = (text: string) => `
<html>
<head></head>
<body>
<h1 style="text-align: center">Error</h1>
<hr>
<pre>
<code>
${text}
</code>
</pre>
<hr>
<div style="text-align: center">MiraiApi - Mikusa Random Image Api</div>
</body>
</html>
`
export const err403 = `
<html>
<head></head>
<body>
<h1 style="text-align: center">403 Forbidden</h1>
<hr>
<div style="text-align: center">MiraiApi - Mikusa Random Image Api</div>
</body>
</html>
`
