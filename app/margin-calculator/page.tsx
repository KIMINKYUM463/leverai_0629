import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MarginCalculator } from "@/components/margin-calculator/margin-calculator"

export default function MarginCalculatorPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <MarginCalculator />
        </main>
      </div>
    </div>
  )
}
