"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

// Define the steps in the onboarding process
export type OnboardingStep = {
  id: string;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
};

interface OnboardingSidebarProps {
  currentStep: string;
  progress: number;
  processMessages: { message: string; timestamp: string }[];
}

const defaultOnboardingSteps: OnboardingStep[] = [
  {
    id: "connect",
    title: "Connect Your Practice",
    isActive: true,
    isCompleted: false,
  },
  {
    id: "import",
    title: "Import Patient Database",
    isActive: false,
    isCompleted: false,
  },
  {
    id: "scan",
    title: "Scan Patient Database",
    isActive: false,
    isCompleted: false,
  },
  {
    id: "identify",
    title: "Identify Hidden Revenue",
    isActive: false,
    isCompleted: false,
  },
  {
    id: "auto",
    title: "Auto Pilot Configurations",
    isActive: false,
    isCompleted: false,
  },
];

export default function OnboardingSidebar({
  currentStep,
  progress,
  processMessages,
}: OnboardingSidebarProps) {
  const [steps, setSteps] = useState<OnboardingStep[]>(defaultOnboardingSteps);
  const [previousStep, setPreviousStep] = useState<string | null>(null);

  // Reset steps if process messages are cleared
  useEffect(() => {
    if (processMessages.length === 0) {
      setSteps(defaultOnboardingSteps.map((step) => ({ ...step })));
      setPreviousStep(null);
    }
  }, [processMessages]);

  // Track step transitions to help with completion logic
  useEffect(() => {
    if (previousStep && previousStep !== currentStep) {
      // console.log(`Step transition: ${previousStep} -> ${currentStep}`);

      // When a step is no longer active, check if it should be marked as completed
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        console.log(currentStep, "--- ", newSteps);

        // Find the previous step that is no longer active
        const prevStepIndex = newSteps.findIndex(
          (step) => step.id === previousStep
        );
        if (prevStepIndex !== -1) {
          // Mark the previous step as inactive
          newSteps[prevStepIndex].isActive = false;

          // Check if we should mark it as completed based on the step completion conditions
          const hasCompletionMessage = checkStepCompletionMessage(
            newSteps[prevStepIndex].id
          );
          console.log(checkStepCompletionMessage(newSteps[prevStepIndex].id));
          console.log("*".repeat(20));

          if (hasCompletionMessage) {
            // console.log(`Marking ${previousStep} as completed because we're moving to the next step and it has a completion message`);
            newSteps[prevStepIndex].isCompleted = true;
          }
        }

        return newSteps;
      });
    }

    // Update the previous step for the next transition
    setPreviousStep(currentStep);
  }, [currentStep, previousStep, processMessages]);

  // Helper function to check if there's a completion message for a specific step
  const checkStepCompletionMessage = (stepId: string): boolean => {
    const hasMessage = (keywords: string[]) => {
      // Convert all processMessages to lowercase for case-insensitive matching
      const allMessages = processMessages
        .map((msg) => msg.message.toLowerCase())
        .join(" ");

      // Check if any keyword is in the combined message text
      return keywords.some((keyword) => allMessages.includes(keyword.toLowerCase()));
    };

    switch (stepId) {
      case "connect":
        return hasMessage([
          "pulling provider directory",
          "active provider found",
          "provider found",
          "connection established",
        ]);
      case "import":
        return hasMessage([
          "segmenting records",
          "database imported",
          "1441 patient",
          "patient database",
        ]);
      case "scan":
        // For scan specifically, check all messages individually for each keyword
        // This gives us a better chance of finding a match
        return hasMessage([
          "final reactivation list",
          "reactivation list prepared",
          "936 patients",
          "aggregating spend history",
          "calculating average annual spend",
          "avg spend per year",
        ]);
      case "identify":
        return hasMessage([
          "305 patients matched",
          "high-signal recall",
          "revenue report",
          "opportunity",
          "projecting missed revenue",
        ]);
      case "auto":
        return hasMessage([
          "process completed",
          "completed successfully",
          "revenue report generated",
          "configuration complete",
        ]);
      default:
        return false;
    }
  };

  // Update active step based solely on currentStep prop
  useEffect(() => {
    setSteps((prev) => {
      const newSteps = [...prev];

      // First: Update active states based on currentStep
      newSteps.forEach((step) => {
        step.isActive = step.id === currentStep;
      });

      // Special case: If the last step is completed, remove active state from all steps
      if (newSteps[4].isCompleted) {
        newSteps.forEach((step) => {
          step.isActive = false;
        });
      }

      return newSteps;
    });
  }, [currentStep]);

  // Process messages for direct completion signals
  useEffect(() => {
    if (processMessages.length === 0) return;

    const lastMessage =
      processMessages[processMessages.length - 1]?.message.toLowerCase() || "";
    
    console.log("Processing completion signals. Last message:", lastMessage);
    console.log("Current step:", currentStep);
    console.log("All messages:", processMessages.map(m => m.message.toLowerCase()));

    // Check for completion signals in the most recent message
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      
      // Look for scan completion messages specifically
      const allMessagesText = processMessages.map(m => m.message.toLowerCase()).join(" ");
      
      // Check for scan step completion signals
      if (
        (allMessagesText.includes("reactivation list") || 
         allMessagesText.includes("936 patients") ||
         allMessagesText.includes("final reactivation") ||
         allMessagesText.includes("aggregating spend")) &&
        currentStep === "identify" &&
        !newSteps[2].isCompleted
      ) {
        console.log("FOUND SCAN COMPLETION MESSAGE! Marking scan as completed");
        newSteps[2].isCompleted = true;
      }

      // Direct completion checks for strong completion signals
      // Auto Pilot completion signals (these are definitive and override other states)
      if (
        lastMessage.includes("revenue report generated") ||
        lastMessage.includes("process completed") ||
        lastMessage.includes("completed successfully")
      ) {
        // console.log("Found final completion message, marking auto step as completed");
        newSteps[4].isCompleted = true;
        // When final step is complete, make sure no step is active
        newSteps.forEach((step) => (step.isActive = false));
      }

      return newSteps;
    });
  }, [processMessages, currentStep]);

  // Force completion for scan step if needed
  useEffect(() => {
    // If we're on the identify step, scan should be completed
    if (currentStep === "identify") {
      setSteps(prevSteps => {
        // Only update if scan isn't already completed
        if (!prevSteps[2].isCompleted) {
          console.log("FORCING SCAN COMPLETION because we're on identify step");
          const newSteps = [...prevSteps];
          newSteps[2].isCompleted = true;
          return newSteps;
        }
        return prevSteps;
      });
    }
  }, [currentStep]);

  // console.log(
  //   "Current steps state:",
  //   steps
  //     .map((s) => `${s.id}: active=${s.isActive}, completed=${s.isCompleted}`)
  //     .join(", ")
  // );

  return (
    <div className="w-full sm:max-w-xs bg-background">
      <Card className="space-y-2 w-full p-4">
        <h2 className="text-[16px] font-normal">Onboarding Checklist</h2>
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2",
              step.isActive && "bg-black text-white",
              !step.isActive && step.isCompleted && "text-muted-foreground"
            )}
          >
            {step.isCompleted ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <div
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border",
                  step.isActive
                    ? "border-white bg-black"
                    : "border-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    step.isActive ? "bg-white" : "bg-transparent"
                  )}
                />
              </div>
            )}
            <span
              className={`text-sm font-normal ${
                step.isCompleted ? "line-through" : ""
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}
