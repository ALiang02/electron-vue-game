<template>
  <canvas
    ref="c"
    width="1280"
    height="720"
    @click="
      () => {
        slot_show = !slot_show
      }
    "
  >
  </canvas>
  <v-slot v-show="slot_show">
    <div>12312</div>
  </v-slot>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const slot_show = ref(false)
const c = ref(null)
let ctx,
  w = 1280,
  h = 720

const opts = {
  lineCount: 100,
  starCount: 30,

  radVel: 0.01,
  lineBaseVel: 0.1,
  lineAddedVel: 0.1,
  lineBaseLife: 0.4,
  lineAddedLife: 0.01,

  starBaseLife: 10,
  starAddedLife: 10,

  ellipseTilt: -0.3,
  ellipseBaseRadius: 0.15,
  ellipseAddedRadius: 0.02,
  ellipseAxisMultiplierX: 2,
  ellipseAxisMultiplierY: 1,
  ellipseCX: w / 2,
  ellipseCY: h / 2,

  repaintAlpha: 0.015,
}
let lines = [],
  stars = [],
  tick = 0,
  first = true

function init() {
  lines.length = stars.length = 0

  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = '#333'
  ctx.fillRect(0, 0, w, h)

  if (first) {
    loop()
    first = false
  }
}

function loop() {
  window.requestAnimationFrame(loop)
  step()
  draw()
}

function step() {
  tick += 0.5

  if (lines.length < opts.lineCount && Math.random() < 0.5)
    lines.push(new Line())

  if (stars.length < opts.starCount) stars.push(new Star())

  lines.map(function (line) {
    line.step()
  })
  stars.map(function (star) {
    star.step()
  })
}

function draw() {
  ctx.shadowBlur = 0
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha)
  ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'lighter'

  ctx.translate(opts.ellipseCX, opts.ellipseCY)
  ctx.rotate(opts.ellipseTilt)
  ctx.scale(opts.ellipseAxisMultiplierX, opts.ellipseAxisMultiplierY)

  // ctx.shadowBlur here almost does nothing
  lines.map(function (line) {
    line.draw()
  })

  ctx.scale(1 / opts.ellipseAxisMultiplierX, 1 / opts.ellipseAxisMultiplierY)
  ctx.rotate(-opts.ellipseTilt)
  ctx.translate(-opts.ellipseCX, -opts.ellipseCY)

  stars.map(function (star) {
    star.draw()
  })
}

function Line() {
  this.reset()
}
Line.prototype.reset = function () {
  ;(this.rad = Math.random() * Math.PI * 2),
    (this.len =
      w * (opts.ellipseBaseRadius + Math.random() * opts.ellipseAddedRadius))
  this.lenVel = opts.lineBaseVel + Math.random() * opts.lineAddedVel

  this.x = this.px = Math.cos(this.rad) * this.len
  this.y = this.py = Math.sin(this.rad) * this.len

  this.life = this.originalLife =
    w * (opts.lineBaseLife + Math.random() * opts.lineAddedLife)

  this.alpha = 0.2 + Math.random() * 0.8
}
Line.prototype.step = function () {
  --this.life

  this.px = this.x
  this.py = this.y

  this.rad += opts.radVel
  this.len -= this.lenVel

  this.x = Math.cos(this.rad) * this.len
  this.y = Math.sin(this.rad) * this.len

  if (this.life <= 0) this.reset()
}
Line.prototype.draw = function () {
  var ratio = Math.abs(this.life / this.originalLife - 1 / 2)

  ctx.lineWidth = ratio * 5
  ctx.strokeStyle = ctx.shadowColor = 'hsla(hue, 80%, light%, alp)'
    .replace(
      'hue',
      tick +
        (this.x / (w * (opts.ellipseBaseRadius + opts.ellipseAddedRadius))) *
          100
    )
    .replace('light', 75 - ratio * 150)
    .replace('alp', this.alpha)
  ctx.beginPath()
  ctx.moveTo(this.px, this.py)
  ctx.lineTo(this.x, this.y)

  ctx.stroke()
}
function Star() {
  this.reset()
}

Star.prototype.reset = function () {
  this.x = Math.random() * w
  this.y = Math.random() * h
  this.life = opts.starBaseLife + Math.random() * opts.starAddedLife
}
Star.prototype.step = function () {
  --this.life

  if (this.life <= 0) this.reset()
}
Star.prototype.draw = function () {
  ctx.fillStyle = ctx.shadowColor = 'hsla(hue, 80%, 50%, .2)'.replace(
    'hue',
    tick + (this.x / w) * 100
  )
  ctx.shadowBlur = this.life
  ctx.fillRect(this.x, this.y, 1, 1)
}

onMounted(() => {
  ctx = c.value.getContext('2d')
  init()
})
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  z-index: 1;
}
div {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: azure;
  z-index: 2;
}
body {
  overflow: hidden;
}
</style>
