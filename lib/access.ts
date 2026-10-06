import type { Access } from 'payload'

/** Publicly readable / writable. */
export const anyone: Access = () => true

/** Any logged-in Payload user (admin or editor). */
export const authenticated: Access = ({ req }) => Boolean(req?.user)

/** Admin-role users only. */
export const adminsOnly: Access = ({ req }) => {
  const user = req?.user as { role?: string } | null | undefined
  return user?.role === 'admin'
}

/**
 * Public read for published documents, full read for logged-in users.
 * Use on editorial collections such as posts and services.
 */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req?.user) return true
  return { status: { equals: 'published' } }
}

/** Anyone may submit (forms), but only staff may read/manage the records. */
export const createOnly: Access = ({ req }) => {
  if (req?.user) return true
  return true
}
