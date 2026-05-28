export function getCarImage(car: { image?: string } | null | undefined) {
  return car?.image || '';
}
