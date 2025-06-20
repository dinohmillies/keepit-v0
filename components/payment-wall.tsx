"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PricingPlans } from "@/components/pricing-plans"
import { PaymentForm } from "@/components/payment-form"
import { PaymentSuccess } from "@/components/payment-success"
import { Trophy, Sparkles, Clock, Users, CheckCircle, Star } from "lucide-react"

export function PaymentWall() {
  const [currentStep, setCurrentStep] = useState<"intro" | "pricing" | "payment" | "success">("intro")
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [trialDaysLeft] = useState(7) // Simulate trial period

  useEffect(() => {
    // Get user data from onboarding
    const onboardingData = localStorage.getItem("userOnboardingData")
    if (onboardingData) {
      const userData = JSON.parse(onboardingData)
      setUserName(userData.name || "")
    }
  }, [])

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setCurrentStep("payment")
  }

  const handlePaymentSuccess = () => {
    setCurrentStep("success")
    // Mark as premium user
    localStorage.setItem("isPremiumUser", "true")
  }

  if (currentStep === "intro") {
    return <IntroStep userName={userName} trialDaysLeft={trialDaysLeft} onContinue={() => setCurrentStep("pricing")} />
  }

  if (currentStep === "pricing") {
    return <PricingPlans onPlanSelect={handlePlanSelect} onBack={() => setCurrentStep("intro")} />
  }

  if (currentStep === "payment") {
    return (
      <PaymentForm
        selectedPlan={selectedPlan}
        onSuccess={handlePaymentSuccess}
        onBack={() => setCurrentStep("pricing")}
      />
    )
  }

  if (currentStep === "success") {
    return <PaymentSuccess userName={userName} />
  }

  return null
}

function IntroStep({
  userName,
  trialDaysLeft,
  onContinue,
}: {
  userName: string
  trialDaysLeft: number
  onContinue: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-1">
            <div className="bg-white rounded-lg">
              <CardHeader className="text-center pb-4 pt-8">
                <div className="flex justify-center items-center space-x-2 mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Congratulations, {userName}! 🎉</CardTitle>
                <p className="text-xl text-gray-600">Your personalized fitness journey is ready to begin</p>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                {/* Trial Status */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4 mb-8 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-orange-600 mr-2" />
                    <Badge className="bg-orange-600 text-white">Free Trial Active</Badge>
                  </div>
                  <p className="text-orange-800 font-medium">
                    You have <span className="font-bold">{trialDaysLeft} days</span> left in your free trial
                  </p>
                  <p className="text-sm text-orange-700 mt-1">Experience all premium features before deciding</p>
                </div>

                {/* What You've Unlocked */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    Here's what we've prepared for you:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Personalized Dashboard</h4>
                        <p className="text-sm text-blue-700">Custom metrics based on your goals and preferences</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900">Smart Workout Plans</h4>
                        <p className="text-sm text-green-700">AI-generated routines matching your fitness level</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-purple-900">Progress Analytics</h4>
                        <p className="text-sm text-purple-700">Detailed insights and performance trends</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-orange-900">Motivation System</h4>
                        <p className="text-sm text-orange-700">Personalized encouragement and achievement badges</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-gray-600 mr-2" />
                    <span className="font-semibold text-gray-900">Join 50,000+ fitness enthusiasts</span>
                  </div>
                  <div className="flex justify-center items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600 font-medium">4.9/5 average rating</span>
                  </div>
                  <p className="text-center text-gray-600 text-sm">
                    "This app transformed my fitness routine. The personalized approach actually works!" - Sarah M.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={onContinue}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-medium"
                  >
                    Continue to Premium Plans
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Skip to dashboard with limited features
                      window.location.href = "/"
                    }}
                    className="px-8 py-3 text-lg"
                  >
                    Continue with Trial ({trialDaysLeft} days left)
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  No commitment required • Cancel anytime • 30-day money-back guarantee
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
