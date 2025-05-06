import api from "@services/axios-global";
import { useState } from "react";

type StatusType = "idle" | "checking" | "available" | "unavailable" | "failed";
const useCheckEmailAvailability = () => {
  const [status, setStatus] = useState<StatusType>("idle");
  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);
  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    setStatus("checking");
    try {
      const response = await api.get(`users?email=${email}`);
      if (!response.data.length) {
        setStatus("available");
      } else {
        setStatus("unavailable");
      }
    } catch {
      setStatus("failed");
    }
  };
  const restCheckEmailAvailability = () => {
    setStatus("idle");
    setEnteredEmail(null);
  };
  return {
    status,
    enteredEmail,
    checkEmailAvailability,
    restCheckEmailAvailability,
  };
};
export default useCheckEmailAvailability;
