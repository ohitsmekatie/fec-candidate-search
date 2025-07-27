export const API_PARAMS = {
  // Search parameters
  q: { type: 'string', description: 'Search query for candidate name or ID', alias: 'q' },
  name: { type: 'string', description: 'Exact candidate name match', alias: 'n' },
  candidate_id: { type: 'string', description: 'FEC candidate ID', alias: 'id' },

  // Location and office parameters
  office: {
    type: 'string',
    description: 'Office sought (H=House, S=Senate, P=President)',
    alias: 'o',
  },
  state: { type: 'string', description: 'State abbreviation', alias: 's' },
  district: { type: 'string', description: 'District number', alias: 'd' },
  party: { type: 'string', description: 'Political party', alias: 'p' },

  // Election parameters
  cycle: { type: 'number', description: 'Election cycle year', alias: 'c' },
  election_year: { type: 'number', description: 'Election year', alias: 'ey' },

  // Status parameters
  is_active_candidate: { type: 'boolean', description: 'Active candidate filter', alias: 'a' },
  candidate_status: {
    type: 'string',
    description: 'Candidate status (C=Current, F=Future, N=Not yet filed, P=Past)',
    alias: 'cs',
  },
  incumbent_challenge: {
    type: 'string',
    description: 'Incumbent challenge status (I=Incumbent, C=Challenger, O=Open seat)',
    alias: 'ic',
  },
  federal_funds_flag: { type: 'boolean', description: 'Federal funds flag', alias: 'ff' },
  has_raised_funds: { type: 'boolean', description: 'Has raised funds flag', alias: 'hrf' },

  // Pagination parameters
  page: { type: 'number', description: 'Page number (1-100)', alias: 'pg' },
  per_page: { type: 'number', description: 'Results per page (1-100)', alias: 'pp' },
  sort: { type: 'string', description: 'Sort field', alias: 'sort' },
} as const
