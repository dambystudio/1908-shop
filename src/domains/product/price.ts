// Price calculator - pure functions for testable pricing logic

export interface PatchSelection {
  id: string
  price: number
}

export interface PriceInput {
  base: number
  patches?: PatchSelection[]
  customization?: {
    playerName?: string
    playerNumber?: number
  }
  customizationPrice?: number
}

export interface PriceOutput {
  base: number
  patchesSurcharge: number
  customizationSurcharge: number
  total: number
}

export function calculatePrice(input: PriceInput): PriceOutput {
  // Calculate patches surcharge (sum of individual patch prices)
  const patchesSurcharge = input.patches?.reduce((sum, patch) => sum + patch.price, 0) || 0

  // Calculate customization surcharge
  const hasCustomization =
    input.customization?.playerName || input.customization?.playerNumber !== undefined

  const customizationSurcharge = hasCustomization ? input.customizationPrice || 0 : 0

  const total = input.base + patchesSurcharge + customizationSurcharge

  return {
    base: input.base,
    patchesSurcharge,
    customizationSurcharge,
    total,
  }
}

export function validateCustomization(
  playerName?: string,
  playerNumber?: number
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (playerName && playerName.length > 12) {
    errors.push('Il nome non può superare i 12 caratteri')
  }

  if (playerNumber !== undefined) {
    if (playerNumber < 0 || playerNumber > 99) {
      errors.push('Il numero deve essere tra 0 e 99')
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
