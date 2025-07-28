// Types for FEC candidate committees responses
export interface CommitteeDetail {
  committee_id: string
  name?: string
  affiliated_committee_name?: string
  candidate_ids?: string[]
  city?: string
  state?: string
  state_full?: string
  zip?: string
  street_1?: string
  street_2?: string
  committee_type?: string
  committee_type_full?: string
  designation?: string
  designation_full?: string
  organization_type?: string
  organization_type_full?: string
  party?: string
  party_full?: string
  party_type?: string
  party_type_full?: string
  cycles?: number[]
  filing_frequency?: string
  first_f1_date?: string
  first_file_date?: string
  last_f1_date?: string
  last_file_date?: string
  form_type?: string
  email?: string
  fax?: string
  website?: string
  leadership_pac?: string
  lobbyist_registrant_pac?: string
  sponsor_candidate_ids?: string[]

  // Treasurer information
  treasurer_name?: string
  treasurer_name_1?: string
  treasurer_name_2?: string
  treasurer_name_middle?: string
  treasurer_name_prefix?: string
  treasurer_name_suffix?: string
  treasurer_name_title?: string
  treasurer_city?: string
  treasurer_state?: string
  treasurer_street_1?: string
  treasurer_street_2?: string
  treasurer_zip?: string
  treasurer_phone?: string

  // Custodian information
  custodian_name_1?: string
  custodian_name_2?: string
  custodian_name_full?: string
  custodian_name_middle?: string
  custodian_name_prefix?: string
  custodian_name_suffix?: string
  custodian_name_title?: string
  custodian_city?: string
  custodian_state?: string
  custodian_street_1?: string
  custodian_street_2?: string
  custodian_zip?: string
  custodian_phone?: string

  // Joint fundraising committee information
  jfc_committee?: JFCCommittee[]
}

export interface JFCCommittee {
  joint_committee_id: string
  joint_committee_name: string
  joint_committee_designation?: string
}

export interface CandidateCommitteesOptions {
  page?: number
  per_page?: number
  year?: number[]
  cycle?: number[]
  filing_frequency?: ('A' | 'M' | 'N' | 'Q' | 'T' | 'W' | '-A' | '-T')[]
  designation?: ('A' | 'J' | 'P' | 'U' | 'B' | 'D')[]
  organization_type?: ('C' | 'L' | 'M' | 'T' | 'V' | 'W')[]
  committee_type?: (
    | 'C'
    | 'D'
    | 'E'
    | 'H'
    | 'I'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'S'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z'
  )[]
  sort?: string
  sort_hide_null?: boolean
  sort_null_only?: boolean
  sort_nulls_last?: boolean
}
