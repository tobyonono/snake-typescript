export const getNewAxys = (key:string, axys:Axys ) => {
  let newAxys: Axys = { row: 0, col: 0 };
  if ((key === "ArrowLeft" && axys.col === 1) ||
    (key === "ArrowRight" && axys.col === -1) ||
    (key === "ArrowUp" && axys.row === 1) ||
    (key === "ArrowDown" && axys.row === -1)
  ) return axys

  switch (key) {
    case ("ArrowUp"): {
      newAxys = { row: -1, col: 0 };
      break
    }
    case "ArrowDown": {
      newAxys = { row: 1, col: 0 };
      break
    }
    case "ArrowLeft": {
      newAxys = { row: 0, col: -1 };
      break
    }
    case "ArrowRight": {
      newAxys = { row: 0, col: 1 };
      break
    }
  }
  return newAxys
}