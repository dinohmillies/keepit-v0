"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Heart, Zap, Waves, Bike, Users, MapPin } from "lucide-react"
import type { OnboardingData } from "../onboarding-flow"

interface PreferencesStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

const workoutTypes = [
  { id: "strength", label: "Strength Training", icon: Dumbbell, color: "bg-orange-100 text-orange-700" },
  { id: "cardio", label: "Cardio", icon: Heart, color: "bg-red-100 text-red-700" },
  { id: "hiit", label: "HIIT", icon: Zap, color: "bg-yellow-100 text-yellow-700" },
  { id: "swimming", label: "Swimming", icon: Waves, color: "bg-blue-100 text-blue-700" },
  { id: "cycling", label: "Cycling", icon: Bike, color: "bg-green-100 text-green-700" },
  { id: "sports", label: "Sports", icon: Users, color: "bg-purple-100 text-purple-700" },
]

const trackingPreferences = [
  "Workout duration",
  "Calories burned",
  "Weight lifted",
  "Distance covered",
  "Heart rate",
  "Sleep quality",
  "Mood & energy",
  "Progress photos",
  "Body measurements",
  "Personal records",
]

export function PreferencesStep({ data, updateData, onNext, onBack }: PreferencesStepProps) {
  const handleWorkoutTypeToggle = (type: string) => {
    const currentTypes = data.preferredWorkouts || []
    const updatedTypes = currentTypes.includes(type) ? currentTypes.filter((t) => t !== type) : [...currentTypes, type]
    updateData({ preferredWorkouts: updatedTypes })
  }

  const handleTrackingToggle = (preference: string) => {
    const currentPrefs = data.trackingPreferences || []
    const updatedPrefs = currentPrefs.includes(preference)
      ? currentPrefs.filter((p) => p !== preference)
      : [...currentPrefs, preference]
    updateData({ trackingPreferences: updatedPrefs })
  }

  const canProceed = data.preferredWorkouts.length > 0 && data.trackingPreferences.length > 0

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">What types of workouts do you enjoy? 🏋️</CardTitle>
        <p className="text-gray-600">Choose your preferred activities and what you'd like to track</p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Workout Preferences */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Dumbbell className="h-5 w-5 mr-2 text-blue-600" />
            Preferred Workout Types (Select all that apply)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {workoutTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md text-center ${
                  data.preferredWorkouts.includes(type.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleWorkoutTypeToggle(type.id)}
              >
                <div className={`p-2 rounded-full ${type.color} mx-auto mb-2 w-fit`}>
                  <type.icon className="h-5 w-5" />
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{type.label}</h4>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Selected: {data.preferredWorkouts.length} type{data.preferredWorkouts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Tracking Preferences */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-green-600" />
            What would you like to track?
          </h3>
          <div className="flex flex-wrap gap-2">
            {trackingPreferences.map((preference) => (
              <Badge
                key={preference}
                variant={data.trackingPreferences.includes(preference) ? "default" : "outline"}
                className={`cursor-pointer px-3 py-2 text-sm transition-all ${
                  data.trackingPreferences.includes(preference)
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "hover:bg-green-50 hover:border-green-300"
                }`}
                onClick={() => handleTrackingToggle(preference)}
              >
                {preference}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Selected: {data.trackingPreferences.length} metric{data.trackingPreferences.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Quick Tip */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-1">💡 Pro Tip</h4>
          <p className="text-sm text-blue-800">
            You can always adjust these preferences later in your settings. Start with what excites you most!
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
