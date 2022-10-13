import type { NextApiRequest, NextApiResponse } from 'next'
import fs, { mkdirSync } from 'fs'

const path = require('path').resolve('./images')

const html = (text: string) => `
<html>
<head></head>
<body>
<h1 style="text-align: center">${text}</h1>
<hr>
<div style="text-align: center">MiraiApi - Mikusa Random Image Api</div>
</body>
</html>
`
const err = (text: string) => `
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (fs.existsSync(path)) {
      const pathStat = fs.statSync(path)
      if (pathStat.isDirectory()) {
        const pathList = fs
          .readdirSync(path)
          .filter(item => fs.statSync(`${path}/${item}`)?.isDirectory())
          .map(item => ({ year: item, path: `${path}/${item}` }))
          .filter(item => fs.statSync(item.path)?.isDirectory())
          .map(item => {
            /** 遍历年目录，获取月目录地址 */
            const path = item.path
            return {
              ...item,
              items: fs
                .readdirSync(item.path)
                .filter(item => fs.statSync(`${path}/${item}`)?.isDirectory())
                .map(item => ({ month: item, path: `${path}/${item}` }))
                .filter(item => fs.statSync(item.path)?.isDirectory())
                .map(item => {
                  /** 遍历月目录，获取图片文件地址 */
                  const path = item.path
                  return {
                    ...item,
                    items: fs
                      .readdirSync(path)
                      .filter(item => fs.statSync(`${path}/${item}`)?.isFile())
                      .map(item => `${path}/${item}`)
                  }
                })
            }
          })
        fs.writeFileSync(
          `${path}/index.json`,
          JSON.stringify(pathList),
          'utf-8'
        )
        res.status(200).send(html('Fresh OK'))
      }
    } else {
      fs.mkdirSync(path)
    }
  } catch (e) {
    res.status(500).send(err(JSON.stringify(e)))
  }
}
