"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Calendar, Activity } from "lucide-react"
import type { OnboardingData } from "../onboarding-flow"

interface ExperienceStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

const fitnessLevels = [
  {
    id: "beginner",
    title: "Beginner",
    description: "New to fitness or getting back into it",
    icon: "🌱",
    details: "0-6 months of experience",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Some experience with regular workouts",
    icon: "💪",
    details: "6 months - 2 years of experience",
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Experienced with consistent training",
    icon: "🏆",
    details: "2+ years of experience",
  },
]

const workoutFrequencies = [
  { id: "1-2", label: "1-2 times per week", description: "Just getting started" },
  { id: "3-4", label: "3-4 times per week", description: "Building consistency" },
  { id: "5-6", label: "5-6 times per week", description: "Very active lifestyle" },
  { id: "daily", label: "Daily", description: "Fitness is my priority" },
]

const timeAvailable = [
  { id: "15-30", label: "15-30 minutes", description: "Quick sessions" },
  { id: "30-45", label: "30-45 minutes", description: "Standard workouts" },
  { id: "45-60", label: "45-60 minutes", description: "Longer sessions" },
  { id: "60+", label: "60+ minutes", description: "Extended training" },
]

export function ExperienceStep({ data, updateData, onNext, onBack }: ExperienceStepProps) {
  const canProceed = data.fitnessLevel && data.workoutFrequency && data.timeAvailable

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">Tell us about your fitness experience 📊</CardTitle>
        <p className="text-gray-600">This helps us recommend the right intensity and duration</p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Fitness Level */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-blue-600" />
            What's your current fitness level?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {fitnessLevels.map((level) => (
              <div
                key={level.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md text-center ${
                  data.fitnessLevel === level.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => updateData({ fitnessLevel: level.id })}
              >
                <div className="text-3xl mb-2">{level.icon}</div>
                <h4 className="font-semibold text-gray-900">{level.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                <p className="text-xs text-gray-500 mt-2">{level.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Frequency */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            How often do you want to work out?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {workoutFrequencies.map((freq) => (
              <div
                key={freq.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  data.workoutFrequency === freq.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => updateData({ workoutFrequency: freq.id })}
              >
                <h4 className="font-semibold text-gray-900">{freq.label}</h4>
                <p className="text-sm text-gray-600">{freq.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time Available */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-purple-600" />
            How much time can you dedicate per session?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timeAvailable.map((time) => (
              <div
                key={time.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  data.timeAvailable === time.id
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => updateData({ timeAvailable: time.id })}
              >
                <h4 className="font-semibold text-gray-900">{time.label}</h4>
                <p className="text-sm text-gray-600">{time.description}</p>
              </div>
            ))}
          </div>
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
