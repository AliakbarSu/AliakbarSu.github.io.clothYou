import * as React from 'react'
import { mutate } from 'swr'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import Button from '@/ui/button'
import Form from '@/ui/form'
import { ProductReviewsQuery } from '@/graphql/queries/reviews'
import useSubmissionState from 'hooks/use-form-submission'

function ProductReviewForm({ product }) {
  const formRef = React.useRef()
  const {
    setSubmissionError,
    setSubmissionLoading,
    setSubmissionSuccess,
    submissionSuccess,
    submissionLoading
  } = useSubmissionState()

  const { handleSubmit, ...formMethods } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(),
        email: yup.string().required().email(),
        headline: yup.string().required(),
        name: yup.string().required()
      })
    )
  })

  const onSubmit = async (data) => {
    const formData = new FormData(formRef.current)
    formData.append('product', JSON.stringify({ connect: { id: product.id } }))
    mutate(
      [ProductReviewsQuery, product.id],
      async ({ reviews: { aggregate, edges } }) => {
        setSubmissionLoading()
        try {
          const config = {
            headers: { 'content-type': 'multipart/form-data' }
          }

          const {
            data: { review }
          } = await axios.post(
            '/api/graphcms/create-product-review',
            formData,
            config
          )
          setSubmissionSuccess()
          return {
            reviews: {
              aggregate: { count: ++aggregate.count },
              edges: [...edges, { node: review }]
            }
          }
        } catch (error) {
          console.log(error)
          setSubmissionError(error.message)
        }
      },
      false
    )
  }

  if (submissionSuccess) {
    return (
      <p className="text-center py-5 text-gray-600">Thanks for your review!</p>
    )
  }

  return (
    <Form
      formRef={formRef}
      className="space-y-5 mt-6"
      methods={formMethods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Input field="headline" label="Title" />
      <div className="grid gap-4 md:grid-cols-2">
        <Form.Input field="name" label="Name" />
        <Form.Input field="email" label="Email" />
      </div>
      <Form.Textarea field="content" label="Review" />
      <Form.DragDrop type="file" field="theFiles" multiple label="Photos" />
      <Button type="submit" disabled={submissionLoading}>
        Submit
      </Button>
    </Form>
  )
}

export default ProductReviewForm
