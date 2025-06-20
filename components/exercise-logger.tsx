"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, Edit3 } from "lucide-react"
import type { Exercise, WorkoutData } from "./log-workout-form"

interface ExerciseLoggerProps {
  workoutData: WorkoutData
  addExercise: (exercise: Exercise) => void
  removeExercise: (exerciseId: string) => void
  updateExercise: (exerciseId: string, updates: Partial<Exercise>) => void
  onNext: () => void
  onBack: () => void
}

export function ExerciseLogger({
  workoutData,
  addExercise,
  removeExercise,
  updateExercise,
  onNext,
  onBack,
}: ExerciseLoggerProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: "",
    sets: 1,
    reps: 1,
    weight: undefined,
    duration: undefined,
    distance: undefined,
    notes: "",
  })

  const handleAddExercise = () => {
    if (newExercise.name) {
      addExercise({
        id: Date.now().toString(),
        name: newExercise.name,
        sets: newExercise.sets || 1,
        reps: newExercise.reps || 1,
        weight: newExercise.weight,
        duration: newExercise.duration,
        distance: newExercise.distance,
        notes: newExercise.notes,
      })
      setNewExercise({
        name: "",
        sets: 1,
        reps: 1,
        weight: undefined,
        duration: undefined,
        distance: undefined,
        notes: "",
      })
      setShowAddForm(false)
    }
  }

  const isCardioWorkout =
    workoutData.type === "cardio" || workoutData.type === "swimming" || workoutData.type === "cycling"

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Edit3 className="h-5 w-5 mr-2 text-blue-600" />
            Log Your Exercises
          </span>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {workoutData.exercises.length} exercise{workoutData.exercises.length !== 1 ? "s" : ""} added
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Exercises */}
        {workoutData.exercises.length > 0 && (
          <div className="space-y-4">
            {workoutData.exercises.map((exercise, index) => (
              <div key={exercise.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExercise(exercise.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Sets:</span>
                    <span className="ml-2 font-medium">{exercise.sets}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Reps:</span>
                    <span className="ml-2 font-medium">{exercise.reps}</span>
                  </div>
                  {exercise.weight && (
                    <div>
                      <span className="text-gray-600">Weight:</span>
                      <span className="ml-2 font-medium">{exercise.weight} lbs</span>
                    </div>
                  )}
                  {exercise.duration && (
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 font-medium">{exercise.duration} min</span>
                    </div>
                  )}
                  {exercise.distance && (
                    <div>
                      <span className="text-gray-600">Distance:</span>
                      <span className="ml-2 font-medium">{exercise.distance} miles</span>
                    </div>
                  )}
                </div>
                {exercise.notes && <p className="text-sm text-gray-600 mt-2 italic">"{exercise.notes}"</p>}
              </div>
            ))}
          </div>
        )}

        {workoutData.exercises.length > 0 && <Separator />}

        {/* Add Exercise Form */}
        {showAddForm ? (
          <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
            <div className="space-y-4">
              <div>
                <Label htmlFor="exercise-name">Exercise Name</Label>
                <Input
                  id="exercise-name"
                  value={newExercise.name || ""}
                  onChange={(e) => setNewExercise((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Bench Press, Running, Squats"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sets">Sets</Label>
                  <Input
                    id="sets"
                    type="number"
                    value={newExercise.sets || ""}
                    onChange={(e) =>
                      setNewExercise((prev) => ({ ...prev, sets: Number.parseInt(e.target.value) || 1 }))
                    }
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="reps">Reps</Label>
                  <Input
                    id="reps"
                    type="number"
                    value={newExercise.reps || ""}
                    onChange={(e) =>
                      setNewExercise((prev) => ({ ...prev, reps: Number.parseInt(e.target.value) || 1 }))
                    }
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {!isCardioWorkout && (
                  <div>
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={newExercise.weight || ""}
                      onChange={(e) =>
                        setNewExercise((prev) => ({ ...prev, weight: Number.parseInt(e.target.value) || undefined }))
                      }
                      placeholder="Optional"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newExercise.duration || ""}
                    onChange={(e) =>
                      setNewExercise((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) || undefined }))
                    }
                    placeholder="Optional"
                  />
                </div>
                {isCardioWorkout && (
                  <div>
                    <Label htmlFor="distance">Distance (miles)</Label>
                    <Input
                      id="distance"
                      type="number"
                      step="0.1"
                      value={newExercise.distance || ""}
                      onChange={(e) =>
                        setNewExercise((prev) => ({
                          ...prev,
                          distance: Number.parseFloat(e.target.value) || undefined,
                        }))
                      }
                      placeholder="Optional"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="exercise-notes">Notes</Label>
                <Input
                  id="exercise-notes"
                  value={newExercise.notes || ""}
                  onChange={(e) => setNewExercise((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any notes about this exercise..."
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddExercise} className="bg-blue-600 hover:bg-blue-700">
                  Add Exercise
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowAddForm(true)}
            className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={workoutData.exercises.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continue to Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
