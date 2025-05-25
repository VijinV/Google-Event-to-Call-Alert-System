"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuthStore } from "../../../store/store";
import GoogleSignIn from "@/components/auth/google";
import { useRouter } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export default function GoogleSignInPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="bg-neutral-800 p-3 rounded-full">
                <Calendar className="w-8 h-8 text-neutral-200" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-neutral-400">
                Sign in to set up your calendar alerts
              </p>
            </div>
          </div>

          {/* Sign In Card */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white text-center">
                Connect Your Google Account
              </CardTitle>
              <CardDescription className="text-neutral-400 text-center">
                We need access to your Google Calendar to set up automated phone
                call reminders.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <GoogleSignIn />

              <div className="text-center">
                <p className="text-xs text-neutral-500 px-2 leading-relaxed">
                  By signing in, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Cards */}
          <div className="space-y-4">
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-neutral-800 p-2 rounded-lg mt-0.5 shrink-0">
                    <Clock className="w-4 h-4 text-neutral-300" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-neutral-300">
                      Smart Reminders
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Get automated phone call alerts 5 minutes before your
                      important calendar events start.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-neutral-500 text-sm">
              Powered by Google Calendar & Twilio
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
