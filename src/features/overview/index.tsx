"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TerminalDrawer from "../terminal";
import OnboardingSidebar from "./sidebar";

import { ConnectForm } from "./ConnectForm";
import PracticeSystemForm from "./PracticeManagementForm";
import PatientRetentionTable from "../retention/PatientsTable";
import Reaction from "./Reaction";

// Define onboarding steps
const defaultOnboardingSteps = [
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

export default function PatientReactivation() {
  const [currentStep, setCurrentStep] = useState("connect");
  const [progress, setProgress] = useState(0);
  const [processMessages, setProcessMessages] = useState<
    { message: string; timestamp: string }[]
  >([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [processStarted, setProcessStarted] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const terminalRef = useRef<{ openTerminal: () => void } | null>(null);
  const [isShown, setIsShown] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [sidebarKey, setSidebarKey] = useState(0);

  // Find the current board based on the step
  const currentBoard = defaultOnboardingSteps.find(
    (step) => step.id === currentStep
  );

  // Force table display after certain time in the import stage
  useEffect(() => {
    // Force show table after being in import step for 20 seconds
    if (currentStep === "import" && processStarted) {
      const timer = setTimeout(() => {
        if (!showTable) {
          // console.log("⚠️ FORCING TABLE DISPLAY after timeout in import step");
          setShowTable(true);
        }
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, processStarted, showTable]);

  // Much simpler check for database import message
  useEffect(() => {
    const lastMsg = processMessages[processMessages.length - 1];
    if (lastMsg) {
      // console.log("Checking message:", lastMsg.message);
    }

    // Simple check to just detect any message containing key phrases
    if (
      processMessages.some(
        (msg) =>
          msg.message.includes("Segmenting records") ||
          msg.message.includes("successfully imported") ||
          msg.message.includes("1441 Patient") ||
          (msg.message.includes("database") && msg.message.includes("imported"))
      )
    ) {
      // console.log("🔥 IMPORT DETECTED - Showing table!");
      setShowTable(true);
    }

    // Check for end message
    if (
      processMessages.some((msg) =>
        msg.message.includes("Revenue report generated")
      )
    ) {
      setShowReaction(true);
    }
  }, [processMessages]);

  // Handle progress updates from the terminal
  const handleProgressChange = (
    newProgress: number,
    messages: { message: string; timestamp: string }[]
  ) => {
    // Only update state if progress has actually changed
    if (progress !== newProgress) {
      setProgress(newProgress);

      // Only update messages if they've changed
      if (messages.length !== processMessages.length) {
        setProcessMessages(messages);
      }

      // Update current step based on progress thresholds
      // Each step has a progress range and will be marked as active when progress is in that range
      if (newProgress >= 0 && newProgress < 25) {
        setCurrentStep("connect");
      } else if (newProgress >= 25 && newProgress < 50) {
        // If we're entering the import step, that means connect is complete
        setCurrentStep("import");
      } else if (newProgress >= 50 && newProgress < 75) {
        // If we're entering the scan step, that means import is complete
        setCurrentStep("scan");
      } else if (newProgress >= 75 && newProgress < 90) {
        // If we're entering the identify step, that means scan is complete
        setCurrentStep("identify");
      } else if (newProgress >= 90) {
        // If we're entering the auto step, that means identify is complete
        setCurrentStep("auto");
      }
    }
  };

  // Handle terminal open state
  const handleTerminalOpenChange = (open: boolean) => {
    setIsTerminalOpen(open);
  };

  // Handle process completion
  const handleProcessComplete = () => {
    // console.log("Process completed");
  };

  // Handle process reset
  const handleProcessReset = () => {
    // Reset sidebar state
    setCurrentStep("connect");
    setProgress(0);
    setProcessMessages([]);
    setProcessStarted(true);
    setShowTable(false);
    setShowReaction(false);
    setSidebarKey((k) => k + 1); // force sidebar remount
  };

  // Handle connect button click
  const handleConnectClick = () => {
    if (terminalRef.current) {
      setProcessStarted(true);
      terminalRef.current.openTerminal();
      // setIsShown(false);
    }
  };

  //   console.log("currentBoard", currentBoard);
  //   console.log("processStarted", processStarted);
  // console.log("showTable", showTable);

  return (
    <div className="h-screen">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal">Patient Reactivation</h1>
          <p className="text-sm text-[#525252]">
            Setup your patient reactivation program to run on auto pilot.
          </p>
        </div>

        {/* Terminal drawer button */}
        <div className="flex items-center">
          <TerminalDrawer
            ref={terminalRef}
            onProgressChange={handleProgressChange}
            onOpenChange={handleTerminalOpenChange}
            onProcessComplete={handleProcessComplete}
            onProcessReset={handleProcessReset}
          />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-wrap xl:flex-nowrap gap-y-5">
        {/* Sidebar */}
        <OnboardingSidebar
          key={sidebarKey}
          currentStep={currentStep}
          progress={progress}
          processMessages={processMessages}
        />
        {/* Main content area */}
        <div className="xl:px-5 w-full">
          {/* Show Reaction component when the process is complete (after the final step) */}
          {showReaction && <Reaction />}

          {/* Conditionally show the main content box based on step */}
          {(!showReaction ||
            (currentBoard?.id !== "scan" &&
              currentBoard?.id !== "identify" &&
              currentBoard?.id !== "auto")) && (
            <div className="rounded-lg border p-6 mb-6 space-y-4">
              <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-2">
                <h2 className="text-sm sm:text-lg font-normal">
                  {currentBoard?.title}
                </h2>
                <Badge className="w-fit text-[10px] sm:text-xs font-normal bg-[#E5E7EB] text-black py-1.5">
                  {processStarted ? "In Progress" : "Not Started"}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#525252]">
                {currentBoard?.id === "connect"
                  ? processStarted
                    ? "Connecting to your practice management system. This will take a few seconds. Please do not close this page."
                    : "Connect your practice management system or EHR systems in just a few seconds."
                  : (() => {
                      const lastMessage = processMessages[processMessages.length - 1];
                      if (!lastMessage) return null;
                      // Split message into lines
                      const lines = lastMessage.message.split(/\n|\\n/);
                      // Find the index of the first bullet/point
                      const firstPointIdx = lines.findIndex(
                        (line) => line.trim().startsWith("•") || line.trim().startsWith("-")
                      );
                      if (firstPointIdx !== -1) {
                        const titleLines = lines.slice(0, firstPointIdx).filter(l => l.trim() !== "");
                        const points = lines.slice(firstPointIdx).filter(l => l.trim().startsWith("•") || l.trim().startsWith("-"));
                        return (
                          <>
                            <span>[{lastMessage.timestamp}]</span>
                            {titleLines.length > 0 && (
                              <div className="font-medium mb-1">{titleLines.join(" ")}</div>
                            )}
                            <ul className="ml-4 list-disc">
                              {points.map((line, i) => (
                                <li key={i}>{line.replace(/^\s*[•-]\s*/, "")}</li>
                              ))}
                            </ul>
                          </>
                        );
                      }
                      return `[${lastMessage.timestamp}] ${lastMessage.message}`;
                    })()}
              </p>
              <div className="flex gap-2">
                {!processStarted && (
                  <>
                    <ConnectForm
                      setIsConnected={setIsConnected}
                      isConnected={isConnected}
                    />
                    <PracticeSystemForm
                      isConnected={isConnected}
                      onConnect={handleConnectClick}
                    />
                  </>
                )}

                {processStarted && currentBoard?.id == "connect" && (
                  <Button disabled className="h-9">
                    Connecting...
                  </Button>
                )}

                {currentBoard?.id == "connect" && (
                  <Button
                    className="border px-4 py-2 rounded-md text-sm font-normal "
                    variant={"outline"}
                  >
                    Learn More
                  </Button>
                )}
              </div>

              {/* Show table when on import step and the database import message has been shown */}
              {processStarted && showTable && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">
                    Imported Patient Records
                  </h3>
                  <PatientRetentionTable />
                </div>
              )}

              {/* Show table wrapper without table when on import step but the database import message hasn't been shown yet */}
              {processStarted &&
                currentBoard?.id === "import" &&
                !showTable && (
                  <div className="mt-4 border rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2">
                      Importing Patient Records...
                    </h3>
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
