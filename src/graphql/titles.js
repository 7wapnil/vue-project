import gql from 'graphql-tag'

export const TOURNAMENT_FIELDS = `
  id
  name
`

export const TITLE_FIELDS = `
  id
  name
  tournaments @include (if: $withTournaments) {
    ${TOURNAMENT_FIELDS}
  }
`

export const TITLES_QUERY = gql`
  query titlesList(
    $kind: String, 
    $withTournaments: Boolean = false
  ) {
    titles (kind: $kind) {
      ${TITLE_FIELDS}
    }
  }
`

export const TITLE_BY_ID_QUERY = gql`
  query title(
    $id: ID!,
    $withTournaments: Boolean = false
  ) {
    titles (id: $id) {
      ${TITLE_FIELDS}
    }
  }
`
