import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const trainingData = [
  { date: "Mon", duration: 45, type: "Cardio" },
  { date: "Tue", duration: 60, type: "Strength" },
  { date: "Wed", duration: 30, type: "Rest" },
  { date: "Thu", duration: 75, type: "Cardio" },
  { date: "Fri", duration: 90, type: "Strength" },
  { date: "Sat", duration: 120, type: "Mixed" },
  { date: "Sun", duration: 45, type: "Recovery" },
]

export function ChartSection() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          Weekly Training Sessions
          <span className="ml-2 text-sm font-normal text-gray-500">(Last 7 days)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
