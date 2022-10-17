import type { NextApiRequest, NextApiResponse } from 'next'
import getRandomFile from '../../../libs/common/getRandomFile'
import getPermission from '../../../libs/common/getPermission'
import { err403 } from '../../../libs/common/body'
import { log } from '../../../libs/util/log'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query
    const { referer } = req.headers
    const hasPermission = await getPermission(referer as string)
    if (hasPermission) {
      const image = await getRandomFile(slug as string[])
      res.setHeader('Content-Type', 'image/webp')
      res.status(200).send(image)
    } else {
      res.status(403).send(err403)
    }
  } catch (e) {
    log('出现错误', JSON.stringify(e))
    res.redirect(307, '/api/v1')
  }
}
