export interface CandidateSearchResult {
  candidate_id: string
  name: string
  office_sought?: string
  party?: string
  election_years?: number[]
  cycles?: number[]
  state?: string
  district?: string
  incumbent_challenge?: string
  candidate_status?: string
  active_through?: string
  load_date?: string
  principal_committees?: PrincipalCommittee[]
}

export interface PrincipalCommittee {
  committee_id: string
  name: string
  designation?: string
  committee_type?: string
  committee_type_full?: string
}

export interface CandidateNameResult {
  id: string
  name: string
}

export interface CandidateSearchOptions {
  q?: string
  name?: string
  candidate_id?: string
  office?: 'H' | 'S' | 'P'
  state?: string
  district?: string
  party?: string
  cycle?: number
  election_year?: number
  is_active_candidate?: boolean
  candidate_status?: 'C' | 'F' | 'N' | 'P'
  incumbent_challenge?: 'I' | 'C' | 'O'
  federal_funds_flag?: boolean
  has_raised_funds?: boolean
  page?: number
  per_page?: number
  sort?: string
}
