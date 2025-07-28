// Types for FEC committee totals responses
export interface CommitteeTotals {
  committee_id: string
  committee_name?: string
  committee_type?: string
  committee_type_full?: string
  committee_designation?: string
  committee_designation_full?: string
  committee_state?: string
  organization_type?: string
  organization_type_full?: string
  party_full?: string
  treasurer_name?: string
  filing_frequency?: string
  filing_frequency_full?: string
  first_f1_date?: string
  first_file_date?: string
  last_report_type_full?: string
  last_report_year?: number
  last_beginning_image_number?: string
  last_cash_on_hand_end_period?: number
  last_debts_owed_by_committee?: number
  last_debts_owed_to_committee?: number
  pdf_url?: string
  report_form?: string
  transaction_coverage_date?: string
  coverage_start_date?: string
  coverage_end_date?: string

  // Financial totals
  cycle: number
  receipts: number
  disbursements: number
  cash_on_hand_beginning_period?: number
  contributions: number
  individual_contributions: number
  individual_itemized_contributions: number
  individual_unitemized_contributions: number
  individual_contributions_percent: number
  other_political_committee_contributions: number
  political_party_committee_contributions: number
  party_and_other_committee_contributions_percent: number
  candidate_contribution: number
  federal_funds: number
  other_receipts: number
  transfers_from_affiliated_committee: number
  transfers_from_other_authorized_committee: number
  loans_received: number
  loans_received_from_candidate: number
  other_loans_received: number
  operating_expenditures: number
  operating_expenditures_percent: number
  fundraising_disbursements: number
  exempt_legal_accounting_disbursement: number
  other_disbursements: number
  transfers_to_other_authorized_committee: number
  loan_repayments: number
  loan_repayments_made: number
  loan_repayments_candidate_loans: number
  loan_repayments_other_loans: number
  contribution_refunds: number
  refunded_individual_contributions: number
  refunded_other_political_committee_contributions: number
  refunded_political_party_committee_contributions: number
  repayments_loans_made_by_candidate: number
  repayments_other_loans: number
  net_contributions: number
  net_operating_expenditures: number
  total_offsets_to_operating_expenditures: number
  offsets_to_operating_expenditures: number
  offsets_to_fundraising_expenditures: number
  offsets_to_legal_accounting: number
  contributions_ie_and_party_expenditures_made_percent: number
  loans: number
  loans_made_by_candidate: number
  all_other_loans: number
}

export interface CommitteeTotalsOptions {
  page?: number
  per_page?: number
  cycle?: number[]
  sort?: string
  sort_hide_null?: boolean
  sort_null_only?: boolean
  sort_nulls_last?: boolean
}
