"use client"

import { useState } from "react"
import { WelcomeStep } from "@/components/onboarding/welcome-step"
import { GoalsStep } from "@/components/onboarding/goals-step"
import { ExperienceStep } from "@/components/onboarding/experience-step"
import { PreferencesStep } from "@/components/onboarding/preferences-step"
import { MotivationStep } from "@/components/onboarding/motivation-step"
import { CompletionStep } from "@/components/onboarding/completion-step"

export interface OnboardingData {
  name: string
  primaryGoal: string
  secondaryGoals: string[]
  fitnessLevel: string
  experience: string
  workoutFrequency: string
  preferredWorkouts: string[]
  timeAvailable: string
  motivation: string
  challenges: string[]
  trackingPreferences: string[]
}

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: "",
    primaryGoal: "",
    secondaryGoals: [],
    fitnessLevel: "",
    experience: "",
    workoutFrequency: "",
    preferredWorkouts: [],
    timeAvailable: "",
    motivation: "",
    challenges: [],
    trackingPreferences: [],
  })

  const updateData = (updates: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const steps = [
    <WelcomeStep key="welcome" data={onboardingData} updateData={updateData} onNext={nextStep} />,
    <GoalsStep key="goals" data={onboardingData} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
    <ExperienceStep
      key="experience"
      data={onboardingData}
      updateData={updateData}
      onNext={nextStep}
      onBack={prevStep}
    />,
    <PreferencesStep
      key="preferences"
      data={onboardingData}
      updateData={updateData}
      onNext={nextStep}
      onBack={prevStep}
    />,
    <MotivationStep
      key="motivation"
      data={onboardingData}
      updateData={updateData}
      onNext={nextStep}
      onBack={prevStep}
    />,
    <CompletionStep key="completion" data={onboardingData} onBack={prevStep} />,
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep + 1} of 6</span>
            <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / 6) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        {steps[currentStep]}
      </div>
    </div>
  )
}
