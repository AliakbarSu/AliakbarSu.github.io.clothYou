import nextConnect from 'next-connect'
import multer from 'multer'
import create_cloth_review_request from '@/lib/create-cloth-review'
const path = require('path')

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, 'public', 'uploads'),
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
  const customerData = {
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    photos: []
  }
  await create_cloth_review_request(customerData)
  res.status(200).json({ data: 'success' })
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
}
