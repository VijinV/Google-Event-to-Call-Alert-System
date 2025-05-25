"use client";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Loader2,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../store/store";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PhoneNumberForm from "@/components/forms/phoneNumber";
import { useGetMe } from "@/hooks/queryHooks/useGetMe";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLogout } from "@/hooks/queryHooks/useLogout";

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const { data: me, isLoading, isError } = useGetMe();

  const { mutate } = useLogout();

  useEffect(() => {
    if (!isAuthenticated || isError) {
      router.push("/login");
    }
  }, [isAuthenticated, isError, router]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="bg-neutral-800 p-3 rounded-full">
              <Calendar className="w-8 h-8 text-neutral-200" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Calendar Alert Setup
            </h1>
            <p className="text-neutral-400">
              Get phone call reminders for your upcoming events
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full justify-center">
          <div className="flex-1 space-y-4 max-w-md">
            <Card className="bg-neutral-900 border-neutral-800">
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 border-2 border-neutral-600">
                    <AvatarImage src={me?.image} alt={me?.name} />
                    <AvatarFallback className="bg-neutral-700 text-neutral-200">
                      {me?.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{user?.name}</h3>
                    <p className="text-neutral-400 text-sm">{user?.email}</p>
                  </div>
                  <div className="flex flex-col space-y-2 items-end">
                    <Badge
                      variant="secondary"
                      className="bg-green-900 text-green-300 border-green-700"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                    <Button
                      onClick={() => {
                        mutate();
                      }}
                      variant="destructive"
                      className="w-8 h-8 cursor-pointer"
                    >
                      <LogOut className="size-4 " />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardContent>
                <div className="flex items-start space-x-3">
                  <div className="bg-neutral-800 p-2 rounded-lg mt-0.5 shrink-0">
                    <AlertCircle className="w-4 h-4 text-neutral-300" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-neutral-300">
                      How it works
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      We'll check your Google Calendar every 5 minutes for
                      upcoming events. If an event is starting soon, you'll
                      receive an automated phone call reminder.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1 lg:max-w-md">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <PhoneNumberForm phoneNumber={me?.phoneNumber} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
