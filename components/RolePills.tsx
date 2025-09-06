import { RoleData } from '@/types'

interface RolePillsProps {
  roles: RoleData[]
  selectedRole: string
  onRoleSelect: (roleId: string) => void
}

export default function RolePills({ roles, selectedRole, onRoleSelect }: RolePillsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onRoleSelect(role.id)}
          className={`px-5 py-3 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-200 shadow-sm hover:shadow-md transform hover:scale-105 ${
            selectedRole === role.id
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-100'
          }`}
        >
          {role.name}
        </button>
      ))}
    </div>
  )
}