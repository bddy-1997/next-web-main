"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

import { PersonalInfo, SocialConfig, WebsiteLinks } from "@/config/site"

const MainCard = () => {
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
          <h1 className="mb-2 text-2xl font-bold">{PersonalInfo.name}</h1>
          <p className="mb-4 text-gray-300">{PersonalInfo.title}</p>
          <p className="mb-6 text-sm text-gray-400">{PersonalInfo.description}</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          {WebsiteLinks.map(({ title, href }, index) => (
            <Link
              key={index}
              href={href}
              passHref
              className={`flex items-center justify-center rounded px-4 py-2 text-center text-white transition duration-300 ${index % 2 === 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"}`}
              target="_blank"
            >
              <span className="mr-2">{title}</span>
              <ExternalLink size={16} />
            </Link>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          {SocialConfig.map(({ title, href, icon: Icon }, index) => {
            return (
              <Link
                key={index}
                href={href}
                passHref
                className="transform text-gray-400 transition duration-300 hover:scale-110 hover:text-white"
                aria-label={title}
                target="_blank"
              >
                <Icon className="h-5 w-5" />
              </Link>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default MainCard
