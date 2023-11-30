"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const HelpDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-sky-600 hover:bg-sky-700 px-4 py-1.5 text-white rounded-md">
          Ønsker du å hjelpe?
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Ønsker du å hjelpe?
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Hvis du ønsker å gi penger til en person som har lagt ut en post,
            kan du finne telefonnummeret deres her. Du kan videre bruke Vipps
            eller en annen betalingsløsning for å sende penger. Dersom du ønsker
            å hjelpe på andre måter, kan du ta kontakt med den som har lagt ut
            posten.
          </Dialog.Description>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="bg-sky-600 text-white hover:bg-sky-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Lukk
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-black hover:bg-slate-100 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
