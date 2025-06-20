"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Target, Zap, MessageSquare, Save, Loader2 } from "lucide-react"
import type { WorkoutData } from "./log-workout-form"

interface WorkoutSummaryProps {
  workoutData: WorkoutData
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
}

export function WorkoutSummary({ workoutData, onSubmit, onBack, isSubmitting }: WorkoutSummaryProps) {
  const getWorkoutTypeName = (type: string) => {
    const types: Record<string, string> = {
      strength: "Strength Training",
      cardio: "Cardio",
      hiit: "HIIT",
      sports: "Sports",
      swimming: "Swimming",
      cycling: "Cycling",
    }
    return types[type] || type
  }

  const getIntensityLabel = (intensity: string) => {
    const labels: Record<string, string> = {
      light: "Light (RPE 1-3)",
      moderate: "Moderate (RPE 4-6)",
      vigorous: "Vigorous (RPE 7-8)",
      maximal: "Maximal (RPE 9-10)",
    }
    return labels[intensity] || intensity
  }

  const getMoodEmoji = (mood: string) => {
    const emojis: Record<string, string> = {
      energized: "🚀",
      good: "😊",
      average: "😐",
      tired: "😴",
      struggled: "😤",
    }
    return emojis[mood] || "😊"
  }

  const totalSets = workoutData.exercises.reduce((sum, ex) => sum + ex.sets, 0)
  const totalReps = workoutData.exercises.reduce((sum, ex) => sum + ex.sets * ex.reps, 0)
  const totalWeight = workoutData.exercises.reduce((sum, ex) => sum + (ex.weight || 0) * ex.sets, 0)

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
          Workout Summary
        </CardTitle>
        <p className="text-gray-600">Review your workout before saving</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Workout Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Workout Type</p>
            <p className="font-semibold text-gray-900">{getWorkoutTypeName(workoutData.type)}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold text-gray-900">{workoutData.duration} min</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Zap className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Intensity</p>
            <p className="font-semibold text-gray-900">{getIntensityLabel(workoutData.intensity)}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mx-auto mb-2">{getMoodEmoji(workoutData.mood)}</div>
            <p className="text-sm text-gray-600">Mood</p>
            <p className="font-semibold text-gray-900 capitalize">{workoutData.mood}</p>
          </div>
        </div>

        <Separator />

        {/* Exercise Summary */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Exercises ({workoutData.exercises.length})</h3>
          <div className="space-y-3">
            {workoutData.exercises.map((exercise, index) => (
              <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{exercise.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>
                      {exercise.sets} sets × {exercise.reps} reps
                    </span>
                    {exercise.weight && <span>{exercise.weight} lbs</span>}
                    {exercise.duration && <span>{exercise.duration} min</span>}
                    {exercise.distance && <span>{exercise.distance} miles</span>}
                  </div>
                </div>
                <Badge variant="secondary">{index + 1}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{totalSets}</p>
            <p className="text-sm text-gray-600">Total Sets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{totalReps}</p>
            <p className="text-sm text-gray-600">Total Reps</p>
          </div>
          {totalWeight > 0 && (
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{totalWeight}</p>
              <p className="text-sm text-gray-600">Total Weight (lbs)</p>
            </div>
          )}
        </div>

        {/* Notes */}
        {workoutData.notes && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Workout Notes
            </h3>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-gray-700 italic">"{workoutData.notes}"</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            Back to Edit
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 min-w-[120px]">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Workout
              </>
            )}
          </Button>
        </div>

        {/* Motivational Message */}
        <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg">
          <p className="font-semibold">🎉 Great work today!</p>
          <p className="text-sm text-blue-100 mt-1">
            Every workout brings you closer to your goals. Keep up the momentum!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
