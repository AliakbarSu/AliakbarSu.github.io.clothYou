import graphcmsMutationClient, { gql } from '@/lib/graphcms-mutation-client'
const FormData = require('form-data')
const fs = require('fs')
import fetch from 'node-fetch'
const path = require('path')

export const createClothReviewMutation = gql`
  mutation CreateClothReviewMutation($clothes: ClothReviewCreateInput!) {
    clothReview: createClothReview(data: $clothes) {
      name
      email
      photos {
        id
      }
    }
  }
`

const uploadAssets = () => {
  const files = fs.readdirSync(path.join(__dirname, 'public', 'uploads'))

  const uploadPromiseArray = files.map((file) => {
    const form = new FormData()
    form.append(
      'fileUpload',
      fs.createReadStream(path.join(__dirname, 'public', 'uploads', file))
    )
    return fetch(`${process.env.NEXT_PUBLIC_GRAPHCMS_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`
      },
      body: form
    }).then((res) => res.json())
  })
  return Promise.all(uploadPromiseArray)
}

const delete_assets_from_in_temp = () => {
  const files = fs.readdirSync(path.join(__dirname, 'public', 'uploads'))
  for (let file of files) {
    if (fs.existsSync(path.join(__dirname, 'public', 'uploads', file))) {
      fs.unlinkSync(path.join(__dirname, 'public', 'uploads', file))
    }
  }
}

const create_review_request = async (data) => {
  return graphcmsMutationClient.request(createClothReviewMutation, {
    clothes: {
      email: data.email,
      name: data.name,
      photos: { connect: data.assets }
    }
  })
}

export default async (data) => {
  try {
    let uploadedAssets = await uploadAssets()
    uploadedAssets = uploadedAssets.map((asset) => ({ id: asset.id }))
    const clothReviewData = { ...data, assets: uploadedAssets }
    delete_assets_from_in_temp()
    return create_review_request(clothReviewData)
  } catch (err) {
    console.log('create-cloth-review.js', err)
    return err
  }
}
