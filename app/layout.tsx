'use client'

import { inter } from "./fonts";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PageHeaderHeading } from "@/components/page-header";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "History",
    href: "/history",
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* padding issue here */}
        <div className="flex p-24">
          {links.map((link, index) => (
              <Link
                href={link.href}
                key={link.href}
                className={cn(
                  "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                  pathname?.startsWith(link.href) ||
                    (index === 0 && pathname === "/")
                    ? "bg-muted font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
        </div>
        <PageHeaderHeading className="hidden md:block">
              Ask Piktobot
        </PageHeaderHeading>
        {children}
      </body>
    </html>
  );
}
