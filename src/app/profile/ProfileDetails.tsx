import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export async function ProfileDetails() {
  const user = await currentUser();
  const { sessionId } = auth();

  if (!sessionId) {
    redirect("/sign-in");
  }

  async function logOutAction() {
    "use server";

    if (!sessionId) {
      return;
    }

    await clerkClient.sessions.revokeSession(sessionId);
    redirect("/sign-in");
  }

  return (
    <div>
      <div className="space-y-4">
        <Field label="Name">{user?.username}</Field>
        <Field privateInfo label="Email">
          {user?.emailAddresses[0].emailAddress}
        </Field>
      </div>

      <div className="mt-8">
        {/* @ts-ignore */}
        <form action={logOutAction}>
          <button className="bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200">
            Logg ut
          </button>
        </form>
      </div>
    </div>
  );
}

const Field: React.FC<{
  label: string;
  children: React.ReactNode;
  privateInfo?: boolean;
}> = ({ label, privateInfo, children }) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <label className="font-medium">{label}</label>
      {privateInfo && (
        <p
          aria-label="Vi viser aldri denne informasjon offentlig"
          className="text-sm text-yellow-700"
        >
          *Vi viser aldri denne informasjon offentlig
        </p>
      )}
    </div>
    <div className="bg-slate-200 border border-slate-300 px-2 p-1 rounded">
      {children}
    </div>
  </div>
);
