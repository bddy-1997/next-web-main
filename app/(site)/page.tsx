"use client"

import { useEffect, useRef } from "react"

import { RenderCanvas } from "./components/render-canvas"
import SimpleCard from "./components/card"

const Site = () => {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    RenderCanvas()
    ref.current?.classList.add("transition-in")
  }, [])

  return (
    <div>
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas" />
      <SimpleCard />
    </div>
  )
}

export default Site
