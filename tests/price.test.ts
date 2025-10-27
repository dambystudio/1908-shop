import { describe, it, expect } from 'vitest'
import { calculatePrice, validateCustomization } from '@/domains/product/price'

describe('calculatePrice', () => {
  it('returns base price with no extras', () => {
    const result = calculatePrice({ base: 50 })

    expect(result.base).toBe(50)
    expect(result.patchesSurcharge).toBe(0)
    expect(result.customizationSurcharge).toBe(0)
    expect(result.total).toBe(50)
  })

  it('adds patch surcharge correctly with individual prices', () => {
    const result = calculatePrice({
      base: 50,
      patches: [
        { id: 'serie-a', price: 8 },
        { id: 'scudetto', price: 10 },
      ],
    })

    expect(result.patchesSurcharge).toBe(18) // 8 + 10
    expect(result.total).toBe(68)
  })

  it('adds customization surcharge when name is provided', () => {
    const result = calculatePrice({
      base: 50,
      customization: { playerName: 'TOTTI' },
      customizationPrice: 15,
    })

    expect(result.customizationSurcharge).toBe(15)
    expect(result.total).toBe(65)
  })

  it('adds customization surcharge when number is provided', () => {
    const result = calculatePrice({
      base: 50,
      customization: { playerNumber: 10 },
      customizationPrice: 15,
    })

    expect(result.customizationSurcharge).toBe(15)
    expect(result.total).toBe(65)
  })

  it('combines all surcharges correctly', () => {
    const result = calculatePrice({
      base: 50,
      patches: [{ id: 'serie-a', price: 8 }],
      customization: { playerName: 'TOTTI', playerNumber: 10 },
      customizationPrice: 15,
    })

    expect(result.patchesSurcharge).toBe(8)
    expect(result.customizationSurcharge).toBe(15)
    expect(result.total).toBe(73) // 50 + 8 + 15
  })

  it('handles no customization price defined', () => {
    const result = calculatePrice({
      base: 50,
      customization: { playerName: 'TEST' },
    })

    expect(result.customizationSurcharge).toBe(0)
    expect(result.total).toBe(50)
  })
})

describe('validateCustomization', () => {
  it('validates correct player name', () => {
    const result = validateCustomization('TOTTI', undefined)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('rejects player name longer than 12 characters', () => {
    const result = validateCustomization('VERYLONGNAMEHERE', undefined)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Il nome non può superare i 12 caratteri')
  })

  it('validates correct player number', () => {
    const result = validateCustomization(undefined, 10)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('rejects player number below 0', () => {
    const result = validateCustomization(undefined, -1)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Il numero deve essere tra 0 e 99')
  })

  it('rejects player number above 99', () => {
    const result = validateCustomization(undefined, 100)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Il numero deve essere tra 0 e 99')
  })

  it('validates both name and number together', () => {
    const result = validateCustomization('TOTTI', 10)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('accumulates multiple errors', () => {
    const result = validateCustomization('VERYLONGNAMEHERE', 150)
    expect(result.valid).toBe(false)
    expect(result.errors).toHaveLength(2)
  })
})
