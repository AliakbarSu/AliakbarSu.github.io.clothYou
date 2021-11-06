import { mutate } from 'swr'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRef } from 'react'

import Button from '@/ui/button'
import Form from '@/ui/form'
import { ProductReviewsQuery } from '@/graphql/queries/reviews'

function SendClothForm(props) {
  const formRef = useRef()
  const { handleSubmit, ...formMethods } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().required().email(),
        name: yup.string().required()
      })
    )
  })

  const onSubmit = (event) => {
    props.onSubmit(new FormData(formRef.current))
  }

  return (
    <Form
      formRef={formRef}
      className="space-y-5 mt-6"
      methods={formMethods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Form.Input field="name" label="Name" />
        <Form.Input field="email" label="Email" />
      </div>
      <Form.DragDrop type="file" field="theFiles" multiple label="Photos" />
      <Button type="submit" disabled={props.disabled}>
        Submit
      </Button>
    </Form>
  )
}

export default SendClothForm
