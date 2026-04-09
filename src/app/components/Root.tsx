import { NavLink, Outlet } from 'react-router'
import { LayoutGrid, FlaskConical } from 'lucide-react'

export function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <span className="text-sm font-semibold text-gray-800 tracking-tight">
              AI Design System
            </span>
            <div className="flex items-center gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                <LayoutGrid className="w-4 h-4" />
                Principles
              </NavLink>
              <NavLink
                to="/benchmark"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                <FlaskConical className="w-4 h-4" />
                Benchmark Prompt
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
