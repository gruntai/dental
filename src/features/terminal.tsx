"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Terminal, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the message type
interface ProcessMessage {
  message: string;
  delay: number;
  indent?: boolean;
}

// The array of messages with their delays
const PROCESS_MESSAGES: ProcessMessage[] = [
  { message: "Running Grunt Retention Agent 10...", delay: 0 },
  { message: "Connecting to Open Dental Servers...", delay: 2000 },
  { message: "🔄 Verifying API Access Key...", delay: 2000, indent: true },
  { message: "✅ SUCCESS!", delay: 10000, indent: true },
  {
    message: "🔐 Requesting Token from Open Dental Authentication Server",
    delay: 6000,
    indent: true,
  },
  { message: "✅ API Token Received", delay: 10000, indent: true },
  { message: "✅ CONNECTION 200 OK", delay: 2000 },
  { message: "✅ Clinic Connected (Clinic ID: 037)", delay: 0 },
  {
    message: "📥 Fetching Active Team Members from GET /api/doctors...",
    delay: 47000,
  },
  {
    message: "✅ 1 Team Member Found: **Dr. John Smith (Dentist)**",
    delay: 10000,
  },
  { message: "🧠 Planning Workflow....", delay: 5000 },
  {
    message: "📡 Fetching Patient Data from GET /api/patients...",
    delay: 65000,
  },
  { message: "🔁 *Connection timeout retrying...*", delay: 47000 },
  {
    message: "✅ Patient data loaded successfully (Expected: `200 OK`)",
    delay: 87000,
  },
  { message: "✅ Patient data: 441 records imported", delay: 61000 },
  {
    message: "📥 Fetching patients with last visit >6 months...",
    delay: 10000,
  },
  { message: "✅ Patient data: 201 records found!", delay: 99000 },
  {
    message:
      "🧾 Extracting SOAP notes for 201 patients from GET api/patientnotes/...",
    delay: 2000,
  },
  { message: "✅ SUCCESS!", delay: 143000 },
  {
    message:
      '🔍 Searching patient notes for recall indicators: ["Return in 6 months", "Monitor condition", "Evaluate stability", "Follow Up"]',
    delay: 0,
  },
  {
    message: "✅ Patient data: 84 records found and added to recall list.",
    delay: 43000,
  },
  {
    message:
      "📡 Fetching last available X-rays for 441 patients from GET api/patient/repo...",
    delay: 3000,
  },
  { message: "✅ Patient data: 94 records found", delay: 12000 },
  {
    message:
      "🩻 Initiating XrayScan Agent // This agent is scanning xray repository records for incipient (based on provided examples)...",
    delay: 17000,
  },
];

interface LogEntry {
  timestamp: string;
  message: string;
  indent?: boolean;
}

export default function TerminalDrawer() {
  // State for drawer
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  // State for process
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [processRunning, setProcessRunning] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    intervalRef.current = interval;

    return () => clearInterval(interval);
  }, []);

  // Load saved state on initial render
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("terminalState");
      if (savedState) {
        const state = JSON.parse(savedState);
        setIsOpen(state.isOpen);
        setHeight(state.height || 300);
        setLogs(state.logs || []);
        setCurrentMessageIndex(state.currentMessageIndex || 0);
        setProcessComplete(state.processComplete || false);

        // Calculate progress based on current message index
        const progress = Math.min(
          100,
          (state.currentMessageIndex / PROCESS_MESSAGES.length) * 100
        );
        setProgress(progress);

        // If the drawer was open and process was not complete, resume the process
        // but only if we're not at the end of the messages
        if (
          state.isOpen &&
          !state.processComplete &&
          state.currentMessageIndex < PROCESS_MESSAGES.length
        ) {
          // Small delay to ensure state is fully loaded before resuming
          setTimeout(() => {
            setProcessRunning(true);
          }, 100);
        }
      }
    } catch (error) {
      console.error("Error loading saved terminal state:", error);
    }
  }, []);

  // Save state when it changes
  useEffect(() => {
    const state = {
      isOpen,
      height,
      logs,
      currentMessageIndex,
      processComplete,
    };
    localStorage.setItem("terminalState", JSON.stringify(state));
  }, [isOpen, height, logs, currentMessageIndex, processComplete]);

  // Process runner
  useEffect(() => {
    if (processRunning && currentMessageIndex < PROCESS_MESSAGES.length) {
      const currentMessage = PROCESS_MESSAGES[currentMessageIndex];
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timestamp = `${hours}:${minutes}:${seconds}`;

      if (currentMessageIndex >= logs.length) {
        setLogs((prev) => [
          ...prev,
          {
            timestamp,
            message: currentMessage.message,
            indent: currentMessage.indent,
          },
        ]);
      }

      const newProgress =
        ((currentMessageIndex + 1) / PROCESS_MESSAGES.length) * 100;
      setProgress(newProgress);

      scrollToBottom();

      if (currentMessageIndex < PROCESS_MESSAGES.length - 1) {
        const nextDelay = currentMessage.delay;
        timeoutRef.current = setTimeout(
          () => {
            setCurrentMessageIndex((prev) => prev + 1);
          },
          nextDelay === 0 ? 1000 : nextDelay
        );
      } else {
        // Process is complete, clear timeout
        setProcessRunning(false);
        setProcessComplete(true);

        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
          intervalRef.current = null; // Ensure it's reset
        }
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null; // Ensure it's reset
      }
    };
  }, [processRunning, currentMessageIndex, logs.length]);

  if (processComplete) timeoutRef.current = null;

  // Start or resume process when drawer is opened
  useEffect(() => {
    if (
      isOpen &&
      !processComplete &&
      !processRunning &&
      currentMessageIndex < PROCESS_MESSAGES.length
    ) {
      setProcessRunning(true);
    }
  }, [isOpen, processComplete, processRunning, currentMessageIndex]);

  // Scroll to bottom when new logs are added
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 50);
      }
    }
  };

  // Reset process
  const resetProcess = () => {
    setLogs([]);
    setCurrentMessageIndex(0);
    setProcessComplete(false);
    setProcessRunning(true);
    setProgress(0);
  };

  // Handle mouse down on the drag handle
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartHeight(height);
    document.body.style.userSelect = "none"; // Prevent text selection during drag
    e.preventDefault();
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = startY - e.clientY;
      const newHeight = Math.max(
        150,
        Math.min(window.innerHeight * 0.8, startHeight + deltaY)
      );
      setHeight(newHeight);
      e.preventDefault();
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = ""; // Re-enable text selection
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = ""; // Ensure text selection is re-enabled
    };
  }, [isDragging, startY, startHeight]);

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setStartHeight(height);
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const deltaY = startY - e.touches[0].clientY;
      const newHeight = Math.max(
        150,
        Math.min(window.innerHeight * 0.8, startHeight + deltaY)
      );
      setHeight(newHeight);
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, startY, startHeight]);

  // Toggle terminal
  const toggleTerminal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-[99999999999]">
      {/* Navbar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTerminal}
        className="relative"
      >
        <Terminal className="h-5 w-5" />
        {processRunning && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
        )}
        {processComplete && !processRunning && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
        )}
      </Button>
      {/* Terminal drawer */}
      {isOpen && (
        <div
          className="z-[9999999999999999999999] fixed bottom-0 left-0 right-0 bg-[#0a1020] text-white font-mono text-sm shadow-lg transition-transform duration-300 ease-in-out"
          style={{ height: `${height}px` }}
        >
          {/* Drag handle */}
          <div
            className=" h-6 bg-gray-800 cursor-ns-resize flex items-center justify-between px-4 z-[99999999]"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="h-1 w-16 bg-gray-600 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              {processComplete && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer"
                  onClick={resetProcess}
                >
                  Restart
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-white  hover:bg-gray-800  cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-800">
            <div
              className="h-full bg-green-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Log content */}
          <ScrollArea
            ref={scrollAreaRef}
            className="h-full pt-8 px-4 pb-10 z-[9999999999999999]"
          >
            <div className="space-y-1">
              {logs.map((log, index) => {
                let textColor = "text-white";

                if (log.message.includes("✅")) textColor = "text-green-400";
                if (log.message.includes("🔄")) textColor = "text-blue-400";
                if (log.message.includes("🔁")) textColor = "text-red-400";
                if (
                  log.message.includes("ERROR") ||
                  log.message.includes("timeout")
                )
                  textColor = "text-red-400";

                // Handle markdown-style formatting
                let formattedMessage = log.message;
                formattedMessage = formattedMessage.replace(
                  /\*\*(.*?)\*\*/g,
                  '<span class="font-bold">$1</span>'
                );
                formattedMessage = formattedMessage.replace(
                  /\*(.*?)\*/g,
                  '<span class="italic">$1</span>'
                );
                formattedMessage = formattedMessage.replace(
                  /`(.*?)`/g,
                  '<span class="bg-gray-800 px-1 rounded">$1</span>'
                );

                return (
                  <div
                    key={index}
                    className={`${textColor} font-mono whitespace-pre-wrap ${
                      log.indent ? "ml-8" : ""
                    }`}
                  >
                    <span className="text-gray-400">[{log.timestamp}]</span>{" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: formattedMessage }}
                    />
                  </div>
                );
              })}
              {processRunning && (
                <div className="text-white font-mono flex items-center">
                  <span className="text-gray-400">[{currentTime}]</span>{" "}
                  <div className="animate-pulse ml-2">⏳ Processing...</div>
                </div>
              )}
              {processComplete && (
                <div className="text-green-400 font-mono mt-4">
                  <span className="text-gray-400">[{currentTime}]</span> ✅
                  Process completed successfully
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
