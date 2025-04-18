"use client"

import type React from "react"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProcessMessage, RAW_PROCESS_MESSAGES } from "@/constants"

// Enhanced interfaces to match the new data structure
interface ProcessStep {
  name: string
  messages: ProcessMessage[]
}

// Parse the timestamp string into seconds
function parseTimestamp(timestamp: string): number {
  // Remove brackets and split by ":"
  const timeStr = timestamp.replace(/[[\]]/g, "").split(":")
  const hours = Number.parseInt(timeStr[0], 10)
  const minutes = Number.parseInt(timeStr[1], 10)
  const seconds = Number.parseInt(timeStr[2], 10)

  return hours * 3600 + minutes * 60 + seconds
}

// Format seconds into a timestamp string
function formatTimestamp(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0")
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0")
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

// Flatten the steps and messages into a single array with calculated delays
function calculateDelays(steps: ProcessStep[]): { message: string; delay: number; indent?: boolean; timestamp: string }[] {
  const result = []

  for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
    const step = steps[stepIndex]
    
    // Skip adding the step header as requested
    
    for (let i = 0; i < step.messages.length; i++) {
      result.push({
        message: step.messages[i].message,
        delay: 800, // Use a fixed delay for all messages to ensure consistent progression
        indent: step.messages[i].indent,
        timestamp: step.messages[i].timestamp,
      })
    }
  }

  return result
}

// Calculate delays between messages
const PROCESS_MESSAGES = calculateDelays(RAW_PROCESS_MESSAGES)

interface LogEntry {
  timestamp: string
  message: string
  indent?: boolean
}

interface TerminalDrawerProps {
  onProgressChange: (progress: number, messages: { message: string; timestamp: string }[]) => void
  onOpenChange?: (open: boolean) => void
  onProcessComplete?: () => void
  onProcessReset?: () => void
}

// Export the component with a ref
const TerminalDrawer = forwardRef<{ openTerminal: () => void }, TerminalDrawerProps>(
  ({ onProgressChange, onOpenChange, onProcessComplete, onProcessReset }, ref) => {
    // State for drawer
    const [isOpen, setIsOpen] = useState(false)
    const [height, setHeight] = useState(300)
    const [isDragging, setIsDragging] = useState(false)
    const [startY, setStartY] = useState(0)
    const [startHeight, setStartHeight] = useState(0)

    // State for process
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
    const [processRunning, setProcessRunning] = useState(false)
    const [processComplete, setProcessComplete] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState("")
    const [processStartTime, setProcessStartTime] = useState<Date | null>(null)
    const [autoStartProcess, setAutoStartProcess] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Expose the openTerminal method to parent components
    useImperativeHandle(ref, () => ({
      openTerminal: () => {
        // Clear any existing state
        setLogs([])
        setCurrentMessageIndex(0)
        setProcessComplete(false)
        setProgress(0)
        setProcessRunning(false)
        setProcessStartTime(null)

        // Open the terminal
        setIsOpen(true)

        // Set flag to start process after terminal is open
        setAutoStartProcess(true)

        // Notify parent of reset
        if (onProcessReset) {
          onProcessReset()
        }
      },
    }))

    // Update current time
    useEffect(() => {
      const updateTime = () => {
        const now = new Date()
        const hours = now.getHours().toString().padStart(2, "0")
        const minutes = now.getMinutes().toString().padStart(2, "0")
        const seconds = now.getSeconds().toString().padStart(2, "0")
        setCurrentTime(`${hours}:${minutes}:${seconds}`)
      }

      updateTime()
      const interval = setInterval(updateTime, 1000)
      intervalRef.current = interval

      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
    }, [])

    // Stop the timer when process is complete
    useEffect(() => {
      if (processComplete && intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, [processComplete])

    // Notify parent of open state changes
    useEffect(() => {
      if (onOpenChange) {
        onOpenChange(isOpen)
      }
    }, [isOpen, onOpenChange])

    // Update parent component with progress
    useEffect(() => {
      onProgressChange(
        progress,
        logs.map((log) => ({ message: log.message, timestamp: log.timestamp })),
      )
    }, [progress, logs, onProgressChange])

    // Notify parent when process completes
    useEffect(() => {
      if (processComplete && onProcessComplete) {
        onProcessComplete()
      }
    }, [processComplete, onProcessComplete])

    // Start process after terminal is opened if autoStartProcess is true
    useEffect(() => {
      if (isOpen && autoStartProcess && !processRunning && !processComplete) {
        // Small delay to ensure terminal is fully rendered
        const timer = setTimeout(() => {
          setProcessRunning(true)
          setProcessStartTime(new Date())
          setAutoStartProcess(false)
        }, 500)

        return () => clearTimeout(timer)
      }
    }, [isOpen, autoStartProcess, processRunning, processComplete])

    // Process runner
    useEffect(() => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      if (processRunning && currentMessageIndex < PROCESS_MESSAGES.length) {
        const currentMessage = PROCESS_MESSAGES[currentMessageIndex]
        
        // Use current time for timestamps to avoid any calculation issues
        const now = new Date()
        const hours = now.getHours().toString().padStart(2, "0")
        const minutes = now.getMinutes().toString().padStart(2, "0")
        const seconds = now.getSeconds().toString().padStart(2, "0")
        const timestampStr = `${hours}:${minutes}:${seconds}`

        // Add new log entry
        setLogs((prev) => [
          ...prev,
          {
            timestamp: timestampStr,
            message: currentMessage.message,
            indent: currentMessage.indent,
          },
        ])

        // Update progress
        const newProgress = Math.min(100, ((currentMessageIndex + 1) / PROCESS_MESSAGES.length) * 100)
        setProgress(newProgress)

        scrollToBottom()

        // Schedule next message or complete process
        if (currentMessageIndex < PROCESS_MESSAGES.length - 1) {
          // Helper to parse [hh:mm:ss] timestamp to ms
          const timestampToMs = (ts: string) => {
            const match = ts.match(/\[(\d{2}):(\d{2}):(\d{2})\]/);
            if (!match) return 0;
            const [, h, m, s] = match;
            return (parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s)) * 1000;
          }

          let nextDelay = 1000;
          if (currentMessageIndex < PROCESS_MESSAGES.length - 1) {
            const currentTs = PROCESS_MESSAGES[currentMessageIndex].timestamp;
            const nextTs = PROCESS_MESSAGES[currentMessageIndex + 1].timestamp;
            if (currentTs && nextTs) {
              nextDelay = Math.max(timestampToMs(nextTs) - timestampToMs(currentTs), 500);
            }
          }
          
          timeoutRef.current = setTimeout(() => {
            setCurrentMessageIndex((prev) => prev + 1)
          }, nextDelay)
        } else {
          // Process is complete
          setProcessRunning(false)
          setProcessComplete(true)
        }
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      }
    }, [processRunning, currentMessageIndex])

    // Scroll to bottom when new logs are added
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
        if (scrollContainer) {
          setTimeout(() => {
            scrollContainer.scrollTop = scrollContainer.scrollHeight
          }, 50)
        }
      }
    }

    // Reset process
    const resetProcess = () => {
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      setLogs([])
      setCurrentMessageIndex(0)
      setProcessComplete(false)
      setProgress(0)
      setProcessStartTime(new Date())

      // Small delay before starting process
      setTimeout(() => {
        setProcessRunning(true)
      }, 100)

      // Notify parent of reset
      if (onProcessReset) {
        onProcessReset()
      }
    }

    // Handle mouse down on the drag handle
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true)
      setStartY(e.clientY)
      setStartHeight(height)
      document.body.style.userSelect = "none" // Prevent text selection during drag
      e.preventDefault()
    }

    // Handle mouse move for dragging
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return

        const deltaY = startY - e.clientY
        const newHeight = Math.max(150, Math.min(window.innerHeight * 0.8, startHeight + deltaY))
        setHeight(newHeight)
        e.preventDefault()
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.body.style.userSelect = "" // Re-enable text selection
      }

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.userSelect = "" // Ensure text selection is re-enabled
      }
    }, [isDragging, startY, startHeight])

    // Handle touch events for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
      setIsDragging(true)
      setStartY(e.touches[0].clientY)
      setStartHeight(height)
    }

    useEffect(() => {
      const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return

        const deltaY = startY - e.touches[0].clientY
        const newHeight = Math.max(150, Math.min(window.innerHeight * 0.8, startHeight + deltaY))
        setHeight(newHeight)
        e.preventDefault()
      }

      const handleTouchEnd = () => {
        setIsDragging(false)
      }

      if (isDragging) {
        document.addEventListener("touchmove", handleTouchMove, {
          passive: false,
        })
        document.addEventListener("touchend", handleTouchEnd)
      }

      return () => {
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }, [isDragging, startY, startHeight])

    // Toggle terminal
    const toggleTerminal = () => {
      setIsOpen(!isOpen)
    }

    return (
      <div className="relative z-[99999999999]">
        {/* Navbar */}
        {/* <Button variant="ghost" size="icon" onClick={toggleTerminal} className="relative">
          <Terminal className="h-5 w-5" />
          {processRunning && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
          )}
          {processComplete && !processRunning && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
          )}
        </Button> */}
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
            <ScrollArea ref={scrollAreaRef} className="h-full pt-8 px-4 pb-10 z-[9999999999999999]">
              <div className="space-y-1">
                {logs.map((log, index) => {
                  // Determine text color for regular messages
                  let textColor = "text-white"

                  if (log.message.includes("✅")) textColor = "text-green-400"
                  if (log.message.includes("🔄")) textColor = "text-blue-400"
                  if (log.message.includes("🔁")) textColor = "text-red-400"
                  if (log.message.includes("ERROR") || log.message.includes("timeout")) textColor = "text-red-400"
                  if (log.message.includes("⚠️")) textColor = "text-yellow-400"

                  // Handle markdown-style formatting
                  let formattedMessage = log.message
                  formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
                  formattedMessage = formattedMessage.replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
                  formattedMessage = formattedMessage.replace(
                    /`(.*?)`/g,
                    '<span class="bg-gray-800 px-1 rounded">$1</span>',
                  )

                  return (
                    <div
                      key={index}
                      className={`${textColor} font-mono whitespace-pre-wrap ${log.indent ? "ml-8" : ""}`}
                    >
                      <span className="text-gray-400">[{log.timestamp}]</span>{" "}
                      <span dangerouslySetInnerHTML={{ __html: formattedMessage }} />
                    </div>
                  )
                })}
                {processRunning && (
                  <div className="text-white font-mono flex items-center">
                    <span className="text-gray-400">[{currentTime}]</span>{" "}
                    <div className="animate-pulse ml-2">⏳ Processing...</div>
                  </div>
                )}
                {processComplete && (
                  <div className="text-green-400 font-mono mt-4">
                    <span className="text-gray-400">[{currentTime}]</span> ✅ Process completed successfully
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    )
  },
)

TerminalDrawer.displayName = "TerminalDrawer"

export default TerminalDrawer
