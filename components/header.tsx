import { Trophy, Target } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center text-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Performance Tracker</h1>
              <p className="text-lg text-blue-600 font-medium flex items-center justify-center mt-1">
                <Target className="h-4 w-4 mr-2" />
                Track. Improve. Excel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
