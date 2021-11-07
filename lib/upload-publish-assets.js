import graphcmsMutationClient, { gql } from '@/lib/graphcms-mutation-client'
const FormData = require('form-data')
const fs = require('fs')
import fetch from 'node-fetch'
const path = require('path')

export const publishAssetsMutation = gql`
  mutation PublishAssetsMutation($ids: [ID!]) {
    publishManyAssets(to: PUBLISHED, where: { id_in: $ids }) {
      count
    }
  }
`

const uploadAssets = (folder) => {
  const files = fs.readdirSync(path.join(__dirname, 'public', folder))

  const uploadPromiseArray = files.map((file) => {
    const form = new FormData()
    form.append(
      'fileUpload',
      fs.createReadStream(path.join(__dirname, 'public', folder, file))
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

const delete_assets_from_in_temp = (folder) => {
  const files = fs.readdirSync(path.join(__dirname, 'public', folder))
  for (let file of files) {
    if (fs.existsSync(path.join(__dirname, 'public', folder, file))) {
      fs.unlinkSync(path.join(__dirname, 'public', folder, file))
    }
  }
}

const publish_many_assets = (ids) => {
  return graphcmsMutationClient.request(publishAssetsMutation, {
    ids
  })
}

export default async (folder) => {
  let uploadedAssets = await uploadAssets(folder)
  uploadedAssets = uploadedAssets.map((asset) => asset.id)
  delete_assets_from_in_temp(folder)
  await publish_many_assets(uploadedAssets)
  return uploadedAssets
}
