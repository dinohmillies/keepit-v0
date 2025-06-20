import { LogWorkoutForm } from "@/components/log-workout-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LogWorkoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LogWorkoutForm />
      </main>
      <Footer />
    </div>
  )
}
