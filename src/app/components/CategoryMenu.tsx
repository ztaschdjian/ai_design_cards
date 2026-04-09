import { Menu, X, type LucideIcon } from 'lucide-react'

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
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white border-r border-gray-200 py-2">

        {/* Toggle button — same row height & alignment as category items */}
        <div className="px-2 mb-1">
          <button
            onClick={onToggle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className={`w-full flex items-center gap-3 rounded-lg py-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all duration-150 ${
              isOpen ? 'px-3' : 'justify-center px-0'
            }`}
          >
            <span className="flex items-center justify-center shrink-0 w-7 h-7 rounded-md bg-gray-100">
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </span>
            {isOpen && (
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                Categories
              </span>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="mx-2 mb-2 border-t border-gray-100" />

        {/* Category list */}
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
                    ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50'}
                  `}
                >
                  {/* Icon — uniform neutral color */}
                  <span
                    className={`flex items-center justify-center shrink-0 w-7 h-7 rounded-md transition-all duration-150 ${
                      isActive ? 'bg-gray-200' : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'
                      }`}
                    />
                  </span>

                  {/* Label + count badge — expanded only */}
                  {isOpen && (
                    <span className="flex flex-1 items-center justify-between min-w-0">
                      <span
                        className={`text-sm truncate transition-colors ${
                          isActive
                            ? 'font-semibold text-gray-900'
                            : 'font-medium text-gray-600 group-hover:text-gray-900'
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

                  {/* Active accent bar */}
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
