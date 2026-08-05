export function paiseToRupees(amount: string | number): number {
  return (Number(amount) || 0) / 100;
}
