import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { AlertCircle, Phone } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneFormData, phoneSchema } from "./schema";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useAddNumber } from "@/hooks/queryHooks/useAddNumber";
import { useTriggerAlert } from "@/hooks/queryHooks/useTiggerAlert";

export default function PhoneNumberForm({
  phoneNumber,
}: {
  phoneNumber?: string;
}) {
  const { mutate, isPending } = useAddNumber();

  const { mutate: triggerAlert } = useTriggerAlert();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    mode: "onChange",
    defaultValues: {
      phoneNumber: phoneNumber,
    },
  });

  const onSubmit = (data: PhoneFormData) => {
    mutate(data);
  };

  const triggerAlertHandler = () => {
    triggerAlert();
  };

  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Phone className="w-5 h-5" />
          <span>Phone Number Setup</span>
        </CardTitle>
        <CardDescription className="text-neutral-400">
          Enter your phone number to receive call alerts for upcoming calendar
          events.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-neutral-300">
            Phone Number
          </Label>
          <div className="relative">
            <Input
              {...register("phoneNumber")}
              id="phoneNumber"
              defaultValue={phoneNumber}
              type="tel"
              placeholder="+1 (555) 123-4567"
              className={`pl-10 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:border-neutral-500 focus:ring-neutral-500 ${
                errors.phoneNumber
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : isValid && watch("phoneNumber")
                  ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                  : ""
              }`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-neutral-500" />
            </div>
            {isValid && watch("phoneNumber") && !errors.phoneNumber && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            )}
          </div>

          {errors.phoneNumber && (
            <Alert className="border-red-500 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-400">
                {errors.phoneNumber.message}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex gap-10">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isPending}
            className={`flex-1 ${
              isPending
                ? "bg-neutral-700 hover:bg-neutral-700"
                : isValid
                ? "bg-neutral-700 hover:bg-neutral-600 text-white"
                : "bg-neutral-800 hover:bg-neutral-800 text-neutral-500"
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Phone Number"
            )}
          </Button>
          {phoneNumber && (
            <Button
              onClick={triggerAlertHandler}
              disabled={isPending}
              className="flex-1 bg-green-900 hover:bg-green-800"
            >
              Tigger an Event Call
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
