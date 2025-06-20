"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Shield, Lock, Loader2 } from "lucide-react"

interface PaymentFormProps {
  selectedPlan: string
  onSuccess: () => void
  onBack: () => void
}

export function PaymentForm({ selectedPlan, onSuccess, onBack }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    country: "",
  })
  const [ws, setWs] = useState<WebSocket | null>(null)

  // Plan details
  const planDetails = {
    basic: { name: "Basic", price: 9.99, features: ["Workout logging", "Basic tracking", "Email support"] },
    pro: { name: "Pro", price: 19.99, features: ["Advanced analytics", "AI recommendations", "Priority support"] },
    elite: { name: "Elite", price: 39.99, features: ["Client management", "API access", "Dedicated support"] },
  }

  const plan = planDetails[selectedPlan as keyof typeof planDetails]

  useEffect(() => {
    // Initialize WebSocket connection for real-time payment updates
    const websocket = new WebSocket("wss://echo.websocket.org") // Demo WebSocket

    websocket.onopen = () => {
      console.log("WebSocket connected for payment updates")
    }

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "payment_success") {
        setIsProcessing(false)
        onSuccess()
      }
    }

    setWs(websocket)

    return () => {
      websocket.close()
    }
  }, [onSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate Stripe payment processing
      const paymentIntent = await createPaymentIntent({
        amount: Math.round(plan.price * 100), // Convert to cents
        currency: "usd",
        planId: selectedPlan,
      })

      // Simulate payment confirmation
      const paymentResult = await confirmPayment({
        paymentIntentId: paymentIntent.id,
        paymentMethod: {
          card: {
            number: paymentData.cardNumber,
            exp_month: paymentData.expiryDate.split("/")[0],
            exp_year: paymentData.expiryDate.split("/")[1],
            cvc: paymentData.cvv,
          },
          billing_details: {
            name: paymentData.name,
            email: paymentData.email,
          },
        },
      })

      if (paymentResult.status === "succeeded") {
        // Send success message via WebSocket
        if (ws) {
          ws.send(JSON.stringify({ type: "payment_success", planId: selectedPlan }))
        }

        // Fallback success after 2 seconds
        setTimeout(() => {
          setIsProcessing(false)
          onSuccess()
        }, 2000)
      }
    } catch (error) {
      console.error("Payment failed:", error)
      setIsProcessing(false)
      alert("Payment failed. Please try again.")
    }
  }

  const updatePaymentData = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">{plan.name} Plan</h3>
                <p className="text-sm text-gray-600">Monthly subscription</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${plan.price}</p>
                <p className="text-sm text-gray-500">per month</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Included features:</h4>
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2"></div>
                  {feature}
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${plan.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${plan.price}</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
              <div className="flex items-center text-green-800 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                <span className="font-medium">7-day free trial included</span>
              </div>
              <p className="text-xs text-green-700 mt-1">You won't be charged until your trial ends</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-green-600" />
                Secure Payment
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                SSL Secured
              </Badge>
              <span>•</span>
              <span>Powered by Stripe</span>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={paymentData.email}
                  onChange={(e) => updatePaymentData("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Card Information */}
              <div className="space-y-4">
                <Label>Card Information</Label>
                <div className="space-y-3">
                  <Input
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(e) => updatePaymentData("cardNumber", e.target.value)}
                    placeholder="1234 1234 1234 1234"
                    maxLength={19}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={(e) => updatePaymentData("expiryDate", e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                    <Input
                      type="text"
                      value={paymentData.cvv}
                      onChange={(e) => updatePaymentData("cvv", e.target.value)}
                      placeholder="CVV"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div className="space-y-4">
                <Label>Billing Details</Label>
                <Input
                  type="text"
                  value={paymentData.name}
                  onChange={(e) => updatePaymentData("name", e.target.value)}
                  placeholder="Full name on card"
                  required
                />
                <Select value={paymentData.country} onValueChange={(value) => updatePaymentData("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>Start Free Trial - ${plan.price}/month</>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel anytime.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Simulated Stripe API functions
async function createPaymentIntent(params: { amount: number; currency: string; planId: string }) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    id: `pi_${Math.random().toString(36).substr(2, 9)}`,
    client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
    amount: params.amount,
    currency: params.currency,
  }
}

async function confirmPayment(params: any) {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate success (90% success rate)
  if (Math.random() > 0.1) {
    return { status: "succeeded" }
  } else {
    throw new Error("Payment failed")
  }
}
