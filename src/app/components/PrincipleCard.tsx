import { type LucideIcon } from 'lucide-react'

interface PrincipleCardProps {
  name: string
  description: string
  example: string
  icon: LucideIcon
  accentColor: string
}

export function PrincipleCard({
  name,
  description,
  example,
  icon: Icon,
  accentColor,
}: PrincipleCardProps) {
  return (
    <div
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200"
      style={{
        borderTopColor: accentColor,
        borderTopWidth: '3px',
      }}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="p-3 rounded-lg shrink-0"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Icon className="w-6 h-6" style={{ color: accentColor }} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>

        <div
          className="mt-4 p-4 rounded-lg border-l-4"
          style={{
            backgroundColor: `${accentColor}08`,
            borderLeftColor: accentColor,
          }}
        >
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 font-medium">
            Example
          </p>
          <p className="text-sm text-gray-700 leading-relaxed italic">{example}</p>
        </div>
      </div>
    </div>
  )
}
