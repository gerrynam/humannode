export function getBudgetColor(budget: number): string {
  if (budget >= 50000) return "#0284c7"; // sky-600
  if (budget >= 30000) return "#0ea5e9"; // sky-500
  if (budget >= 15000) return "#38bdf8"; // sky-400
  return "#7dd3fc"; // sky-300
}
