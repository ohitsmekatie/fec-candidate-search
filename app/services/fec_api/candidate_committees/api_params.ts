export const CandidateCommitteeParams = {
  // Pagination parameters
  page: { type: 'number', description: 'Page number (1-100)', alias: 'pg' },
  per_page: { type: 'number', description: 'Results per page (1-100)', alias: 'pp' },

  // Time-based parameters
  year: { type: 'number', description: 'Year the committee was active', alias: 'y' },
  cycle: { type: 'number', description: 'Election cycle year', alias: 'c' },

  // Committee characteristics
  filing_frequency: {
    type: 'string',
    description:
      'Filing frequency (A=Administratively terminated, D=Debt, M=Monthly, Q=Quarterly, T=Terminated, W=Waived)',
    alias: 'ff',
  },
  designation: {
    type: 'string',
    description:
      'Committee designation (A=Authorized, J=Joint fundraising, P=Principal campaign, U=Unauthorized, B=Lobbyist PAC, D=Leadership PAC)',
    alias: 'd',
  },
  organization_type: {
    type: 'string',
    description:
      'Organization type (C=Corporation, L=Labor, M=Membership, T=Trade association, V=Cooperative, W=Corporation without capital stock)',
    alias: 'ot',
  },
  committee_type: {
    type: 'string',
    description:
      'Committee type (C=Communication cost, D=Delegate, E=Electioneering, H=House, I=Independent expenditure, N=PAC nonqualified, O=Super PAC, P=Presidential, Q=PAC qualified, S=Senate, U=Single candidate independent expenditure, V=PAC with non-contribution account nonqualified, W=PAC with non-contribution account qualified, X=Party nonqualified, Y=Party qualified, Z=National party non-federal)',
    alias: 'ct',
  },

  // Sorting parameters
  sort: { type: 'string', description: 'Sort field', alias: 'sort' },
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
