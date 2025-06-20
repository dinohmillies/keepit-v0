"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, Gift, ArrowRight, SnowflakeIcon as Confetti } from "lucide-react"
import { useRouter } from "next/navigation"

interface PaymentSuccessProps {
  userName: string
}

export function PaymentSuccess({ userName }: PaymentSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    // Mark onboarding as complete and redirect to dashboard
    localStorage.setItem("onboardingCompleted", "true")
    localStorage.setItem("paymentCompleted", "true")
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Confetti className="h-4 w-4 text-blue-500 opacity-70" />
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-2xl relative z-10">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-1">
            <div className="bg-white rounded-lg">
              <CardContent className="p-8 text-center">
                {/* Success Icon */}
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                    <h1 className="text-3xl font-bold text-gray-900">Welcome to Premium, {userName}!</h1>
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>

                {/* Success Message */}
                <div className="mb-8">
                  <Badge className="bg-green-600 text-white mb-4 px-4 py-2">Payment Successful</Badge>
                  <p className="text-xl text-gray-600 mb-4">
                    Your premium subscription is now active and your 7-day free trial has begun!
                  </p>
                  <p className="text-gray-500">
                    You'll receive a confirmation email shortly with your receipt and subscription details.
                  </p>
                </div>

                {/* Premium Benefits */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
                    <Gift className="h-5 w-5 mr-2 text-blue-600" />
                    Your Premium Benefits Are Now Active
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>Advanced analytics & insights</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>AI-powered workout recommendations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>Unlimited custom goals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>Priority customer support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>Nutrition tracking & meal plans</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>Export your data anytime</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
                  <div className="text-left max-w-md mx-auto space-y-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        1
                      </span>
                      <span>Explore your personalized dashboard with premium features</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        2
                      </span>
                      <span>Log your first workout and see advanced analytics in action</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        3
                      </span>
                      <span>Set up your custom goals and get AI recommendations</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-medium mb-4"
                >
                  Start Your Fitness Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {/* Support Info */}
                <div className="text-center text-sm text-gray-500">
                  <p>Need help getting started? Contact our support team anytime.</p>
                  <p className="mt-1">
                    <span className="font-medium">Remember:</span> You can cancel anytime during your trial with no
                    charges.
                  </p>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
