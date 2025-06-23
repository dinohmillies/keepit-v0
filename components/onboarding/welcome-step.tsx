"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trophy, Target, Zap } from "lucide-react"
import type { OnboardingData } from "../onboarding-flow"

interface WelcomeStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
}

export function WelcomeStep({ data, updateData, onNext }: WelcomeStepProps) {
  const handleNext = () => {
    if (data.name.trim()) {
      onNext()
    }
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardContent className="p-8 text-center">
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Athletic Journey Oumar 😉!
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Let's personalize your experience and create a training plan that fits your goals, lifestyle, and
            motivation.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="text-left max-w-md mx-auto">
            <Label htmlFor="name" className="text-base font-medium text-gray-700">
              What should we call you?
            </Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              placeholder="Enter your first name"
              className="mt-2 text-lg p-3 border-2 focus:border-blue-500"
              autoFocus
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg">
            <Trophy className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-blue-900">Track Progress</p>
            <p className="text-blue-700">Monitor your achievements</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="font-medium text-green-900">Set Goals</p>
            <p className="text-green-700">Define your targets</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="font-medium text-purple-900">Stay Motivated</p>
            <p className="text-purple-700">Build lasting habits</p>
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={!data.name.trim()}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-medium"
        >
          Let's Get Started! 🚀
        </Button>

        <p className="text-sm text-gray-500 mt-4">This will only take 2-3 minutes</p>
      </CardContent>
    </Card>
  )
}
