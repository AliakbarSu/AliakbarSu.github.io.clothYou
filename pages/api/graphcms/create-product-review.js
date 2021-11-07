import nextConnect from 'next-connect'
import multer from 'multer'
const path = require('path')
import graphcmsMutationClient, { gql } from '@/lib/graphcms-mutation-client'
import uploadPublishAssets from '@/lib/upload-publish-assets'

const UPLOAD_FOLDER = 'reviews'

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, 'public', UPLOAD_FOLDER),
    filename: (req, file, cb) => cb(null, file.originalname)
  }),
  limits: {
    fieldNameSize: 500,
    files: 5,
    fields: 10,
    fileSize: 200 * 1024 * 1024
  }
})

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
})

apiRoute.use(upload.array('theFiles'))

apiRoute.post(async (req, res) => {
  const uploadedAssets = await uploadPublishAssets(UPLOAD_FOLDER)
  const reviewData = {
    headline: req.body.headline,
    name: req.body.name,
    email: req.body.email,
    product: JSON.parse(req.body.product),
    content: req.body.content,
    photos: { connect: uploadedAssets.map((asset) => ({ id: asset })) }
  }
  const { review } = await create_publish_review(reviewData)
  res.status(200).json({ review })
})

const create_publish_review = async (reviewData) => {
  try {
    const { review } = await graphcmsMutationClient.request(
      gql`
        mutation CreateProductReview($review: ReviewCreateInput!) {
          review: createReview(data: $review) {
            id
          }
        }
      `,
      { review: reviewData }
    )

    const { publishedReview } = await graphcmsMutationClient.request(
      gql`
        mutation PublishProductReview($id: ID!) {
          publishedReview: publishReview(where: { id: $id }) {
            id
            content
            createdAt
            email
            headline
            name
            rating
            photos {
              id
              url
            }
          }
        }
      `,
      { id: review.id }
    )

    return { review: publishedReview }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default apiRoute

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
}
