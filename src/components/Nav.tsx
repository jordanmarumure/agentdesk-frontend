"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/Logo";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Why us", href: "#why-us" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mt-4">
        <div
          className={`glass inline-flex items-center justify-between gap-6 rounded-full border border-white/15 px-2.5 py-2 transition-shadow duration-300 md:justify-start md:px-3 ${
            scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : ""
          }`}
        >
          <a href="#top" className="flex items-center pl-1 font-semibold tracking-tight">
            <LogoMark size={32} />
          </a>

          <nav className="hidden items-center gap-6 px-2 text-sm font-bold uppercase tracking-wide text-white md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 pr-1 md:flex">
            <a
              href="https://app.agentdesk.co.zw"
              className="text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-accent"
            >
              Sign in
            </a>
            <a
              href="https://app.agentdesk.co.zw/sign-up"
              className="gold-shine whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-[1.03]"
            >
              Get started
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-2 w-64 overflow-hidden rounded-2xl border border-white/15 p-2 md:hidden"
            >
              <div className="flex flex-col text-sm font-bold uppercase tracking-wide text-white">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10 hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://app.agentdesk.co.zw/"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10 hover:text-accent"
                >
                  Sign in
                </a>
                <a
                  href="https://app.agentdesk.co.zw/sign-up"
                  onClick={() => setOpen(false)}
                  className="gold-shine mt-1 rounded-full px-3 py-2.5 text-center font-bold uppercase tracking-wide text-ink"
                >
                  Get started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
