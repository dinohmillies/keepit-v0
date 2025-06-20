import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const goals = [
  {
    title: "Weekly Training Hours",
    current: 8.5,
    target: 10,
    unit: "hours",
    color: "bg-blue-600",
  },
  {
    title: "Monthly Distance Goal",
    current: 45,
    target: 60,
    unit: "miles",
    color: "bg-green-600",
  },
  {
    title: "Strength Sessions",
    current: 3,
    target: 4,
    unit: "sessions",
    color: "bg-orange-600",
  },
]

export function ProgressSection() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Goal Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100)
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">{goal.title}</h3>
                <span className="text-sm text-gray-600">
                  {goal.current} / {goal.target} {goal.unit}
                </span>
              </div>
              <Progress value={percentage} className="h-3" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{percentage.toFixed(0)}% complete</span>
                <span className={`font-medium ${percentage >= 100 ? "text-green-600" : "text-blue-600"}`}>
                  {percentage >= 100
                    ? "🎉 Goal achieved!"
                    : `${(goal.target - goal.current).toFixed(1)} ${goal.unit} to go`}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
