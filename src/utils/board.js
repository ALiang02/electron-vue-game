import store from '@/store'
class Board {
  constructor(board) {
    this.board = board.getContext('2d')
  }
  boardInit() {
    this.board.lineWidth = 1
    this.board.strokeStyle = 'black'
    this.board.fillStyle = '#E6A23C'
    this.board.fillRect(0, 0, 601, 601)
    this.board.beginPath()
    for (let i = 0; i < 15; i++) {
      this.board.moveTo(i * 40 + 0.5 + 20, 0 + 20)
      this.board.lineTo(i * 40 + 0.5 + 20, 561 + 20)
      this.board.moveTo(0 + 20, i * 40 + 0.5 + 20)
      this.board.lineTo(561 + 20, i * 40 + 0.5 + 20)
      // 1px问题，canvas的线条画法不一样，canvas的每条线都有一条无限细的“中线”，线条的宽度是从中线向两侧延伸的。
    }
    this.board.stroke()
    this.board.fillStyle = '#000000'
    this.board.beginPath()
    this.board.arc(120 + 0.5 + 20, 120 + 0.5 + 20, 4, 0, Math.PI * 2)
    this.board.closePath()
    this.board.fill()
    this.board.beginPath()
    this.board.arc(440 + 0.5 + 20, 120 + 0.5 + 20, 4, 0, Math.PI * 2)
    this.board.closePath()
    this.board.fill()
    this.board.beginPath()
    this.board.arc(120 + 0.5 + 20, 440 + 0.5 + 20, 4, 0, Math.PI * 2)
    this.board.closePath()
    this.board.fill()
    this.board.beginPath()
    this.board.arc(440 + 0.5 + 20, 440 + 0.5 + 20, 4, 0, Math.PI * 2)
    this.board.closePath()
    this.board.fill()

    this.chessPreInit()

    for (let i = 0; i < store.state.board.chesses.length; i++) {
      this.chessInit(store.state.board.chesses[i], i)
    }
  }
  chessPreInit() {
    let [x, y] = store.state.board.chessPre
    // x,y是坐标,画上预选位置
    if (x === -1 || y === -1) {
      return
    }
    x *= 40
    y *= 40
    this.board.beginPath()
    this.board.moveTo(x + 16 + 0.5 + 20, y + 2 + 0.5 + 20)
    this.board.lineTo(x + 2 + 0.5 + 20, y + 2 + 0.5 + 20)
    this.board.lineTo(x + 2 + 0.5 + 20, y + 16 + 0.5 + 20)

    this.board.moveTo(x - 16 + 0.5 + 20, y + 2 + 0.5 + 20)
    this.board.lineTo(x - 2 + 0.5 + 20, y + 2 + 0.5 + 20)
    this.board.lineTo(x - 2 + 0.5 + 20, y + 16 + 0.5 + 20)

    this.board.moveTo(x + 16 + 0.5 + 20, y - 2 + 0.5 + 20)
    this.board.lineTo(x + 2 + 0.5 + 20, y - 2 + 0.5 + 20)
    this.board.lineTo(x + 2 + 0.5 + 20, y - 16 + 0.5 + 20)

    this.board.moveTo(x - 16 + 0.5 + 20, y - 2 + 0.5 + 20)
    this.board.lineTo(x - 2 + 0.5 + 20, y - 2 + 0.5 + 20)
    this.board.lineTo(x - 2 + 0.5 + 20, y - 16 + 0.5 + 20)
    this.board.stroke()
  }
  chessPreReset() {
    let [x, y] = store.state.board.chessPre
    // x,y是坐标,画上预选位置
    if (x === -1 || y === -1) {
      return
    }
    x *= 40
    y *= 40
    this.board.fillStyle = '#E6A23C'
    this.board.fillRect(x + 2 + 0.5 + 20 - 0.5, y + 2 + 0.5 + 20 - 0.5, 15, 15)
    this.board.fillRect(
      x - 16 + 0.5 + 20 - 0.5,
      y - 16 + 0.5 + 20 - 0.5,
      15,
      15
    )
    this.board.fillRect(x + 2 + 0.5 + 20 - 0.5, y - 16 + 0.5 + 20 - 0.5, 15, 15)
    this.board.fillRect(x - 16 + 0.5 + 20 - 0.5, y + 2 + 0.5 + 20 - 0.5, 15, 15)
  }
  chessInit(chess, n) {
    // x,y是棋子坐标,n是棋子次序,画上棋子
    let [x, y] = chess
    x *= 40
    y *= 40
    if (n % 2 === 0) {
      this.board.fillStyle = '#000000'
    } else {
      this.board.fillStyle = '#ffffff'
    }
    this.board.beginPath()
    this.board.arc(x + 0.5 + 20, y + 0.5 + 20, 18, 0, Math.PI * 2)
    this.board.closePath()
    this.board.fill()
  }
  getXY(e) {
    // 获取x,y坐标
    let x = e.offsetX - 20
    let y = e.offsetY - 20

    if (
      ((x % 40 >= 0 && x % 40 <= 10) || (x % 40 >= 30 && x % 40 < 40)) &&
      ((y % 40 >= 0 && y % 40 <= 10) || (y % 40 >= 30 && y % 40 < 40))
    ) {
      x = parseInt((x + 20) / 40)
      y = parseInt((y + 20) / 40)
      return [x, y]
    } else {
      return [-1, -1]
    }
  }
  drawVctLine(line, n) {
    this.board.lineWidth = 10
    this.board.moveTo(line[0].x * 40 + 0.5 + 20, line[0].y * 40 + 0.5 + 20)
    this.board.lineTo(line[1].x * 40 + 0.5 + 20, line[1].y * 40 + 0.5 + 20)
    this.board.lineTo(line[2].x * 40 + 0.5 + 20, line[2].y * 40 + 0.5 + 20)
    this.board.lineTo(line[3].x * 40 + 0.5 + 20, line[3].y * 40 + 0.5 + 20)
    this.board.lineTo(line[4].x * 40 + 0.5 + 20, line[4].y * 40 + 0.5 + 20)
    if (n % 2 === 0) {
      this.board.strokeStyle = 'black'
    } else {
      this.board.strokeStyle = 'white'
    }
    this.board.stroke()
  }
}
export default Board
