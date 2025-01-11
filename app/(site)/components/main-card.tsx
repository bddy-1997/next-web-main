"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { SocialConfig, WebsiteLinks } from "@/config/site"
import { MagicCard } from "@/components/ui/magic-card"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Dock, DockIcon } from "@/components/ui/dock"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { Particles } from "@/components/ui/particles"

const MainCard = () => {
  const { theme } = useTheme()

  const innerSlugs = [
    "html5",
    "css3",
    "tailwindcss",
    "javascript",
    "typescript",
    "vue.js",
    "react",
    "nextdotjs/color/white",
    "nuxt"
  ]
  const outerSlugs = [
    "nodedotjs",
    "nestjs",
    "prisma",
    "nginx",
    "vercel/color/white",
    "docker",
    "git",
    "github/color/white",
    "vite",
    "webpack"
  ]
  const slugToImage = (slug: string) => {
    return `https://cdn.simpleicons.org/${slug}?viewbox=auto`
  }

  const [isMobile, setisMobile] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        setisMobile(true)
      }
    }
  }, [])

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut"
        }}
        className="flex w-full max-w-sm items-center justify-center sm:max-w-md"
      >
        <MagicCard
          className="relative w-[80%] cursor-pointer flex-col items-center justify-center overflow-hidden whitespace-nowrap rounded-xl p-8 shadow-2xl sm:w-full"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className="relative flex h-[300px] w-full flex-col items-center justify-center sm:h-[500px]">
            <Image
              src="/avatar.jpg"
              alt="文凯"
              width={isMobile ? 40 : 80}
              height={isMobile ? 40 : 80}
              className="overflow-hidden rounded-full object-cover"
            />
            <OrbitingCircles iconSize={isMobile ? 30 : 40} radius={isMobile ? 100 : 160}>
              {outerSlugs.map((slug) => (
                <Image key={slugToImage(slug)} src={slugToImage(slug)} alt={slug} width={40} height={40} unoptimized />
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={isMobile ? 20 : 30} radius={isMobile ? 50 : 100} reverse speed={2}>
              {innerSlugs.map((slug) => (
                <Image key={slugToImage(slug)} src={slugToImage(slug)} alt={slug} width={30} height={30} unoptimized />
              ))}
            </OrbitingCircles>
          </div>
          <TooltipProvider>
            <Dock direction="middle" iconDistance={isMobile ? 0 : 140} iconSize={isMobile ? 20 : 40}>
              {WebsiteLinks.map(({ icon: Icon, title, href }) => (
                <DockIcon key={title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={href}
                        target="_blank"
                        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
                      >
                        <Icon />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{title}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))}
              <Separator orientation="vertical" className="h-full" />
              {SocialConfig.map(({ icon: Icon, title, href }) => (
                <DockIcon key={title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={href}
                        target="_blank"
                        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
                      >
                        <Icon />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{title}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))}
              <Separator orientation="vertical" className="h-full" />
              <DockIcon>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button>
                      <ThemeToggle />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Theme</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            </Dock>
          </TooltipProvider>
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            color={theme === "dark" ? "#ffffff" : "#000000"}
            refresh
          />
        </MagicCard>
      </motion.div>
    </AuroraBackground>
  )
}

export default MainCard
