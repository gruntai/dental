"use client"

import { useState } from "react"
import { AlertTriangle, ArrowLeft, ArrowRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function Reaction() {
    // View states
    const [currentView, setCurrentView] = useState<"dashboard" | "reactivation">("dashboard")

    // Modal states
    const [showShareModal, setShowShareModal] = useState(false)
    const [showActionNotPermitted, setShowActionNotPermitted] = useState(false)
    const [email, setEmail] = useState("")

    const handleBeginReactivation = () => {
        setCurrentView("reactivation")
        setShowShareModal(false)
        setShowActionNotPermitted(false)
    }

    const handleShareWithFrontDesk = () => {
        setShowShareModal(true)
        setShowActionNotPermitted(false)
    }

    const handleShareList = () => {
        setShowShareModal(false)
        setShowActionNotPermitted(true)
    }

    const closeAllModals = () => {
        setShowShareModal(false)
        setShowActionNotPermitted(false)
    }

    const goToDashboard = () => {
        setCurrentView("dashboard")
    }

    // Dashboard View
    const DashboardView = () => (
        <Card className="pt-0 px-0">
            <CardHeader className="space-y-3">
                <div className="inline-flex w-fit items-center px-4 py-2 rounded-full text-sm font-medium bg-black text-white mb-2">
                    📊 The Results
                </div>
                <CardTitle className="text-xl text-[#111827] font-normal">
                    You have <span className="font-bold">$178,000</span> worth of inactive patients
                </CardTitle>
                <CardDescription className="text-black  ">
                    These patients have been classified as inactive, having not returned to your practice in over a year. While
                    they were active, their combined spend averaged $178,000 per visit among 231 patients.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-bold mb-2 text-[13px]">Here's an example:</h3>
                    <div className="flex items-start gap-3 bg-[#FAFAFA] p-3 rounded-lg">
                        <div className="text-amber-500 mt-1">👉</div>
                        <div>
                            <p>
                                <span className="font-semibold">Nejat Murad</span> consistently spent{" "}
                                <span className="font-semibold">$1,800 per year</span> over two years before churning in October 2023.
                                The last recall attempt was made in July 2024, after which the patient was marked as inactive.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleBeginReactivation}>
                        <CardContent className="p-4 flex flex-col gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">👥</span>
                            </div>
                            <div>
                                <h3 className="font-medium">Begin Reactivation Using Grunt</h3>
                                <p className="text-sm text-gray-500">Grunt will handle the reactivation process for you.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleShareWithFrontDesk}>
                        <CardContent className="p-4 flex flex-col gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-medium">Share With Front Desk</h3>
                                <p className="text-sm text-gray-500">Let your front desk handle the reactivation process.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent></Card>

    )

    // Reactivation View (Auto Pilot Configuration)
    const ReactivationView = () => (
        <Card className="rounded-md">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={goToDashboard} className="mb-2">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <Button onClick={closeAllModals} className="w-fit h-9">
                        Save Settings
                    </Button>
                </div>
                <CardTitle className="font-normal">Auto Pilot Configuration</CardTitle>
                <CardDescription>Configure how Grunt will handle the patient reactivation process.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Run System Every */}
                <div className="space-y-2">
                    <Label htmlFor="frequency">Run System Every</Label>
                    <Select defaultValue="everyday">
                        <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="everyday">Everyday</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Mode */}
                <div className="space-y-2">
                    <Label htmlFor="mode">Mode</Label>
                    <Select defaultValue="sales">
                        <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sales">Sales Mode</SelectItem>
                            <SelectItem value="education">Education Mode</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Mode descriptions */}
                <div className="space-y-2 text-sm text-gray-600">
                    <p>Sales Mode – Focus on converting the patient to book or accept treatment.</p>
                    <p>Education Mode – Provide helpful information to build trust and explain the importance of treatment.</p>
                </div>

                {/* Custom Instructions */}
                <div className="space-y-2">
                    <Label htmlFor="instructions">Give it some custom instructions</Label>
                    <textarea
                        id="instructions"
                        className="w-full min-h-[100px] p-3 border rounded-md"
                        placeholder="For example:"
                    />
                </div>

                {/* Days in advance */}
                <div className="space-y-2">
                    <Label htmlFor="days">Specify how many days in advance the patient should be contacted.</Label>
                    <Input id="days" type="number" defaultValue={2} />
                </div>

                {/* Maximum attempts */}
                <div className="space-y-2">
                    <Label htmlFor="attempts">Set the maximum number of times the system should try reaching a patient.</Label>
                    <Input id="attempts" type="number" defaultValue={1} />
                </div>

                {/* Notify front desk */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="notify" />
                    <Label htmlFor="notify" className="text-sm font-normal">
                        Notify front desk when patient engages with reactivation outreach.
                    </Label>
                </div>

                {/* Save button */}
                <div className="pt-4">
                    <Button onClick={goToDashboard} className="w-full">
                        Save Settings
                    </Button>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div>
            {currentView === "dashboard" ? <DashboardView /> : <ReactivationView />}

            {/* Share With Front Desk Modal */}
            <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center justify-center mb-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">Patient Reactivation Demo</span>
                        </div>
                        <DialogTitle>Share List With Front Desk</DialogTitle>
                        <DialogDescription>Enter the email address you'd like to share this list with.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleShareList} className="w-full">
                            Share List
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Action Not Permitted Modal */}
            <Dialog open={showActionNotPermitted} onOpenChange={setShowActionNotPermitted}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Action Not Permitted</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="text-amber-500 mt-1">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="mb-1">This action is not allowed in this demo</p>
                                <p className="text-sm text-gray-500">Please create an account to complete this action.</p>
                            </div>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}
