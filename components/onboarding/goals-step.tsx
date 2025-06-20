"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Dumbbell, Heart, Scale, Zap, Trophy, Users } from "lucide-react"
import type { OnboardingData } from "../onboarding-flow"

interface GoalsStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

const primaryGoals = [
  {
    id: "lose-weight",
    title: "Lose Weight",
    description: "Burn fat and get leaner",
    icon: Scale,
    color: "bg-red-100 text-red-700 border-red-200",
  },
  {
    id: "build-muscle",
    title: "Build Muscle",
    description: "Gain strength and size",
    icon: Dumbbell,
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    id: "improve-endurance",
    title: "Improve Endurance",
    description: "Boost cardiovascular fitness",
    icon: Heart,
    color: "bg-red-100 text-red-700 border-red-200",
  },
  {
    id: "get-stronger",
    title: "Get Stronger",
    description: "Increase overall strength",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    id: "stay-healthy",
    title: "Stay Healthy",
    description: "Maintain overall wellness",
    icon: Trophy,
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: "compete",
    title: "Compete",
    description: "Train for sports/competitions",
    icon: Users,
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
]

const secondaryGoals = [
  "Improve flexibility",
  "Better sleep quality",
  "Reduce stress",
  "Increase energy",
  "Build confidence",
  "Social fitness",
  "Injury prevention",
  "Better posture",
]

export function GoalsStep({ data, updateData, onNext, onBack }: GoalsStepProps) {
  const handlePrimaryGoalSelect = (goalId: string) => {
    updateData({ primaryGoal: goalId })
  }

  const handleSecondaryGoalToggle = (goal: string) => {
    const currentGoals = data.secondaryGoals || []
    const updatedGoals = currentGoals.includes(goal) ? currentGoals.filter((g) => g !== goal) : [...currentGoals, goal]
    updateData({ secondaryGoals: updatedGoals })
  }

  const canProceed = data.primaryGoal && data.secondaryGoals.length > 0

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Hi {data.name}! What's your main fitness goal? 🎯
        </CardTitle>
        <p className="text-gray-600">This helps us personalize your experience</p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Primary Goal Selection */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Primary Goal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {primaryGoals.map((goal) => (
              <div
                key={goal.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  data.primaryGoal === goal.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handlePrimaryGoalSelect(goal.id)}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${goal.color} mr-3`}>
                    <goal.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Goals */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            What else would you like to achieve? (Select all that apply)
          </h3>
          <div className="flex flex-wrap gap-2">
            {secondaryGoals.map((goal) => (
              <Badge
                key={goal}
                variant={data.secondaryGoals.includes(goal) ? "default" : "outline"}
                className={`cursor-pointer px-3 py-2 text-sm transition-all ${
                  data.secondaryGoals.includes(goal)
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "hover:bg-blue-50 hover:border-blue-300"
                }`}
                onClick={() => handleSecondaryGoalToggle(goal)}
              >
                {goal}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Selected: {data.secondaryGoals.length} goal{data.secondaryGoals.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!canProceed} className="bg-blue-600 hover:bg-blue-700">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
