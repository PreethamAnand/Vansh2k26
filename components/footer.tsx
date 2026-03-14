import Image from "next/image"
import Link from "next/link"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative w-full flex flex-col bg-black border-t-4 border-white">
      {/* Main Footer Grid */}
      <div className="w-full px-6 md:px-16 py-3 md:py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Column 1 — Logo & About */}
          <div className="flex flex-row items-start gap-4">
            <div className="shrink-0 bg-white/5 border border-white/10 p-2 rounded-xl backdrop-blur-md rotate-[-2deg] shadow-2xl">
              <Image
                src="/vansh_logo.PNG"
                alt="VANSH Logo"
                width={67}
                height={27}
                className="w-[50px] md:w-[67px] h-auto object-contain brightness-110"
              />
            </div>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 font-bold">
              VANSH 2K26 — The ultimate college cultural & technical fest. Compete, create, and celebrate talent.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-white font-black font-kanit italic uppercase text-base md:text-lg tracking-widest">
              Quick Links
            </h4>
            <ul className="grid grid-cols-3 gap-x-6 gap-y-1 text-white/70 font-bold font-kanit italic uppercase text-sm md:text-base tracking-wider">
              <li className="hover:text-pink-400 transition-colors"><Link href="/">•Home</Link></li>
              <li className="hover:text-pink-400 transition-colors"><Link href="/events">•Events</Link></li>
              <li className="hover:text-pink-400 transition-colors"><Link href="/contact">•Contact</Link></li>
              <li className="hover:text-pink-400 transition-colors"><Link href="/terms">•Terms</Link></li>
              <li className="hover:text-pink-400 transition-colors"><Link href="/privacy">•Privacy</Link></li>
              <li className="hover:text-pink-400 transition-colors"><Link href="/refund">•Refund</Link></li>
            </ul>
          </div>

          {/* Column 3 — Connect With Us */}
          <div className="flex flex-col items-end gap-1.5">
            <h4 className="text-white font-black font-kanit italic uppercase text-base md:text-lg tracking-widest">
              Connect With Us
            </h4>
            <ul className="flex flex-row gap-4">
              <SocialIcon
                src="/instagram-favicon.ico"
                alt="Instagram"
                href="https://www.instagram.com/vansh2k26?igsh=enFmOHFsc2Zsam1h"
              />
              <li className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 list-none">
                <Link href="mailto:vignanvansh@vignanits.ac.in" className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8">
                  <Mail size={20} className="text-white/80 hover:text-pink-400 transition-colors md:w-7 md:h-7" />
                </Link>
              </li>
            </ul>
            <div className="text-right text-[11px] md:text-xs leading-tight text-white/70 font-semibold">
              <p className="uppercase tracking-wide text-white/80">Student Coordinator</p>
              <p>Jashwanth - +91 80964 19473</p>
              <p>Saikishor - +91 96426 47782</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-6 md:px-16 py-1">
        <p className="text-white/40 font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-center">
          &copy; 2026 VANSH. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}

const SocialIcon = ({ src, alt, href }: { src: string; alt: string; href?: string }) => (
  <li className="hover:scale-110 hover:-translate-y-1 transition-all duration-300">
    {href ? (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="relative block w-6 h-6 md:w-8 md:h-8">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
        />
      </Link>
    ) : (
      <div className="relative w-6 h-6 md:w-8 md:h-8">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>
    )}
  </li>
)


