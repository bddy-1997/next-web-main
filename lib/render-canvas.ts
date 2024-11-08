class Wave {
  public phase = 0
  public offset = 0
  public frequency = 0.001
  public amplitude = 1

  public constructor(e: Partial<Pick<Wave, "phase" | "offset" | "frequency" | "amplitude">>) {
    this.phase = e.phase || 0
    this.offset = e.offset || 0
    this.frequency = e.frequency || 0.001
    this.amplitude = e.amplitude || 1
  }

  public update() {
    this.phase += this.frequency
    return this.offset + Math.sin(this.phase) * this.amplitude
  }
}

class Node {
  public x = 0
  public y = 0
  public vy = 0
  public vx = 0
}

class Line {
  public spring: number
  public friction: number
  public nodes: Node[] = []

  public constructor(
    e: { spring: number },
    private pos: { x: number; y: number }
  ) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05
    this.friction = E.friction + 0.01 * Math.random() - 0.005
    this.nodes = []

    for (let i = 0; i < E.size; i++) {
      const t = new Node()
      t.x = this.pos.x
      t.y = this.pos.y
      this.nodes.push(t)
    }
  }

  public update() {
    let spring = this.spring
    let node = this.nodes[0]

    node.vx += (this.pos.x - node.x) * spring
    node.vy += (this.pos.y - node.y) * spring

    let prevNode: Node
    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i]

      if (i > 0) {
        prevNode = this.nodes[i - 1]
        node.vx += (prevNode.x - node.x) * spring
        node.vy += (prevNode.y - node.y) * spring
        node.vx += prevNode.vx * E.dampening
        node.vy += prevNode.vy * E.dampening
      }

      node.vx *= this.friction
      node.vy *= this.friction
      node.x += node.vx
      node.y += node.vy
      spring *= E.tension
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    let currNode: Node
    let nextNode: Node
    let x = this.nodes[0].x
    let y = this.nodes[0].y

    ctx.beginPath()
    ctx.moveTo(x, y)

    for (let i = 1; i < this.nodes.length - 1; i++) {
      currNode = this.nodes[i]
      nextNode = this.nodes[i + 1]
      x = 0.5 * (currNode.x + nextNode.x)
      y = 0.5 * (currNode.y + nextNode.y)
      ctx.quadraticCurveTo(currNode.x, currNode.y, x, y)
    }

    currNode = this.nodes[this.nodes.length - 2]
    nextNode = this.nodes[this.nodes.length - 1]
    ctx.quadraticCurveTo(currNode.x, currNode.y, nextNode.x, nextNode.y)

    ctx.stroke()
    ctx.closePath()
  }
}

const E = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98
}

export const RenderCanvas = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement

  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
  let lines: Line[] = []
  const pos = { x: 0, y: 0 }
  const wave = new Wave({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285
  })
  let running = true
  function resizeCanvas() {
    if (ctx) {
      ctx.canvas.width = window.innerWidth - 6
      ctx.canvas.height = window.innerHeight
    }
  }

  resizeCanvas()

  function animate() {
    if (running && ctx) {
      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = "#065f46"
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.globalCompositeOperation = "lighter"
      ctx.strokeStyle = "hsla(" + Math.round(wave.update()) + ",90%,50%,0.25)"
      ctx.lineWidth = 1
      for (let i = 0; i < E.trails; i++) {
        const line = lines[i]
        line.update()
        line.draw(ctx)
      }
      window.requestAnimationFrame(animate)
    }
  }

  function bindMouseMove(event: MouseEvent | TouchEvent) {
    function drawLine() {
      lines = []
      for (let i = 0; i < E.trails; i++) {
        lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }, pos))
      }
    }

    function move(e: MouseEvent | TouchEvent) {
      if ("touches" in e) {
        pos.x = e.touches[0].pageX
        pos.y = e.touches[0].pageY
      } else {
        pos.x = e.clientX
        pos.y = e.clientY
      }
      e.preventDefault()
    }

    function start(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX
        pos.y = e.touches[0].pageY
      }
    }

    // 移除事件监听器
    document.removeEventListener("mousemove", bindMouseMove)
    document.removeEventListener("touchstart", bindMouseMove)

    // 添加事件监听器
    document.addEventListener("mousemove", move)
    document.addEventListener("touchmove", move)
    document.addEventListener("touchstart", start)

    // 初始化位置并绘制线条
    move(event)
    drawLine()
    animate()
  }
  document.addEventListener("mousemove", bindMouseMove)
  document.addEventListener("touchstart", bindMouseMove)
  document.body.addEventListener("orientationchange", resizeCanvas)
  window.addEventListener("resize", resizeCanvas)
  window.addEventListener("focus", () => {
    if (!running) {
      running = true
      animate()
    }
  })
  window.addEventListener("blur", () => {
    running = true
  })
}
