import stripe from '@/lib/stripe-client'

export default async (req, res) => {
  const {
    data: { id, value }
  } = req.body
  try {
    const coupon = await stripe.coupons.create({
      amount_off: value,
      currency: 'NZD',
      duration: 'once'
    })
    res.status(201).json({ coupon })
  } catch (err) {
    console.error(error)
    res.status(500).json({
      message: 'There was a problem creating a coupon'
    })
  }
}
