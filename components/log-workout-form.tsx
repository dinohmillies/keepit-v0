"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { WorkoutTypeSelector } from "@/components/workout-type-selector"
import { ExerciseLogger } from "@/components/exercise-logger"
import { WorkoutSummary } from "@/components/workout-summary"
import { Calendar, Target, ArrowLeft } from "lucide-react"
import Link from "next/link"

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight?: number
  duration?: number
  distance?: number
  notes?: string
}

export interface WorkoutData {
  date: string
  type: string
  duration: number
  exercises: Exercise[]
  notes: string
  intensity: string
  mood: string
}

export function LogWorkoutForm() {
  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    date: new Date().toISOString().split("T")[0],
    type: "",
    duration: 0,
    exercises: [],
    notes: "",
    intensity: "",
    mood: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically save to your backend/database
    console.log("Workout logged:", workoutData)

    setIsSubmitting(false)
    // Show success message or redirect
    alert("Workout logged successfully! 🎉")
  }

  const updateWorkoutData = (updates: Partial<WorkoutData>) => {
    setWorkoutData((prev) => ({ ...prev, ...updates }))
  }

  const addExercise = (exercise: Exercise) => {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, exercise],
    }))
  }

  const removeExercise = (exerciseId: string) => {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== exerciseId),
    }))
  }

  const updateExercise = (exerciseId: string, updates: Partial<Exercise>) => {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, ...updates } : ex)),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Log Today's Workout</h1>
          <p className="text-gray-600 mt-1">Track your training session and build your performance history</p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Day 6 of 7 this week
          </Badge>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Workout Type</span>
            <span>Exercises</span>
            <span>Details</span>
            <span>Summary</span>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <WorkoutTypeSelector
          workoutData={workoutData}
          updateWorkoutData={updateWorkoutData}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <ExerciseLogger
          workoutData={workoutData}
          addExercise={addExercise}
          removeExercise={removeExercise}
          updateExercise={updateExercise}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <WorkoutDetailsForm
          workoutData={workoutData}
          updateWorkoutData={updateWorkoutData}
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 4 && (
        <WorkoutSummary
          workoutData={workoutData}
          onSubmit={handleSubmit}
          onBack={() => setCurrentStep(3)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}

function WorkoutDetailsForm({
  workoutData,
  updateWorkoutData,
  onNext,
  onBack,
}: {
  workoutData: WorkoutData
  updateWorkoutData: (updates: Partial<WorkoutData>) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2 text-blue-600" />
          Workout Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={workoutData.duration || ""}
              onChange={(e) => updateWorkoutData({ duration: Number.parseInt(e.target.value) || 0 })}
              placeholder="60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity Level</Label>
            <Select value={workoutData.intensity} onValueChange={(value) => updateWorkoutData({ intensity: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light (RPE 1-3)</SelectItem>
                <SelectItem value="moderate">Moderate (RPE 4-6)</SelectItem>
                <SelectItem value="vigorous">Vigorous (RPE 7-8)</SelectItem>
                <SelectItem value="maximal">Maximal (RPE 9-10)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mood">How did you feel?</Label>
          <Select value={workoutData.mood} onValueChange={(value) => updateWorkoutData({ mood: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="energized">🚀 Energized & Strong</SelectItem>
              <SelectItem value="good">😊 Good & Motivated</SelectItem>
              <SelectItem value="average">😐 Average Energy</SelectItem>
              <SelectItem value="tired">😴 Tired but Pushed Through</SelectItem>
              <SelectItem value="struggled">😤 Struggled but Finished</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Workout Notes</Label>
          <Textarea
            id="notes"
            value={workoutData.notes}
            onChange={(e) => updateWorkoutData({ notes: e.target.value })}
            placeholder="How did the workout go? Any achievements, challenges, or observations..."
            rows={4}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
            Continue to Summary
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
