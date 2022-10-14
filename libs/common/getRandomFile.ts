import cache from '../cache'
import { log } from '../util/log'
import fs from 'fs'
import getFileIndex from './getFileIndex'
import { DirectoryStructure } from './type'
import random from '../util/random'

const getChildren = (directoryStructure: DirectoryStructure): string[] => {
  let fileList: string[] = directoryStructure.files as string[]
  directoryStructure?.children?.forEach((item: DirectoryStructure) => {
    fileList = [...fileList, ...(item.files ? item.files : [])]
    if (item.children && item.children.length > 0) {
      fileList = [...fileList, ...getChildren(item)]
    }
  })
  return fileList
}

export default async function getRandomFile(slug: string[]) {
  const fileIndex = await getFileIndex()
  let targetFileIndex = fileIndex
  slug.forEach(name => {
    targetFileIndex = targetFileIndex.children.find(
      (item: DirectoryStructure) => item.name === name
    )
  })
  let fileList: string[] = getChildren(targetFileIndex)
  const imagePath = fileList[random(fileList.length - 1)]
  return fs.readFileSync(imagePath)
}
