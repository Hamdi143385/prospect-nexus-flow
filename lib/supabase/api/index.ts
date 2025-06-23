
// Main API export file
export { authAPI } from './auth'
export { companiesAPI } from './companies'
export { tasksAPI } from './tasks'
export { emailTemplatesAPI } from './email-templates'
export { workflowsAPI } from './workflows'
export { interactionsAPI } from './interactions'
export { analyticsAPI } from './analytics'

// Export types
export type * from './types'

// Default export for backward compatibility
import { authAPI } from './auth'
import { companiesAPI } from './companies'
import { tasksAPI } from './tasks'
import { emailTemplatesAPI } from './email-templates'
import { workflowsAPI } from './workflows'
import { interactionsAPI } from './interactions'
import { analyticsAPI } from './analytics'

export default {
  auth: authAPI,
  companies: companiesAPI,
  tasks: tasksAPI,
  emailTemplates: emailTemplatesAPI,
  workflows: workflowsAPI,
  interactions: interactionsAPI,
  analytics: analyticsAPI
}
