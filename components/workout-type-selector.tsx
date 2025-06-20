"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Heart, Bike, Waves, Zap, Users } from "lucide-react"
import type { WorkoutData } from "./log-workout-form"

const workoutTypes = [
  {
    id: "strength",
    name: "Strength Training",
    description: "Weight lifting, resistance training",
    icon: Dumbbell,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    examples: ["Bench Press", "Squats", "Deadlifts"],
  },
  {
    id: "cardio",
    name: "Cardio",
    description: "Running, cycling, aerobic exercise",
    icon: Heart,
    color: "bg-red-100 text-red-700 border-red-200",
    examples: ["Running", "Cycling", "Rowing"],
  },
  {
    id: "hiit",
    name: "HIIT",
    description: "High-intensity interval training",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    examples: ["Burpees", "Mountain Climbers", "Sprints"],
  },
  {
    id: "sports",
    name: "Sports",
    description: "Basketball, tennis, soccer, etc.",
    icon: Users,
    color: "bg-green-100 text-green-700 border-green-200",
    examples: ["Basketball", "Tennis", "Soccer"],
  },
  {
    id: "swimming",
    name: "Swimming",
    description: "Pool or open water swimming",
    icon: Waves,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    examples: ["Freestyle", "Backstroke", "Butterfly"],
  },
  {
    id: "cycling",
    name: "Cycling",
    description: "Road, mountain, or stationary bike",
    icon: Bike,
    color: "bg-purple-100 text-purple-700 border-purple-200",
    examples: ["Road Cycling", "Mountain Biking", "Spin Class"],
  },
]

interface WorkoutTypeSelectorProps {
  workoutData: WorkoutData
  updateWorkoutData: (updates: Partial<WorkoutData>) => void
  onNext: () => void
}

export function WorkoutTypeSelector({ workoutData, updateWorkoutData, onNext }: WorkoutTypeSelectorProps) {
  const handleTypeSelect = (type: string) => {
    updateWorkoutData({ type })
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Dumbbell className="h-5 w-5 mr-2 text-blue-600" />
          Choose Your Workout Type
        </CardTitle>
        <p className="text-gray-600">Select the primary focus of today's training session</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {workoutTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                workoutData.type === type.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleTypeSelect(type.id)}
            >
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-full ${type.color} mr-3`}>
                  <type.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {type.examples.map((example, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} disabled={!workoutData.type} className="bg-blue-600 hover:bg-blue-700">
            Continue to Exercises
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
