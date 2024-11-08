"use client"

import { useEffect } from "react"

import { RenderCanvas } from "@/lib/render-canvas"
import MainCard from "./components/main-card"

const Site = () => {
  useEffect(() => {
    RenderCanvas()
  }, [])

  return (
    <div>
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas" />
      <MainCard />
    </div>
  )
}

export default Site
