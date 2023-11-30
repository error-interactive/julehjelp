import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/utils/css";
import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

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
  const user = await currentUser();

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
            <div>
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

          <footer className="hidden lg:block flex flex-none bg-slate-100 h-20 items-center px-6">
            <h3 className="text-lg">Footer</h3>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
