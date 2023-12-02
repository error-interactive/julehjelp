import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/utils/css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { FeedbackPopover } from "@/components/FeedbackPopover";

export const metadata: Metadata = {
  title: "Julehjelp",
  description: "Julehjelp",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(GeistSans.className, "flex flex-col h-screen")}>
          <header className="bg-slate-100 h-20 flex items-center px-4 flex-none justify-between">
            <div>
              <Link href="/" className="text-3xl font-bold text-sky-600">
                Julehjelp
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <div>
                <FeedbackPopover />
              </div>
              {userId ? (
                <Link href="/profile">
                  <div className="flex items-center space-x-2">
                    <p className="text-black text-sm underline">Se profil</p>
                    <Image
                      height={40}
                      width={40}
                      className="rounded-full"
                      src={"https://i.fivemanage.com/images/3ClWwmpwkFhL.png"}
                      alt="profile avatar"
                    />
                  </div>
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm bg-sky-600 rounded px-2 py-1.5 text-white"
                  >
                    Logg inn
                  </Link>
                </>
              )}
            </div>
          </header>

          <main className="flex-1 grow h-full sm:px-4">{children}</main>

          <footer className="hidden lg:block flex flex-none items-center bg-slate-100 items-center px-6 py-4">
            <Link href="/" className="text-sm text-sky-600 underline">
              Julehjelp
            </Link>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
