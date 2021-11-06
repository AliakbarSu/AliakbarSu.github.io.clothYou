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
        name: yup.string().required(),
        city: yup.string().required()
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
      <div className="mt-10 sm:mt-0">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Form.Input field="name" label="Name" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Form.Input field="email" label="Email address" />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <Form.Input field="city" label="City" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Form.DragDrop type="file" field="theFiles" multiple label="Photos" />
      <Button type="submit" disabled={props.disabled}>
        Submit
      </Button>
    </Form>
  )
}

export default SendClothForm
