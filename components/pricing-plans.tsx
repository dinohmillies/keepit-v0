"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, Zap, Crown, Rocket, ArrowLeft } from "lucide-react"

interface PricingPlansProps {
  onPlanSelect: (planId: string) => void
  onBack: () => void
}

export function PricingPlans({ onPlanSelect, onBack }: PricingPlansProps) {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for getting started",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      icon: Zap,
      color: "border-gray-200",
      buttonColor: "bg-gray-600 hover:bg-gray-700",
      features: ["Workout logging", "Basic progress tracking", "5 custom goals", "Email support", "Mobile app access"],
      limitations: ["Limited analytics", "Basic templates only"],
    },
    {
      id: "pro",
      name: "Pro",
      description: "Most popular for serious athletes",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      icon: Crown,
      color: "border-blue-500 ring-2 ring-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      popular: true,
      features: [
        "Everything in Basic",
        "Advanced analytics",
        "Unlimited custom goals",
        "AI workout recommendations",
        "Nutrition tracking",
        "Priority support",
        "Export data",
        "Custom workout templates",
      ],
      limitations: [],
    },
    {
      id: "elite",
      name: "Elite",
      description: "For coaches and fitness professionals",
      monthlyPrice: 39.99,
      yearlyPrice: 399.99,
      icon: Rocket,
      color: "border-purple-500",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      features: [
        "Everything in Pro",
        "Client management (up to 50)",
        "Team collaboration",
        "White-label options",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced reporting",
      ],
      limitations: [],
    },
  ]

  const getPrice = (plan: (typeof plans)[0]) => {
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
    const period = isYearly ? "year" : "month"
    const savings = isYearly
      ? Math.round(((plan.monthlyPrice * 12 - plan.yearlyPrice) / (plan.monthlyPrice * 12)) * 100)
      : 0

    return { price, period, savings }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 mb-6">Unlock your full potential with premium features</p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`font-medium ${!isYearly ? "text-blue-600" : "text-gray-500"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`font-medium ${isYearly ? "text-blue-600" : "text-gray-500"}`}>
              Yearly
              <Badge className="ml-2 bg-green-600 text-white">Save up to 17%</Badge>
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const { price, period, savings } = getPrice(plan)
            return (
              <Card key={plan.id} className={`relative ${plan.color} hover:shadow-lg transition-all duration-200`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <plan.icon className="h-8 w-8 text-gray-700" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-500 ml-1">/{period}</span>
                    </div>
                    {isYearly && savings > 0 && (
                      <p className="text-sm text-green-600 font-medium mt-1">Save {savings}% annually</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button
                    onClick={() => onPlanSelect(plan.id)}
                    className={`w-full ${plan.buttonColor} text-white py-3 text-lg font-medium`}
                  >
                    Get Started
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center space-x-3 opacity-60">
                        <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                          <div className="h-1 w-3 bg-gray-400 rounded"></div>
                        </div>
                        <span className="text-gray-500 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
              30-day money-back guarantee
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
              Secure payment
            </div>
          </div>
          <p className="text-xs text-gray-400">All plans include a 7-day free trial</p>
        </div>
      </div>
    </div>
  )
}
