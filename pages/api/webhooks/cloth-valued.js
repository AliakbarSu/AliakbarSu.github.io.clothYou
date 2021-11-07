import stripe from '@/lib/stripe-client'
import sendMail from '@/lib/send-mail'
import graphcmsMutationClient, { gql } from '@/lib/graphcms-mutation-client'

export const addCouponMutation = gql`
  mutation AddCouponMutation($coupon: String!, $id: ID!) {
    clothReview: updateClothReview(
      data: { coupon: $coupon }
      where: { id: $id }
    ) {
      id
    }
  }
`

const add_coupon = async (coupon, id) => {
  return graphcmsMutationClient.request(addCouponMutation, {
    coupon,
    id
  })
}

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
    const couponId = coupon.id
    await add_coupon(couponId, id)
    const mailObject = {
      to: email,
      from: 'aliakbar.su@gmail.com',
      subject: 'Cloth Evaluation Request',
      html: `Hi there, this is the amount we have valued your cloths<strong>$NZD${value}</strong>`
    }
    await sendMail(mailObject)
    res.status(201).json({ coupon })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'There was a problem creating a coupon'
    })
  }
}
