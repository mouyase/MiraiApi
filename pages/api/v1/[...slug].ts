import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

const path = require('path').resolve('./images1')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  try {
    const pathStat = fs.statSync(path)
    if (pathStat?.isDirectory()) {

    }
    const { slug } = req.query
    // res.setHeader('Content-Type','image/*')
    res.status(200).json(pathStat)
  } catch (e) {
    res.status(404).end()
  }
}
