"use server";

import { Suspense } from "react";
import { ProfileDetails } from "./ProfileDetails";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="py-6 sm:px-4 md:px-0">
      <h1 aria-label="Din profil" className="font-bold text-2xl">
        Din profil
      </h1>

      <div className="mt-2">
        <p aria-label="Her kan du se og endre din profil.">
          Her kan du se og endre din profil.
        </p>

        <div className="mt-4">
          <Link
            arai-label="Lag eller endre ditt innlegg"
            arai-role="link"
            className="bg-sky-500 hover:bg-sky-600 rounded text-white px-3 py-2"
            href="/profile/post"
          >
            Lag/endre innlegg
          </Link>
        </div>
      </div>

      <div>
        <h2 aria-label="Dine opplysninger" className="font-bold text-xl mt-6">
          Dine opplysninger
        </h2>
      </div>

      <div className="mt-6 max-w-lg">
        <Suspense>
          {/* @ts-ignore */}
          <ProfileDetails />
        </Suspense>
      </div>
    </main>
  );
}
