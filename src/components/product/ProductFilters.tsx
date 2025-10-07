'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export type FilterOptions = {
  competition: string | null
  club: string | null
  season: string | null
  search: string
  showOnlyCustomizable: boolean
}

type ProductFiltersProps = {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  availableCompetitions: string[]
  availableClubs: string[]
  availableSeasons: string[]
}

export function ProductFilters({
  filters,
  onFiltersChange,
  availableCompetitions,
  availableClubs,
  availableSeasons,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.competition) count++
    if (filters.club) count++
    if (filters.season) count++
    if (filters.search) count++
    if (filters.showOnlyCustomizable) count++
    return count
  }, [filters])

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      competition: null,
      club: null,
      season: null,
      search: '',
      showOnlyCustomizable: false,
    })
  }

  const toggleCompetition = (competition: string) => {
    updateFilter('competition', filters.competition === competition ? null : competition)
  }

  const toggleClub = (club: string) => {
    updateFilter('club', filters.club === club ? null : club)
  }

  const toggleSeason = (season: string) => {
    updateFilter('season', filters.season === season ? null : season)
  }

  return (
    <div className="border border-gray-800 rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Filtri</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="default" className="bg-primary-red">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Cancella tutto
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            {isExpanded ? 'Chiudi' : 'Apri'}
          </Button>
        </div>
      </div>

      {/* Filters Content */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Cerca</Label>
          <Input
            id="search"
            type="text"
            placeholder="Nome prodotto, squadra..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="bg-gray-950 border-gray-800"
          />
        </div>

        {/* Competition Filter */}
        {availableCompetitions.length > 0 && (
          <div className="space-y-2">
            <Label>Competizione</Label>
            <div className="flex flex-wrap gap-2">
              {availableCompetitions.map((comp) => (
                <Button
                  key={comp}
                  variant={filters.competition === comp ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleCompetition(comp)}
                  className={
                    filters.competition === comp ? 'bg-primary-red hover:bg-primary-red-dark' : ''
                  }
                >
                  {comp}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Club Filter */}
        {availableClubs.length > 0 && (
          <div className="space-y-2">
            <Label>Squadra</Label>
            <div className="flex flex-wrap gap-2">
              {availableClubs.map((club) => (
                <Button
                  key={club}
                  variant={filters.club === club ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleClub(club)}
                  className={
                    filters.club === club ? 'bg-primary-red hover:bg-primary-red-dark' : ''
                  }
                >
                  {club}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Season Filter */}
        {availableSeasons.length > 0 && (
          <div className="space-y-2">
            <Label>Stagione</Label>
            <div className="flex flex-wrap gap-2">
              {availableSeasons.map((season) => (
                <Button
                  key={season}
                  variant={filters.season === season ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSeason(season)}
                  className={
                    filters.season === season ? 'bg-primary-red hover:bg-primary-red-dark' : ''
                  }
                >
                  {season}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Customizable Toggle */}
        <div className="flex items-center space-x-2">
          <input
            id="customizable"
            type="checkbox"
            checked={filters.showOnlyCustomizable}
            onChange={(e) => updateFilter('showOnlyCustomizable', e.target.checked)}
            className="w-4 h-4 rounded border-gray-800 bg-gray-950 text-primary-red focus:ring-primary-red focus:ring-offset-0"
          />
          <Label htmlFor="customizable" className="cursor-pointer">
            Solo prodotti personalizzabili
          </Label>
        </div>
      </div>
    </div>
  )
}
