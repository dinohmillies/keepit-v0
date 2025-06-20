"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type { OnboardingData } from "../onboarding-flow"

interface CompletionStepProps {
  data: OnboardingData
  onBack: () => void
}

export function CompletionStep({ data, onBack }: CompletionStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleComplete = async () => {
    setIsLoading(true)

    // Simulate saving user data
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save to localStorage for demo purposes
    localStorage.setItem("userOnboardingData", JSON.stringify(data))
    localStorage.setItem("onboardingCompleted", "true")

    // Redirect to payment wall instead of main app
    router.push("/payment")
  }

  const getGoalName = (goalId: string) => {
    const goals: Record<string, string> = {
      "lose-weight": "Lose Weight",
      "build-muscle": "Build Muscle",
      "improve-endurance": "Improve Endurance",
      "get-stronger": "Get Stronger",
      "stay-healthy": "Stay Healthy",
      compete: "Compete",
    }
    return goals[goalId] || goalId
  }

  const getFitnessLevelName = (level: string) => {
    const levels: Record<string, string> = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    }
    return levels[level] || level
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardContent className="p-8 text-center">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfect! You're all set, {data.name}! 🎉</h1>
          <p className="text-lg text-gray-600">We've created a personalized fitness experience just for you</p>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
            Your Personalized Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Primary Goal:</p>
              <Badge className="bg-blue-600 text-white mt-1">{getGoalName(data.primaryGoal)}</Badge>
            </div>

            <div>
              <p className="font-medium text-gray-700">Fitness Level:</p>
              <Badge variant="outline" className="mt-1">
                {getFitnessLevelName(data.fitnessLevel)}
              </Badge>
            </div>

            <div>
              <p className="font-medium text-gray-700">Workout Frequency:</p>
              <p className="text-gray-600 capitalize">{data.workoutFrequency} times per week</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">Session Duration:</p>
              <p className="text-gray-600">{data.timeAvailable} minutes</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium text-gray-700 mb-2">Preferred Activities:</p>
            <div className="flex flex-wrap gap-1">
              {data.preferredWorkouts.slice(0, 3).map((workout) => (
                <Badge key={workout} variant="secondary" className="text-xs">
                  {workout.charAt(0).toUpperCase() + workout.slice(1)}
                </Badge>
              ))}
              {data.preferredWorkouts.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{data.preferredWorkouts.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">What's waiting for you:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-medium text-gray-900">Personalized Dashboard</p>
              <p className="text-gray-600">Track your progress with custom metrics</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">🎯</div>
              <p className="font-medium text-gray-900">Smart Goals</p>
              <p className="text-gray-600">Achieve your {getGoalName(data.primaryGoal).toLowerCase()} goal</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">💪</div>
              <p className="font-medium text-gray-900">Premium Features</p>
              <p className="text-gray-600">Unlock advanced analytics and AI recommendations</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={onBack} disabled={isLoading}>
            Back to Edit
          </Button>
          <Button
            onClick={handleComplete}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-medium min-w-[200px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Preparing your experience...
              </>
            ) : (
              <>
                Continue to Premium
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-4">Start with a 7-day free trial • No commitment required</p>
      </CardContent>
    </Card>
  )
}
