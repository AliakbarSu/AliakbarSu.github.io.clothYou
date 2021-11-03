import React from 'react'
import { Layout, SEO } from 'components/common'
import { Intro, How, Contact, Items } from 'components/landing'

export default () => (
  <Layout>
    <SEO />
    <Intro />
    <Items />
    <How />
    <Contact />
  </Layout>
)
