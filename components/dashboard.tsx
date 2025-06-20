import { StatCards } from "@/components/stat-cards"
import { ChartSection } from "@/components/chart-section"
import { ProgressSection } from "@/components/progress-section"
import { HabitsSection } from "@/components/habits-section"
import { MotivationSection } from "@/components/motivation-section"

export function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <StatCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartSection />
          <ProgressSection />
        </div>
        <HabitsSection />
        <MotivationSection />
      </div>
    </main>
  )
}
