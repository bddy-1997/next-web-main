"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Twitter, ExternalLink } from "lucide-react"

const SimpleCard = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-2xl"
      >
        <div className="text-center">
          <Image
            src="/avatar.jpg"
            alt="文凯"
            width={120}
            height={120}
            className="mx-auto mb-4 overflow-hidden rounded-full border-4 border-gray-700 object-cover"
          />
          <h1 className="mb-2 text-2xl font-bold">文凯</h1>
          <p className="mb-4 text-gray-300">全栈开发者 | 技术探索者</p>
          <p className="mb-6 text-sm text-gray-400">
            在这个不断变化的技术世界中，我致力于创造优雅而高效的解决方案。每一行代码都是一次冒险，每个项目都是一次创新的机会。
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <a
            href="https://blog.liwenkai.fun/"
            className="flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-center text-white transition duration-300 hover:bg-blue-700"
          >
            <span className="mr-2">Blog</span>
            <ExternalLink size={16} />
          </a>
          <a
            href="https://nav.liwenkai.fun/"
            className="flex items-center justify-center rounded bg-purple-600 px-4 py-2 text-center text-white transition duration-300 hover:bg-purple-700"
          >
            <span className="mr-2">Nav</span>
            <ExternalLink size={16} />
          </a>
          <a
            href="https://s.liwenkai.fun/"
            className="flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-center text-white transition duration-300 hover:bg-blue-700"
          >
            <span className="mr-2">Search</span>
            <ExternalLink size={16} />
          </a>
          <a
            href="https://me.liwenkai.fun/"
            className="flex items-center justify-center rounded bg-purple-600 px-4 py-2 text-center text-white transition duration-300 hover:bg-purple-700"
          >
            <span className="mr-2">Me</span>
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/liwenka1"
            className="transform text-gray-400 transition duration-300 hover:scale-110 hover:text-white"
          >
            <Github aria-label="GitHub" />
          </a>
          <a
            href="https://twitter.com/liwenka1"
            className="transform text-gray-400 transition duration-300 hover:scale-110 hover:text-white"
          >
            <Twitter aria-label="Twitter" />
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default SimpleCard
