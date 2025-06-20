"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, AlertTriangle, Lightbulb } from "lucide-react"
import type { OnboardingData } from "../onboarding-flow"

interface MotivationStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

const motivationOptions = [
  "Health and longevity",
  "Looking and feeling better",
  "Setting a good example",
  "Stress relief and mental health",
  "Achieving personal goals",
  "Building discipline",
  "Social connections",
  "Competition and challenges",
]

const commonChallenges = [
  "Lack of time",
  "Low motivation",
  "Not seeing results fast enough",
  "Inconsistent schedule",
  "Lack of knowledge",
  "Gym intimidation",
  "Injury concerns",
  "Boredom with routine",
  "Weather/seasonal changes",
  "Work/life balance",
]

export function MotivationStep({ data, updateData, onNext, onBack }: MotivationStepProps) {
  const handleChallengeToggle = (challenge: string) => {
    const currentChallenges = data.challenges || []
    const updatedChallenges = currentChallenges.includes(challenge)
      ? currentChallenges.filter((c) => c !== challenge)
      : [...currentChallenges, challenge]
    updateData({ challenges: updatedChallenges })
  }

  const canProceed = data.motivation.trim().length > 0

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">What drives you to stay fit? 💪</CardTitle>
        <p className="text-gray-600">Understanding your motivation helps us keep you on track</p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Personal Motivation */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-600" />
            What motivates you most? (In your own words)
          </h3>
          <Textarea
            value={data.motivation}
            onChange={(e) => updateData({ motivation: e.target.value })}
            placeholder="Share what drives you to stay active and healthy. This could be personal goals, family, health reasons, or anything that inspires you..."
            rows={4}
            className="resize-none"
          />
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Common motivations (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {motivationOptions.map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className="cursor-pointer hover:bg-red-50 hover:border-red-300 text-sm"
                  onClick={() => {
                    const currentText = data.motivation
                    const newText = currentText ? `${currentText}, ${option.toLowerCase()}` : option
                    updateData({ motivation: newText })
                  }}
                >
                  + {option}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            What challenges have you faced with fitness? (Optional)
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Identifying obstacles helps us provide better support and solutions
          </p>
          <div className="flex flex-wrap gap-2">
            {commonChallenges.map((challenge) => (
              <Badge
                key={challenge}
                variant={data.challenges.includes(challenge) ? "default" : "outline"}
                className={`cursor-pointer px-3 py-2 text-sm transition-all ${
                  data.challenges.includes(challenge)
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "hover:bg-orange-50 hover:border-orange-300"
                }`}
                onClick={() => handleChallengeToggle(challenge)}
              >
                {challenge}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Selected: {data.challenges.length} challenge{data.challenges.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Encouragement */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-medium text-green-900 mb-2 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            Remember
          </h4>
          <p className="text-sm text-green-800">
            Every fitness journey is unique. We'll use your responses to create personalized recommendations,
            motivational messages, and help you overcome common obstacles. You've got this! 🌟
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!canProceed} className="bg-blue-600 hover:bg-blue-700">
            Almost Done!
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
