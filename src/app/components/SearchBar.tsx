import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'

export interface SearchSuggestion {
  name: string
  group: string
  groupColor: string
}

interface SearchBarProps {
  query: string
  suggestions: SearchSuggestion[]
  onChange: (q: string) => void
  onSelect: (suggestion: SearchSuggestion) => void
  onClear: () => void
  totalMatches: number
}

export function SearchBar({
  query,
  suggestions,
  onChange,
  onSelect,
  onClear,
  totalMatches,
}: SearchBarProps) {
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const showDropdown = open && query.length > 0 && suggestions.length > 0

  useEffect(() => {
    setCursor(-1)
  }, [query])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, -1))
    } else if (e.key === 'Enter' && cursor >= 0) {
      e.preventDefault()
      onSelect(suggestions[cursor])
      setOpen(false)
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  // Scroll cursor item into view
  useEffect(() => {
    if (cursor < 0 || !listRef.current) return
    const item = listRef.current.children[cursor] as HTMLElement | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('[data-searchbar]')) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function highlight(text: string) {
    if (!query) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-100 text-yellow-900 rounded px-0.5">
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <div data-searchbar className="relative w-full max-w-xl mx-auto">
      {/* Input */}
      <div
        className={`flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border transition-all duration-150 shadow-sm ${
          open && query ? 'border-indigo-300 ring-2 ring-indigo-100' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search principles…"
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search principles"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
        />
        {query && (
          <button
            onClick={() => { onClear(); setOpen(false) }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Match count badge */}
      {query && !showDropdown && (
        <p className="absolute right-0 -bottom-6 text-xs text-gray-400">
          {totalMatches === 0
            ? 'No matches'
            : `${totalMatches} match${totalMatches !== 1 ? 'es' : ''}`}
        </p>
      )}

      {/* Dropdown */}
      {showDropdown && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 left-0 right-0 mt-1.5 max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg divide-y divide-gray-50"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.name}
              role="option"
              aria-selected={cursor === i}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                cursor === i ? 'bg-indigo-50' : 'hover:bg-gray-50'
              }`}
              onMouseDown={(e) => {
                e.preventDefault()
                onSelect(s)
                setOpen(false)
              }}
              onMouseEnter={() => setCursor(i)}
            >
              <span
                className="mt-0.5 shrink-0 w-2 h-2 rounded-full"
                style={{ backgroundColor: s.groupColor }}
              />
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-medium text-gray-800 truncate">
                  {highlight(s.name)}
                </span>
                <span className="text-xs text-gray-400 truncate">{s.group}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
