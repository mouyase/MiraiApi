export interface DirectoryStructure {
  name: string
  path: string
  children?: DirectoryStructure[]
  files?: string[]
}
