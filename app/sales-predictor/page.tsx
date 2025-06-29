import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SalesPredictor } from "@/components/sales-predictor/sales-predictor"

export default function SalesPredictorPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <SalesPredictor />
        </main>
      </div>
    </div>
  )
}
