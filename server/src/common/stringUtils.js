// eslint-disable-next-line no-control-regex
const newLineRegex = new RegExp(/(\r\n|\n|\r|\\u000c)/, 'gm')
const multiSpaceRegex = new RegExp(/\s+/, 'gm')
export function tidyNewLines (string){
  return string.replace(newLineRegex, ' ').replace(multiSpaceRegex, ' ')
}