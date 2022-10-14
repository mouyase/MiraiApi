import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import random from '../../../libs/util/random'
import getFileIndex from '../../../libs/common/getFileIndex'
import getRandomFile from '../../../libs/common/getRandomFile'

const path = require('path').resolve('./images/index.json')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const image = await getRandomFile([])
    res.setHeader('Content-Type', 'image/webp')
    res.status(200).send(image)
  } catch (e) {
    res.status(500).end()
  }
}
