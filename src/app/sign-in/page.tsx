import { Navbar } from "@/components/blocks/navbar";
import { LoginForm } from "@/components/ui/8bit/blocks/login-form-with-image";

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <div className="py-20 w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </>
  );
}
