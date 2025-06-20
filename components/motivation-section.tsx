import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, ArrowRight } from "lucide-react"
import Link from "next/link"

const quotes = [
  "Every rep counts. Keep going!",
  "Progress, not perfection.",
  "Your only competition is who you were yesterday.",
  "Champions train when nobody's watching.",
]

export function MotivationSection() {
  const todayQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Flame className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">{todayQuote}</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          You've trained {8.5} hours this week and hit {6} out of 7 active days. Your consistency is building momentum.
          Keep pushing forward!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white" asChild>
            <Link href="/log-workout">
              Log Today's Workout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            View Full Stats
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
