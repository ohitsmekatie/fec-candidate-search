export const CommitteeParams = {
  // Pagination parameters
  page: { type: 'number', description: 'Page number (1-100)', alias: 'pg' },
  per_page: { type: 'number', description: 'Results per page (1-100)', alias: 'pp' },

  // Time-based parameters
  cycle: { type: 'number', description: 'Election cycle year', alias: 'c' },

  // Sorting parameters
  sort: { type: 'string', description: 'Sort field (default: -cycle)', alias: 'sort' },
  sort_hide_null: {
    type: 'boolean',
    description: 'Hide null values on sorted column',
    alias: 'shn',
  },
  sort_null_only: {
    type: 'boolean',
    description: 'Filter out rows having sort column that is non-null',
    alias: 'sno',
  },
  sort_nulls_last: { type: 'boolean', description: 'Sort null values last', alias: 'snl' },
} as const
