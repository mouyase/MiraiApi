import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import random from '../../../libs/util/random'
import getFileIndex from '../../../libs/common/getFileIndex'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fileIndex = await getFileIndex()
    const { slug } = req.query
    const [year, month] = slug as string[]
    let yearIndex, monthIndex, imagePath, image
    if (year) {
      yearIndex = fileIndex.find((item: any) => item.year === year)
    }
    if (month) {
      monthIndex = yearIndex.items.find((item: any) => item.month === month)
    } else {
      monthIndex = yearIndex.items[random(yearIndex.items.length - 1)]
    }
    imagePath = monthIndex.items[random(monthIndex.items.length - 1)]
    image = fs.readFileSync(imagePath)
    res.setHeader('Content-Type', 'image/webp')
    res.status(200).send(image)
  } catch (e) {
    res.redirect(307, '/api/v1')
  }
}
