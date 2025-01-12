import { FaGithub, FaXTwitter } from "react-icons/fa6"
import { Rss, Navigation, Search, House } from "lucide-react"

export const SiteConfig = {
  title: "小宇宇",
  description: "小宇宇的个人主页"
}

export const PersonalInfo = {
  name: "小宇宇",
  title: "英语",
  description: "Better Late than Never"
}

export const WebsiteLinks = [
  { title: "Me", href: "https://me.liwenkai.fun", icon: House },
  { title: "Blog", href: "https://blog.liwenkai.fun", icon: Rss },
  { title: "Nav", href: "https://nav.liwenkai.fun", icon: Navigation },
  { title: "Search", href: "https://s.liwenkai.fun", icon: Search }
]

export const SocialConfig = [
  { title: "GitHub", href: "https://github.com/liwenka1", icon: FaGithub },
  { title: "X", href: "https://x.com/liwenka1", icon: FaXTwitter }
]
