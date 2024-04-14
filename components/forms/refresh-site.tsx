"use client";

import { updateSite } from "@/actions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { IoReload } from "react-icons/io5";

const initialState = {
  message: "",
  error: false,
};

const RefreshButton = ({ url }: { url: string }) => {
  const [state, formAction] = useFormState(updateSite, initialState);
  const router = useRouter();
  if (state.message && !state.error) {
    router.push(state.message);
  }

  return (
    <form action={() => {}}>
      <input type="url" name="url" readOnly hidden value={url} />
      <SubmitButton />
    </form>
  );
};

export default RefreshButton;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="p-2 border-2 rounded-full border-neutral-800/[.7] bg-neutral-800/55"
    >
      <IoReload className={cn(pending && "animate-spin")} />
    </button>
  );
};
