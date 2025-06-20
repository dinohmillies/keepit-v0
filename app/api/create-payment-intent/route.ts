export async function POST(request: Request) {
  try {
    const { amount, currency, planId } = await request.json()

    // In a real app, you would use the actual Stripe SDK:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount,
    //   currency,
    //   metadata: { planId }
    // })

    // For demo purposes, return a mock payment intent
    const mockPaymentIntent = {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency,
      status: "requires_payment_method",
    }

    return Response.json(mockPaymentIntent)
  } catch (error) {
    return Response.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
