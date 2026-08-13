import { Suspense } from "react";
import RegisterForm from "./RegisterForm";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-page flex items-center justify-center gap-2 text-mid">
        <Loader2 size={20} className="animate-spin" /> Loading…
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
