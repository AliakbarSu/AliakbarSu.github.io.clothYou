import stripe from '@/lib/stripe-client'
import sendMail from '@/lib/send-mail'
import graphcmsMutationClient, { gql } from '@/lib/graphcms-mutation-client'
import { convert_dollars_to_cents } from '@/utils/currency_unit_converter'
import voucher_codes from 'voucher-code-generator'

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

export const addPromoCodeMutation = gql`
  mutation AddPromoCodeMutation($promoCode: String!, $id: ID!) {
    clothReview: updateClothReview(
      data: { promoCode: $promoCode }
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

const add_promo_code = async (promoCode, id) => {
  return graphcmsMutationClient.request(addPromoCodeMutation, {
    promoCode,
    id
  })
}

export default async (req, res) => {
  const {
    data: { id, value, email, name }
  } = req.body
  try {
    // Create stripe coupon
    const coupon = await stripe.coupons.create({
      amount_off: convert_dollars_to_cents(value),
      currency: 'NZD',
      duration: 'once'
    })
    const couponId = coupon.id

    // Create stripe promotion code
    const promotionCode = voucher_codes.generate({
      prefix: name.toUpperCase(),
      length: 5,
      charset: voucher_codes.charset('alphabetic')
    })[0]

    await stripe.promotionCodes.create({
      coupon: couponId,
      code: promotionCode,
      max_redemptions: 1
    })

    // Save both coupon and promo code
    await add_coupon(couponId, id)
    await add_promo_code(promotionCode, id)
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
