import { Card, CardContent } from "@/components/ui/card"
import { Clock, Zap, Dumbbell, Calendar } from "lucide-react"

const stats = [
  {
    title: "Training Time This Week",
    value: "8.5",
    unit: "hours",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    change: "+12%",
    changeType: "positive",
  },
  {
    title: "Best Running Pace",
    value: "6:42",
    unit: "min/mile",
    icon: Zap,
    color: "text-green-600",
    bgColor: "bg-green-100",
    change: "-15s",
    changeType: "positive",
  },
  {
    title: "Max Weight Lifted",
    value: "185",
    unit: "lbs",
    icon: Dumbbell,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    change: "+10 lbs",
    changeType: "positive",
  },
  {
    title: "Active Days",
    value: "6",
    unit: "of 7 days",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    change: "+1 day",
    changeType: "positive",
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.unit}</p>
                </div>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last week</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
