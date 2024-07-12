'use client'

import { inter } from "./fonts";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeaderHeading } from "@/components/page-header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";

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

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`${inter.className} antialiased` }>
          <div className="flex items-center justify-center gap-4 p-16">
            {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={clsx(
                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-m font-medium hover:text-cf-orange-2 md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                      'text-cf-orange-1': pathname === link.href,
                    },
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
    </QueryClientProvider>
  );
}
