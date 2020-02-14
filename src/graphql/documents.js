import gql from 'graphql-tag'

export const DOCUMENTS_QUERY = gql`
  query documentsList {
    documents {
      filename
      id
      kind
      status
    }
  }
`

export const DELETE_FILE = gql`
  mutation ($id: ID!) {
    deleteFile(id: $id)
  }
`
