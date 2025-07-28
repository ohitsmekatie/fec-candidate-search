# Candidate Committees Service

This service provides access to FEC candidate committees data through the `/v1/candidate/{candidate_id}/committees/` endpoint.

## Usage

```typescript
import { CandidateCommitteesService } from '#services/fec_api/candidate_committees/candidate_committees_service'

const service = new CandidateCommitteesService()

// Get all committees for a candidate
const committees = await service.getCandidateCommittees('P80001571')

// Get committees with filters
const committees = await service.getCandidateCommittees('P80001571', {
  cycle: [2024],
  designation: ['P'], // Principal campaign committees only
  per_page: 50,
})

// Get committees by type
const committees = await service.getCandidateCommittees('P80001571', {
  committee_type: ['P'], // Presidential committees only
  sort: 'name',
})
```

## Available Options

### Pagination

- `page`: Page number (1-100)
- `per_page`: Results per page (1-100)

### Time-based Filters

- `year`: Array of years the committee was active
- `cycle`: Array of election cycle years

### Committee Characteristics

- `filing_frequency`: Array of filing frequencies (A, M, N, Q, T, W, -A, -T)
- `designation`: Array of committee designations (A, J, P, U, B, D)
- `organization_type`: Array of organization types (C, L, M, T, V, W)
- `committee_type`: Array of committee types (C, D, E, H, I, N, O, P, Q, S, U, V, W, X, Y, Z)

### Sorting

- `sort`: Sort field
- `sort_hide_null`: Hide null values on sorted column
- `sort_null_only`: Filter out rows having sort column that is non-null
- `sort_nulls_last`: Sort null values last

## Response Structure

The service returns a `FecApiResponse<CommitteeDetail>` with the following structure:

```typescript
{
  pagination: {
    count: number
    page: number
    pages: number
    per_page: number
  } | null
  results: CommitteeDetail[]
}
```

Each `CommitteeDetail` includes:

- Basic committee information (ID, name, type, designation)
- Contact information (address, phone, email, website)
- Treasurer and custodian details
- Party affiliation
- Filing history and cycles
- Joint fundraising committee information
