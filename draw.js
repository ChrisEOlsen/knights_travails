const draw = (() => {
  const drawGameBoard = () => {
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        cell.id = y * 8 + x

        //Choose color
        if (y % 2 == 0) {
          x % 2 == 0 ? cell.classList.add("black") : cell.classList.add("white")
        } else {
          x % 2 == 0 ? cell.classList.add("white") : cell.classList.add("black")
        }
        document.getElementById("chess-board").appendChild(cell)
      }
  }

  return { drawGameBoard }
})()

draw.drawGameBoard()

const knightsTravails = (() => {
  const knightMoves = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
  ]

  // Create an adjacency list for the board
  let adjList = Array(64)
    .fill()
    .map(() => [])

  // Populate adjacency list with arrays of the neighbouring cells for each cell
  const populateList = list => {
    for (let i = 0; i < list.length; i++) {
      let x = i % 8
      let y = Math.floor(i / 8)

      for (let moves of knightMoves) {
        let newX = x + moves[0]
        let newY = y + moves[1]

        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && Math.abs(newX - x) <= 2 && Math.abs(newY - y) <= 2) {
          list[i].push(newY * 8 + newX)
        }
      }
    }
  }
  populateList(adjList)

  let parent = Array(64).fill(-1) //keeps track of parent index

  // BFS algorithm to find the shortest path from start to end
  const shortestPath = (start, end) => {
    let queue = [start] //queue next cells to visit
    let visited = Array(64).fill(false) //Keeps track of visited cells
    visited[start] = true //initiate first visit

    while (queue.length) {
      let current = queue.shift()

      //Loop through the neighbour cells of each cell (which are 1 possible knights jump away)
      for (let neighbour of adjList[current]) {
        if (!visited[neighbour]) {
          visited[neighbour] = true
          parent[neighbour] = current
          queue.push(neighbour)
        }
        if (neighbour === end) return
      }
    }

    return -1 // No path found (should never happen with knight)
  }

  function getPath(start, end) {
    let path = [end]
    while (path[path.length - 1] !== start) {
      path.push(parent[path[path.length - 1]])
    }
    return path.reverse()
  }

  return { shortestPath, getPath }
})()

const events = (() => {
  const instruct = document.getElementById("instruct")
  const chessBoard = document.getElementById("chess-board")
  const cells = document.querySelectorAll(".cell")
  const resultButton = document.getElementById("result-button")
  const resetButton = document.getElementById("reset-button")

  let startIndex = null
  let endIndex = null
  let startToggle = true
  let validClickCount = 0

  const resetCells = () => {
    cells.forEach(c => {
      if (c.classList.contains("black")) {
        c.className = ""
        c.classList.add("cell")
        c.classList.add("black")
      } else {
        c.className = ""
        c.classList.add("cell")
        c.classList.add("white")
      }
      c.textContent = ""
    })
    startToggle = true
    startIndex = null
    endIndex = null
    validClickCount = 0
    instruct.textContent = "CLICK ON START POSITION"
  }

  const displayPath = (start, end) => {
    if (validClickCount != 2) return
    knightsTravails.shortestPath(start, end)
    let path = knightsTravails.getPath(start, end)
    let steps = 0
    for (let i = 0; i < path.length; i++) {
      const foundCell = document.getElementById(path[i])
      foundCell.classList.add("path")
      foundCell.textContent = steps
      steps++
    }
    instruct.textContent = "SHORTEST PATH:"
  }

  const initEvents = () => {
    chessBoard.addEventListener("click", e => {
      let element = e.target

      if (element.classList.contains("cell") && validClickCount < 2) {
        let type

        if (startToggle) {
          instruct.textContent = "CLICK ON END POSITION"
          startIndex = parseInt(element.id)
          type = "start"
        } else {
          instruct.textContent = "CLICK FIND PATH"
          endIndex = parseInt(element.id)
          type = "end"
        }

        element.classList.add(type)
        startToggle = !startToggle
        validClickCount++
      }
    })

    resultButton.addEventListener("click", () => displayPath(startIndex, endIndex))
    resetButton.addEventListener("click", resetCells)
  }

  return { initEvents }
})()

events.initEvents()
