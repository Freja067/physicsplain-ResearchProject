import {
  State,
  Body,
  FixedArc,
  FixedBody,
  FixedCircle,
  Vector
} from './src/physicsplain.js'

/*
 * Main entry point.
 *
 * Creates examples, advances physics, and updates graphics.
 *
 * @author Martin Hentschel
 */
const canvasWidth = 500
const canvasHeight = 260

class Example1 extends State {
  constructor (document) {
    super()
    this.canvas = document.getElementById('canvas1')
    this.context = this.canvas.getContext('2d')
    this.backgroundColor = '#e0e5db'
    this.repeat = 4000 // repeat example every 4 seconds
    this.lastRepeat = 0

    // bodies
    this.movingBodies = []
    this.fixedBodies = []
    this.initBodies()

    // colors
    this.colors = []
    for (const body of this.movingBodies) {
      this.colors[body.id] = body.id === 0 ? '#00b8b8' : '#e4bd0b'
    }
    for (const body of this.fixedBodies) {
      this.colors[body.id] = '#de3d83'
    }
  }

  initBodies () {
    this.movingBodies = [
      new Body(0).setOrigin(-1.3, 0).finalize(),
      new Body(1).setOrigin(-0.4, 0.09).finalize(),
      new Body(2).setOrigin(-0.4, -0.09).finalize(),
      new Body(3).setOrigin(-0.2, 0.09).finalize(),
      new Body(4).setOrigin(-0.2, -0.09).finalize(),
      new Body(5).setOrigin(0.2, 0.09).finalize(),
      new Body(6).setOrigin(0.2, -0.09).finalize(),
      new Body(7).setOrigin(0.4, 0.09).finalize(),
      new Body(8).setOrigin(0.4, -0.09).finalize()
    ]
    this.fixedBodies = [
      new FixedBody(9)
        .setOrigin(0, 0.38)
        .setDimension(0.1, 0.5)
        .finalize(),
      new FixedBody(10)
        .setOrigin(0, -0.38)
        .setDimension(0.1, 0.5)
        .finalize()
    ]

    // set friction
    for (const body of this.movingBodies) {
      body.lateralFriction = 1
      body.rotationalFriction = 7
    }

    // force that moves body 1 forward
    this.movingBodies[0].setForce(8, 0)
  }

  // overridden generator methods returning bodies
  * getMovingBodies () {
    yield * this.movingBodies
  }

  * getFixedBodies () {
    yield * this.fixedBodies
  }

  postAdvance (now) {
    // clear canvas
    this.context.fillStyle = this.backgroundColor
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // draw bodies
    for (const body of this.movingBodies) {
      drawBody(body, this.canvas, this.context, this.colors)
    }
    for (const body of this.fixedBodies) {
      drawBody(body, this.canvas, this.context, this.colors)
    }

    // reset example if repeat time has passed
    if (this.lastRepeat === 0) {
      this.lastRepeat = now
    }
    if (now - this.lastRepeat > this.repeat) {
      this.initBodies()
      this.lastRepeat = now
    }
  }
}

class Example2 extends State {
  constructor (document) {
    super()
    // DOM elements
    this.canvas = document.getElementById('canvas2')
    this.context = this.canvas.getContext('2d')
    this.backgroundColor = '#0098d8'
    this.repeat = 7000 // repeat example every 7 seconds
    this.lastRepeat = 0

    // bodies
    this.movingBodies = []
    this.fixedBodies = []
    this.initBodies()

    // colors
    this.colors = []
    for (const body of this.movingBodies) {
      this.colors[body.id] = body.id < 3 ? '#e5e7de' : '#f54123'
    }
    for (const body of this.fixedBodies) {
      this.colors[body.id] = '#0b3536'
    }
  }

  initBodies () {
    this.movingBodies = [
      new Body(0).setOrigin(-0.7, 0.5).finalize(),
      new Body(1).setOrigin(-0.5, 0.5).finalize(),
      new Body(2).setOrigin(-0.3, 0.5).finalize(),
      new Body(3).setOrigin(0.3, 0.5).finalize(),
      new Body(4).setOrigin(0.5, 0.5).finalize(),
      new Body(5).setOrigin(0.7, 0.5).finalize()
    ]
    this.fixedBodies = [
      new FixedBody(6)
        .setOrigin(-0.7, -0.5)
        .setAngle(-0.1 * Math.PI)
        .setDimension(1, 0.5)
        .finalize(),
      new FixedBody(7)
        .setOrigin(0.7, -0.5)
        .setAngle(0.1 * Math.PI)
        .setDimension(1, 0.5)
        .finalize()
    ]

    // set friction
    for (const body of this.movingBodies) {
      body.lateralFriction = 0.5
      body.rotationalFriction = 2
    }

    // set downwards force to all movable bodies
    for (const body of this.movingBodies) {
      body.setForce(0, -2)
    }
  }

  // overridden generator methods returning bodies
  * getMovingBodies () {
    yield * this.movingBodies
  }

  * getFixedBodies () {
    yield * this.fixedBodies
  }

  postAdvance (now) {
    // clear canvas
    this.context.fillStyle = this.backgroundColor
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // draw bodies
    for (const body of this.movingBodies) {
      drawBody(body, this.canvas, this.context, this.colors)
    }
    for (const body of this.fixedBodies) {
      drawBody(body, this.canvas, this.context, this.colors)
    }

    // reset example if repeat time has passed
    if (this.lastRepeat === 0) {
      this.lastRepeat = now
    }
    if (now - this.lastRepeat > this.repeat) {
      this.initBodies()
      this.lastRepeat = now
    }
  }
}

class Example3 extends State {
  constructor (document) {
    super()
    // DOM elements
    this.canvas = document.getElementById('canvas3')
    this.context = this.canvas.getContext('2d')
    this.backgroundColor = '#f45844'
    this.repeat = 4000 // repeat example every 4 seconds
    this.lastRepeat = 0

    // bodies
    this.movingBodies = []
    this.fixedBodies = []
    this.initBodies()

    // colors
    this.colors = []
    for (const body of this.movingBodies) {
      this.colors[body.id] = '#dfe0e2'
    }
    for (const body of this.fixedBodies) {
      this.colors[body.id] = '#2f292b'
    }
  }

  initBodies () {
    this.movingBodies = [
      new Body(0).setOrigin(-0.9, 0.4).finalize(),
      new Body(1).setOrigin(-0.8, 0.28).finalize(),
      new Body(2).setOrigin(-0.7, 0.16).finalize()
    ]
    this.fixedBodies = [
      new FixedBody(3)
        .setOrigin(0, 0.6)
        .setDimension(2, 0.2)
        .finalize(),
      new FixedBody(4)
        .setOrigin(0, -0.6)
        .setDimension(2, 0.2)
        .finalize(),
      new FixedCircle(31, new Vector(0.1, 0), 0.15),
      new FixedCircle(30, new Vector(0.5, 0), 0.15),
      new FixedArc(32, new Vector(0.5, 0), 0.5, 0.2, 0, Math.PI * 0.5),
      new FixedArc(33, new Vector(0.5, 0), 0.5, 0.2, Math.PI * 1.5, Math.PI * 2)
    ]

    // initial velocity of impacting bodies
    for (const body of this.movingBodies) {
      body.velocity.x = 3
    }
  }

  // overridden generator methods returning bodies
  * getMovingBodies () {
    yield * this.movingBodies
  }

  * getFixedBodies () {
    yield * this.fixedBodies
  }

  postAdvance (now) {
    // clear canvas
    this.context.fillStyle = this.backgroundColor
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // draw circles
    drawCircles(
      this.canvas,
      this.context,
      this.colors[this.fixedBodies[0].id],
      this.backgroundColor
    )

    // draw bodies
    for (const body of this.movingBodies) {
      drawBody(body, this.canvas, this.context, this.colors)
    }
    for (const body of this.fixedBodies) {
      drawBody(body, this.canvas, this.context, this.colors)
    }

    // reset example if repeat time has passed
    if (this.lastRepeat === 0) {
      this.lastRepeat = now
    }
    if (now - this.lastRepeat > this.repeat) {
      this.initBodies()
      this.lastRepeat = now
    }
  }
}

/**
 * Main loop. Initializes examples, advances physics, and updates graphics.
 */
window.onload = function () {
  // initialize examples
  const examples = [
    new Example1(document),
    new Example2(document),
    new Example3(document)
  ]

  // initially resize canvas, and also listen for resize events
  resizeCanvas(examples)
  window.addEventListener('resize', function (e) {
    resizeCanvas(examples)
  })

  // step function is called every time the browser refreshes the UI
  function step (now) {
    // advance state of all examples
    for (const example of examples) {
      example.advance(now)
    }

    // request next animation frame from browser
    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}

/*
 * Draws body on canvas.
 */
function drawBody (body, canvas, context, colors) {
  if (body.id >= 30) {
    // hack to ignore circles and arcs
    return
  }
  context.fillStyle = colors[body.id]
  context.beginPath()
  context.moveTo(tx(canvas, body.cornerX[0]), ty(canvas, body.cornerY[0]))
  for (let i = 1; i < 4; i++) {
    context.lineTo(tx(canvas, body.cornerX[i]), ty(canvas, body.cornerY[i]))
  }
  context.closePath()
  context.fill()
}

/*
 * Draws circles for example 3
 */
function drawCircles (canvas, context, wallColor, backgroundColor) {
  // draw big wall
  context.fillStyle = wallColor
  context.beginPath()
  context.moveTo(tx(canvas, 0.5), ty(canvas, 0.5))
  context.lineTo(tx(canvas, 1), ty(canvas, 0.5))
  context.lineTo(tx(canvas, 1), ty(canvas, -0.5))
  context.lineTo(tx(canvas, 0.5), ty(canvas, -0.5))
  context.closePath()
  context.fill()

  // draw circle on top of wall
  context.fillStyle = backgroundColor
  context.beginPath()
  context.arc(
    tx(canvas, 0.5),
    ty(canvas, 0),
    tx(canvas, 0.5) - tx(canvas, 0),
    0,
    2 * Math.PI,
    false
  )
  context.fill()

  // draw circle of which objects bounce off
  context.fillStyle = wallColor
  for (const x of [0.1, 0.5]) {
    context.beginPath()
    context.arc(
      tx(canvas, x),
      ty(canvas, 0),
      tx(canvas, 0.15) - tx(canvas, 0),
      0,
      2 * Math.PI,
      false
    )
    context.fill()
  }
}

/*
 * Translates a body's x coordinate to the canvas's scale:
 * - if body is at x = -1, the body is at the canvas's left edge
 * - if body is at x = 1, the body is at the canvas's right edge
 */
function tx (canvas, x) {
  return (canvas.width / 2) * (x + 1)
}

/*
 * Translates a body's y coordinate to the canvas's scale. This depends on the
 * size of the canvas.
 *
 * If the size of the canvas is 400px wide and 200px high, and:
 * - if body is at y = 0.5, the body is at the canvas's top edge
 * - if body is at y = -0.5, the body is at the canvas's bottom edge
 */
function ty (canvas, y) {
  return (-canvas.width / 2) * y + canvas.height / 2
}

/*
 * Resizes all canvases to fit screen width in case browser window is thinner than canvasWidth.
 */
function resizeCanvas (examples) {
  const w = Math.min(window.innerWidth, canvasWidth)
  const h = (canvasHeight * w) / canvasWidth
  for (const example of examples) {
    if (example.canvas.width !== w) {
      example.canvas.width = w
      example.canvas.height = h
    }
  }
}
