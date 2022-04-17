const qipanInit = function (ref_qipan, qizipre, qizis) {
  const cxt = ref_qipan.getContext('2d')
  cxt.lineWidth = 1
  cxt.strokeStyle = 'black'
  cxt.fillStyle = '#E6A23C'
  cxt.fillRect(0, 0, 601, 601)
  for (let i = 0; i < 15; i++) {
    cxt.moveTo(i * 40 + 0.5 + 20, 0 + 20)
    cxt.lineTo(i * 40 + 0.5 + 20, 561 + 20)
    cxt.moveTo(0 + 20, i * 40 + 0.5 + 20)
    cxt.lineTo(561 + 20, i * 40 + 0.5 + 20)
    // 1px问题，canvas的线条画法不一样，canvas的每条线都有一条无限细的“中线”，线条的宽度是从中线向两侧延伸的。
  }
  cxt.stroke()
  cxt.fillStyle = '#000000'
  cxt.beginPath()
  cxt.arc(120 + 0.5 + 20, 120 + 0.5 + 20, 4, 0, Math.PI * 2)
  cxt.closePath()
  cxt.fill()
  cxt.beginPath()
  cxt.arc(440 + 0.5 + 20, 120 + 0.5 + 20, 4, 0, Math.PI * 2)
  cxt.closePath()
  cxt.fill()
  cxt.beginPath()
  cxt.arc(120 + 0.5 + 20, 440 + 0.5 + 20, 4, 0, Math.PI * 2)
  cxt.closePath()
  cxt.fill()
  cxt.beginPath()
  cxt.arc(440 + 0.5 + 20, 440 + 0.5 + 20, 4, 0, Math.PI * 2)
  cxt.closePath()
  cxt.fill()

  qiziPreInit(qizipre.x, qizipre.y, ref_qipan)

  for (let i = 0; i < qizis.length; i++) {
    qiziInit(qizis[i].x, qizis[i].y, i, ref_qipan)
  }
}

const qiziPreInit = function (x, y, ref_qipan) {
  // x,y是坐标,画上预选位置
  if (x === -1 || y === -1) {
    return
  }
  x *= 40
  y *= 40
  const cxt = ref_qipan.getContext('2d')
  cxt.moveTo(x + 16 + 0.5 + 20, y + 2 + 0.5 + 20)
  cxt.lineTo(x + 2 + 0.5 + 20, y + 2 + 0.5 + 20)
  cxt.lineTo(x + 2 + 0.5 + 20, y + 16 + 0.5 + 20)

  cxt.moveTo(x - 16 + 0.5 + 20, y + 2 + 0.5 + 20)
  cxt.lineTo(x - 2 + 0.5 + 20, y + 2 + 0.5 + 20)
  cxt.lineTo(x - 2 + 0.5 + 20, y + 16 + 0.5 + 20)

  cxt.moveTo(x + 16 + 0.5 + 20, y - 2 + 0.5 + 20)
  cxt.lineTo(x + 2 + 0.5 + 20, y - 2 + 0.5 + 20)
  cxt.lineTo(x + 2 + 0.5 + 20, y - 16 + 0.5 + 20)

  cxt.moveTo(x - 16 + 0.5 + 20, y - 2 + 0.5 + 20)
  cxt.lineTo(x - 2 + 0.5 + 20, y - 2 + 0.5 + 20)
  cxt.lineTo(x - 2 + 0.5 + 20, y - 16 + 0.5 + 20)
  cxt.stroke()
}
const qiziInit = function (x, y, n, ref_qipan) {
  // x,y是棋子坐标,n是棋子次序,画上棋子
  x *= 40
  y *= 40
  const cxt = ref_qipan.getContext('2d')

  if (n % 2 === 0) {
    cxt.fillStyle = '#000000'
  } else {
    cxt.fillStyle = '#ffffff'
  }

  cxt.beginPath()
  cxt.arc(x + 0.5 + 20, y + 0.5 + 20, 18, 0, Math.PI * 2)
  cxt.closePath()
  cxt.fill()
}
const getQiziXY = function (e, ref_qipan, qizipre, qizis) {
  // 获取x,y坐标
  let x = e.offsetX - 20
  let y = e.offsetY - 20

  if (
    ((x % 40 >= 0 && x % 40 <= 10) || (x % 40 >= 30 && x % 40 < 40)) &&
    ((y % 40 >= 0 && y % 40 <= 10) || (y % 40 >= 30 && y % 40 < 40))
  ) {
    x = parseInt((x + 20) / 40)
    y = parseInt((y + 20) / 40)
    if (x === qizipre.x && y === qizipre.y) {
      qizis.push({
        x,
        y,
      })
      qizipre.x = -1
      qizipre.y = -1
    } else {
      qizipre.x = x
      qizipre.y = y
    }
    qipanInit(ref_qipan, qizipre, qizis)
  }
}
export { qipanInit, qiziPreInit, qiziInit, getQiziXY }
