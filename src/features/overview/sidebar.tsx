"use client"

import { useState, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

// Define the steps in the onboarding process
export type OnboardingStep = {
    id: string
    title: string
    isActive: boolean
    isCompleted: boolean
}

interface OnboardingSidebarProps {
    currentStep: string
    progress: number
    processMessages: { message: string; timestamp: string }[]
}

const defaultOnboardingSteps: OnboardingStep[] = [
    { id: "connect", title: "Connect Your Practice", isActive: true, isCompleted: false },
    { id: "import", title: "Import Patient Database", isActive: false, isCompleted: false },
    { id: "scan", title: "Scan Patient Database", isActive: false, isCompleted: false },
    { id: "identify", title: "Identify Hidden Revenue", isActive: false, isCompleted: false },
    { id: "auto", title: "Auto Pilot Configurations", isActive: false, isCompleted: false },
]

export default function OnboardingSidebar({ currentStep, progress, processMessages }: OnboardingSidebarProps) {
    const [steps, setSteps] = useState<OnboardingStep[]>(defaultOnboardingSteps)

    // Update active step based solely on currentStep prop
    useEffect(() => {
        setSteps(prev => {
            const newSteps = [...prev];
            // Only update the active state based on currentStep
            newSteps.forEach(step => {
                step.isActive = step.id === currentStep;
            });
            return newSteps;
        });
    }, [currentStep]);

    // Separately track completion status based on messages
    useEffect(() => {
        if (processMessages.length === 0) return;
        
        // Check for completion messages without changing active state
        const hasMessage = (keywords: string[]) => {
            return processMessages.some(msg => 
                keywords.some(keyword => msg.message.toLowerCase().includes(keyword.toLowerCase()))
            );
        };
        
        setSteps(prevSteps => {
            const newSteps = [...prevSteps];
            
            // Step 1: Connect - check for provider found
            if (hasMessage(["provider found", "connection established"])) {
                newSteps[0].isCompleted = true;
            }
            
            // Step 2: Import - check for database imported
            if (hasMessage(["database", "imported", "1441 Patient"])) {
                newSteps[1].isCompleted = true;
            }
            
            // Step 3: Scan - check for reactivation list
            if (hasMessage(["reactivation list", "final", "list prepared"])) {
                newSteps[2].isCompleted = true;
            }
            
            // Step 4: Identify - check for revenue report
            if (hasMessage(["revenue report", "opportunity", "$178,000"])) {
                newSteps[3].isCompleted = true;
            }
            
            // Step 5: Auto Pilot - check for process completed
            if (hasMessage(["process completed", "completed successfully"])) {
                newSteps[4].isCompleted = true;
            }
            
            return newSteps;
        });
    }, [processMessages]);

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
                            !step.isActive && step.isCompleted && "text-muted-foreground",
                        )}
                    >
                        {step.isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                            <div
                                className={cn(
                                    "flex h-5 w-5 items-center justify-center rounded-full border",
                                    step.isActive ? "border-white bg-black" : "border-muted-foreground",
                                )}
                            >
                                <div className={cn("h-2 w-2 rounded-full", step.isActive ? "bg-white" : "bg-transparent")} />
                            </div>
                        )}
                        <span className={`text-sm font-normal ${step.isCompleted ? "line-through" : ""}`}>{step.title}</span>
                    </div>
                ))}
            </Card>
        </div>
    )
}
