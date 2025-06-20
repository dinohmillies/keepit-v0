import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Moon, Droplets, Activity } from "lucide-react"

const habits = [
  {
    title: "Consistent Sleep",
    description: "7+ hours nightly",
    streak: 12,
    icon: Moon,
    status: "excellent",
    emoji: "😴",
  },
  {
    title: "Hydration Goal",
    description: "3L water daily",
    streak: 8,
    icon: Droplets,
    status: "good",
    emoji: "💧",
  },
  {
    title: "Weekly Volume",
    description: "10+ hours training",
    streak: 4,
    icon: Activity,
    status: "building",
    emoji: "💪",
  },
]

export function HabitsSection() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Performance Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {habits.map((habit, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex justify-center mb-3">
                <div className="text-3xl">{habit.emoji}</div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{habit.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{habit.description}</p>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle
                  className={`h-4 w-4 ${
                    habit.status === "excellent"
                      ? "text-green-600"
                      : habit.status === "good"
                        ? "text-blue-600"
                        : "text-orange-600"
                  }`}
                />
                <span className="text-sm font-medium text-gray-700">{habit.streak} day streak</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
