import * as React from 'react'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'
import axios from 'axios'
import SendClothForm from '@/components/send-cloth-form'
import getPageData from '@/lib/get-page-data'
import SEO from '@/components/seo'
import { useSettingsContext } from '@/context/settings'
import useSubmissionState from 'hooks/use-form-submission'

function SendCloth() {
  const {
    setSubmissionError,
    setSubmissionSuccess,
    setSubmissionLoading,
    submissionLoading,
    submissionSuccess
  } = useSubmissionState()

  const handleClick = async (formData) => {
    try {
      setSubmissionLoading()
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total)
          )
        }
      }

      const res = await axios.post(
        '/api/graphcms/create-cloth-review',
        formData,
        config
      )

      if (res.status !== 200) {
        const error = new Error(
          'An error occurred while performing this request'
        )

        error.info = await res.data
        error.status = res.status

        throw error
      }

      setSubmissionSuccess()
    } catch (error) {
      console.log(error)
      setSubmissionError(error.message)
    }
  }

  return (
    <React.Fragment>
      <SEO title="Send-cloth" />
      {submissionSuccess ? (
        <React.Fragment>
          <div className="flex justify-center items-center flex-wrap py-32">
            <h3 className="text-center text-gray-800 font-semibold text-lg group-hover:text-indigo-600 mb-1">
              Thanks for submitting your cloth for review
            </h3>
            <br />
            <p className="text-gray-400 text-sm">
              Once you cloth has been valued, we'll contact you via provided
              email
            </p>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3>Submit Your Cloth For Evaluation</h3>
          <SendClothForm onSubmit={handleClick} disabled={submissionLoading} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default SendCloth

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })

  return {
    props: { ...pageData }
  }
}
