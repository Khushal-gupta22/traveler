import { BudgetBreakdownProps } from '@/app/_lib/interfaces'

const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({
  accommodation,
  food,
  activities,
  total,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Budget Breakdown</h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Accommodation:</strong> {accommodation}
        </p>
        <p>
          <strong>Food:</strong> {food}
        </p>
        <p>
          <strong>Activities:</strong> {activities}
        </p>
        <hr className="my-2" />
        <p className="text-lg font-bold">Total: {total}</p>
      </div>
    </div>
  )
}

export default BudgetBreakdown
