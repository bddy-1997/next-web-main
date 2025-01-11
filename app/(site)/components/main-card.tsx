"use client"

import React from "react"
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
        className="w-full max-w-md scale-75 sm:scale-100"
      >
        <MagicCard
          className="relative w-full cursor-pointer flex-col items-center justify-center whitespace-nowrap rounded-xl p-8 shadow-2xl"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className="relative flex h-[500px] w-full flex-col items-center justify-center">
            <Image
              src="/avatar.jpg"
              alt="文凯"
              width={80}
              height={80}
              className="overflow-hidden rounded-full object-cover"
            />
            <OrbitingCircles iconSize={40}>
              {outerSlugs.map((slug) => (
                <Image key={slugToImage(slug)} src={slugToImage(slug)} alt={slug} width={40} height={40} unoptimized />
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
              {innerSlugs.map((slug) => (
                <Image key={slugToImage(slug)} src={slugToImage(slug)} alt={slug} width={30} height={30} unoptimized />
              ))}
            </OrbitingCircles>
          </div>
          <TooltipProvider>
            <Dock direction="middle">
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
