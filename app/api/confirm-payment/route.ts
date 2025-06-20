export async function POST(request: Request) {
  try {
    const { paymentIntentId, paymentMethod } = await request.json()

    // In a real app, you would use the actual Stripe SDK:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    // const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
    //   payment_method: paymentMethod
    // })

    // For demo purposes, simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate 90% success rate
    if (Math.random() > 0.1) {
      return Response.json({
        status: "succeeded",
        id: paymentIntentId,
      })
    } else {
      return Response.json(
        {
          status: "failed",
          error: "Your card was declined.",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    return Response.json({ error: "Payment confirmation failed" }, { status: 500 })
  }
}
