import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import cache from '../../../../libs/cache'
import { log } from '../../../../libs/util/log'
import { DirectoryStructure } from '../../../../libs/common/type'

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

const getDirectoryStructure = (
  item: DirectoryStructure
): DirectoryStructure => {
  const path = item.path
  return {
    ...item,
    children: fs
      .readdirSync(item.path)
      .filter(item => fs.statSync(`${path}/${item}`).isDirectory())
      .map(item => ({ name: item, path: `${path}/${item}` }))
      .map(item => getDirectoryStructure(item)),
    files: fs
      .readdirSync(item.path)
      .filter(item => fs.statSync(`${path}/${item}`).isFile())
      .map(item => `${path}/${item}`)
      .filter(
        item =>
          item.toLowerCase().endsWith('.jpg') ||
          item.toLowerCase().endsWith('.jpeg') ||
          item.toLowerCase().endsWith('.png') ||
          item.toLowerCase().endsWith('.bmp') ||
          item.toLowerCase().endsWith('.gif') ||
          item.toLowerCase().endsWith('.webp')
      )
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (fs.existsSync(path)) {
      const pathStat = fs.statSync(path)
      if (pathStat.isDirectory()) {
        const directoryStructure = getDirectoryStructure({ name: '/', path })
        fs.writeFileSync(
          `${path}/index.json`,
          JSON.stringify(directoryStructure),
          'utf-8'
        )
        log('刷新完成')
        await cache.set('fileIndex', directoryStructure)
        log('写入缓存')
        res.status(200).send(html('Fresh OK'))
      }
    } else {
      fs.mkdirSync(path)
    }
  } catch (e) {
    res.status(500).send(err(JSON.stringify(e)))
  }
}
