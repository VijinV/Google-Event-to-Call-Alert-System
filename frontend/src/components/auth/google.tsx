import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/store";
import { Button } from "../ui/button";
import { client } from "@/lib/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function GoogleSignIn() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: (response) => {
      setIsLoading(true);
      client
        .post("/auth/google", {
          code: response.code,
        })
        .then((res) => {
          login(res.data.user);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    },
    onError: (error) => {
      console.log(error);
      setIsLoading(false);
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL!,
  });

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full bg-neutral-700 hover:bg-neutral-600 text-white border-neutral-600 hover:border-neutral-500 transition-all duration-200"
      variant="outline"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-3 animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </>
      )}
    </Button>
  );
}
