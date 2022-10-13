import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import random from '../../../libs/util/random'
import getFileIndex from '../../../libs/common/getFileIndex'

const path = require('path').resolve('./images/index.json')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileIndex = await getFileIndex()
  const yearIndex = fileIndex[random(fileIndex.length - 1)]
  const monthIndex = yearIndex.items[random(yearIndex.items.length - 1)]
  const imagePath = monthIndex.items[random(monthIndex.items.length - 1)]
  const image = fs.readFileSync(imagePath)
  res.setHeader('Content-Type', 'image/webp')
  res.status(200).send(image)
}
