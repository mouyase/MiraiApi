import type { NextApiRequest, NextApiResponse } from 'next'
import getRandomFile from '../../../libs/common/getRandomFile'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query
    const image = await getRandomFile(slug as string[])
    res.setHeader('Content-Type', 'image/webp')
    res.status(200).send(image)
  } catch (e) {
    res.redirect(307, '/api/v1')
  }
}
