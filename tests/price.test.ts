import { describe, it, expect } from 'vitest'
import { calculatePrice } from '@/domains/product/price'

describe('calculatePrice', () => {
  it('returns base price with no extras', () => {
    const result = calculatePrice({ base: 50 })

    expect(result.base).toBe(50)
    expect(result.patchesSurcharge).toBe(0)
    expect(result.customizationSurcharge).toBe(0)
    expect(result.total).toBe(50)
  })

  it('adds patch surcharge correctly', () => {
    const result = calculatePrice({
      base: 50,
      patches: ['serie-a', 'champions'],
    })

    expect(result.patchesSurcharge).toBe(10) // 2 patches * 5 EUR
    expect(result.total).toBe(60)
  })

  it('adds customization surcharge when name is provided', () => {
    const result = calculatePrice({
      base: 50,
      customization: { playerName: 'TOTTI' },
    })

    expect(result.customizationSurcharge).toBe(10)
    expect(result.total).toBe(60)
  })

  it('adds customization surcharge when number is provided', () => {
    const result = calculatePrice({
      base: 50,
      customization: { playerNumber: 10 },
    })

    expect(result.customizationSurcharge).toBe(10)
    expect(result.total).toBe(60)
  })

  it('combines all surcharges correctly', () => {
    const result = calculatePrice({
      base: 50,
      patches: ['serie-a'],
      customization: { playerName: 'TOTTI', playerNumber: 10 },
    })

    expect(result.patchesSurcharge).toBe(5)
    expect(result.customizationSurcharge).toBe(10)
    expect(result.total).toBe(65)
  })
})
