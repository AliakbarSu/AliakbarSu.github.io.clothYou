export const convert_dollars_to_cents = (amount_in_dollars) => {
  return Math.round(amount_in_dollars * 100, 2)
}

export const convert_cents_to_dollars = (amount_in_cents) => {
  return Math.round(amount_in_cents / 100, 0)
}
