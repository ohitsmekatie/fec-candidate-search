export const API_PARAMS = {
  // Search parameters
  q: { type: 'string', description: 'Search query for candidate name or ID' },
  name: { type: 'string', description: 'Exact candidate name match' },
  candidate_id: { type: 'string', description: 'FEC candidate ID' },

  // Location and office parameters
  office: { type: 'string', description: 'Office sought (H=House, S=Senate, P=President)' },
  state: { type: 'string', description: 'State abbreviation' },
  district: { type: 'string', description: 'District number' },
  party: { type: 'string', description: 'Political party' },

  // Election parameters
  cycle: { type: 'number', description: 'Election cycle year' },
  election_year: { type: 'number', description: 'Election year' },

  // Status parameters
  is_active_candidate: { type: 'boolean', description: 'Active candidate filter' },
  candidate_status: {
    type: 'string',
    description: 'Candidate status (C=Current, F=Future, N=Not yet filed, P=Past)',
  },
  incumbent_challenge: {
    type: 'string',
    description: 'Incumbent challenge status (I=Incumbent, C=Challenger, O=Open seat)',
  },
  federal_funds_flag: { type: 'boolean', description: 'Federal funds flag' },
  has_raised_funds: { type: 'boolean', description: 'Has raised funds flag' },

  // Pagination parameters
  page: { type: 'number', description: 'Page number (1-100)' },
  per_page: { type: 'number', description: 'Results per page (1-100)' },
  sort: { type: 'string', description: 'Sort field' },
} as const
