// Placeholder price calculator - full implementation in Stage 2
export interface PriceInput {
  base: number
  patches?: string[]
  customization?: {
    playerName?: string
    playerNumber?: number
  }
}

export interface PriceOutput {
  base: number
  patchesSurcharge: number
  customizationSurcharge: number
  total: number
}

const PATCH_PRICE = 5 // EUR per patch (placeholder)
const CUSTOMIZATION_PRICE = 10 // EUR for name+number (placeholder)

export function calculatePrice(input: PriceInput): PriceOutput {
  const patchesSurcharge = (input.patches?.length || 0) * PATCH_PRICE

  const customizationSurcharge =
    input.customization?.playerName || input.customization?.playerNumber ? CUSTOMIZATION_PRICE : 0

  const total = input.base + patchesSurcharge + customizationSurcharge

  return {
    base: input.base,
    patchesSurcharge,
    customizationSurcharge,
    total,
  }
}
