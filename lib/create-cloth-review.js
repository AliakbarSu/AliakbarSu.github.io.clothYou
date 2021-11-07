import graphcmsMutationClient, { gql } from '@/lib/graphcms-mutation-client'

export const createClothReviewMutation = gql`
  mutation CreateClothReviewMutation($clothes: ClothReviewCreateInput!) {
    clothReview: createClothReview(data: $clothes) {
      id
      name
      email
      city
      photos {
        id
      }
    }
  }
`

export const publishClothReviewMutation = gql`
  mutation PublishClothReviewMutation($id: ID!) {
    publishClothReview(where: { id: $id }) {
      id
    }
  }
`

const create_review_request = async (data) => {
  return graphcmsMutationClient.request(createClothReviewMutation, {
    clothes: data
  })
}

const publish_review_request = (id) => {
  return graphcmsMutationClient.request(publishClothReviewMutation, {
    id
  })
}

export default async (data) => {
  try {
    const {
      clothReview: { id }
    } = await create_review_request(data)
    return publish_review_request(id)
  } catch (err) {
    console.log('create-cloth-review.js', err)
    return err
  }
}
