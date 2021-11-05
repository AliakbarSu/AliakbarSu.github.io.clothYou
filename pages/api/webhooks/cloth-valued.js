import stripe from '@/lib/stripe-client'
import sendMail from '@/lib/send-mail'

export default async (req, res) => {
  const {
    data: { id, value, email }
  } = req.body
  try {
    const coupon = await stripe.coupons.create({
      amount_off: value,
      currency: 'NZD',
      duration: 'once'
    })
    const mailObject = {
      to: email,
      from: 'aliakbar.su@gmail.com',
      subject: 'Cloth Evaluation Request',
      html: `Hi there, this is the amount we have valued your cloths<strong>$NZD${value}</strong>`
    }
    await sendMail(mailObject)
    res.status(201).json({ coupon })
  } catch (err) {
    console.error(error)
    res.status(500).json({
      message: 'There was a problem creating a coupon'
    })
  }
}
