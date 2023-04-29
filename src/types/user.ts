import { UserRole } from '@/constants'

export interface UpdateValues {
  role?: UserRole
  displayName?: string
  avatar?: string
  email?: string
  username?: string
  password?: string
  bio?: string
  isVerified?: boolean
  isActive?: boolean
}
