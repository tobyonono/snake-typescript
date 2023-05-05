export const formatScore = (value:number) => {
  return '0'
  .repeat(5 - (value*10).toString().length)
  .concat((value*10).toString())
}
