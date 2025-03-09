"use client";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { Check, Clock } from "lucide-react"; // Import Lucide icons
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"; // Import shadcn Button

export const PatientLoading = () => {
  const [loadingStates, setLoadingStates] = useState([
    { text: "Fetching patient details...", status: "inactive" },
    { text: "Checking last visit and service history...", status: "inactive" },
    {
      text: "Generating personalized follow-up strategy...",
      status: "inactive",
    },
    { text: "Sending notification to patient...", status: "inactive" },
  ]);

  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]); // Store timeout references

  useEffect(() => {
    const simulateLoading = async () => {
      // Step 1: Fetching patient details
      setLoadingStates((prev) =>
        prev.map((state, index) =>
          index === 0 ? { ...state, status: "active" } : state
        )
      );
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 1000);
        timeoutRefs.current.push(timeout); // Store timeout
      });

      if (!isLoading) return; // Stop if loading is cancelled

      setLoadingStates((prev) =>
        prev.map((state, index) =>
          index === 0 ? { ...state, status: "completed" } : state
        )
      );

      // Step 2: Checking last visit and service history
      setLoadingStates((prev) =>
        prev.map((state, index) =>
          index === 1 ? { ...state, status: "active" } : state
        )
      );
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 1000);
        timeoutRefs.current.push(timeout); // Store timeout
      });

      if (!isLoading) return; // Stop if loading is cancelled

      setLoadingStates((prev) =>
        prev.map((state, index) =>
          index === 1 ? { ...state, status: "completed" } : state
        )
      );

      // Step 3: Generating personalized follow-up strategy
      setLoadingStates((prev) =>
        prev.map((state, index) =>
          index === 2 ? { ...state, status: "active" } : state
        )
      );
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 1000);
        timeoutRefs.current.push(timeout); // Store timeout
      });

      if (!isLoading) return; // Stop if loading is cancelled

      setLoadingStates((prev) =>
        prev.map((state, index) =>
          index === 2 ? { ...state, status: "completed" } : state
        )
      );

      // Step 4: Sending notification to patient
      setLoadingStates((prev) =>
        prev.map((state, index) =>
          index === 3 ? { ...state, status: "active" } : state
        )
      );
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 1000);
        timeoutRefs.current.push(timeout); // Store timeout
      });

      if (!isLoading) return; // Stop if loading is cancelled

      setLoadingStates((prev) =>
        prev.map((state, index) =>
          index === 3 ? { ...state, status: "completed" } : state
        )
      );
    };

    if (isLoading) {
      simulateLoading();
    }

    // Cleanup function to clear timeouts
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current = []; // Clear the array
    };
  }, [isLoading]);
  const [finished, setFinished] = useState(false);

  const handleStopProcess = () => {
    setIsLoading(false); // Stop the loading process

    // Reset the currently active step to "inactive"
    setLoadingStates((prev) =>
      prev.map((state) =>
        state.status === "active" ? { ...state, status: "inactive" } : state
      )
    );

    // Clear all timeouts
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];

    setTimeout(() => setFinished(true), 2000);
  };

  if (finished) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {loadingStates.map((state, index) => (
          <div
            key={index}
            className={`text-xs flex items-center gap-2 font-semibold ${
              state.status === "active" || state.status === "completed"
                ? "text-[#656667]"
                : "text-[#A7A8AA]"
            }`}
          >
            {state.status === "completed" ? (
              <Check className="w-4 h-4" /> // Check icon for completed
            ) : state.status === "active" && isLoading ? (
              <LoadingSpinner /> // Spinner for active
            ) : (
              <Clock className="w-4 h-4" /> // Clock icon for inactive
            )}
            {state.text}
          </div>
        ))}
      </div>

      {/* Stop Process Button */}
      {isLoading && (
        <Button onClick={handleStopProcess} className="mt-4">
          Stop Process
        </Button>
      )}
    </div>
  );
};
