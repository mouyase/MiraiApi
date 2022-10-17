import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import random from '../../../libs/util/random'
import getFileIndex from '../../../libs/common/getFileIndex'
import getRandomFile from '../../../libs/common/getRandomFile'
import getPermission from '../../../libs/common/getPermission'
import { err403 } from '../../../libs/common/body'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { referer } = req.headers
    const hasPermission = await getPermission(referer as string)
    if (hasPermission) {
      const image = await getRandomFile([])
      res.setHeader('Content-Type', 'image/webp')
      res.status(200).send(image)
    } else {
      res.status(403).send(err403)
    }
  } catch (e) {
    res.status(500).end()
  }
}
