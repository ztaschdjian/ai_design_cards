import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react'

export interface CategoryGroup {
  label: string
  color: string
  count: number
  icon: LucideIcon
  id: string
}

interface CategoryMenuProps {
  groups: CategoryGroup[]
  activeGroup: string | null
  isOpen: boolean
  onToggle: () => void
  onSelect: (id: string) => void
}

export function CategoryMenu({
  groups,
  activeGroup,
  isOpen,
  onToggle,
  onSelect,
}: CategoryMenuProps) {
  return (
    <aside
      className={`sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-60' : 'w-12'
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-5 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm text-gray-500 hover:text-gray-800 hover:shadow-md transition-all duration-150"
        aria-label={isOpen ? 'Collapse menu' : 'Expand menu'}
      >
        {isOpen ? (
          <ChevronLeft className="w-3.5 h-3.5" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Menu panel */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white border-r border-gray-200 py-4">
        {/* Header — only shown when expanded */}
        <div
          className={`px-4 mb-3 transition-all duration-200 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Categories
          </p>
        </div>

        <ul className="space-y-0.5 px-2">
          {groups.map((group) => {
            const isActive = activeGroup === group.id
            const Icon = group.icon

            return (
              <li key={group.id} className="relative">
                <button
                  onClick={() => onSelect(group.id)}
                  title={!isOpen ? group.label : undefined}
                  className={`w-full flex items-center gap-3 rounded-lg transition-all duration-150 group
                    ${isOpen ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}
                    ${
                      isActive
                        ? 'bg-gray-50'
                        : 'hover:bg-gray-50'
                    }
                  `}
                >
                  {/* Color indicator + icon */}
                  <span
                    className={`flex items-center justify-center shrink-0 w-7 h-7 rounded-md transition-all duration-150 ${
                      isActive ? 'shadow-sm' : ''
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? `${group.color}22`
                        : `${group.color}12`,
                    }}
                  >
                    <Icon
                      className="w-4 h-4 transition-colors"
                      style={{ color: group.color }}
                    />
                  </span>

                  {/* Label + badge — only when expanded */}
                  {isOpen && (
                    <span className="flex flex-1 items-center justify-between min-w-0">
                      <span
                        className={`text-sm truncate transition-colors ${
                          isActive ? 'font-semibold text-gray-900' : 'font-medium text-gray-600 group-hover:text-gray-900'
                        }`}
                      >
                        {group.label}
                      </span>
                      <span
                        className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: `${group.color}15`,
                          color: group.color,
                        }}
                      >
                        {group.count}
                      </span>
                    </span>
                  )}

                  {/* Active bar */}
                  {isActive && (
                    <span
                      className="absolute left-0 w-0.5 h-7 rounded-r-full"
                      style={{ backgroundColor: group.color }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
