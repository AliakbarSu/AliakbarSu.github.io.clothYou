import React, { useContext } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { ThemeContext } from 'providers/ThemeProvider'
import { Header } from 'components/theme'
import { Container, Button } from 'components/common'
import dev from 'assets/illustrations/dev.svg'
import { Wrapper, IntroWrapper, Details, Thumbnail } from './styles'

export const Intro = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <Wrapper>
      <Header />
      <IntroWrapper as={Container}>
        <Details theme={theme}>
          <h4>A place that you can exchange your clothes</h4>
          <Button as={AnchorLink} href="#contact">
            Buy Now
          </Button>
        </Details>
        {/* <Thumbnail>
          <img src={dev} alt="I’m Ali and I’m a Full Stack developer!" />
        </Thumbnail> */}
      </IntroWrapper>
    </Wrapper>
  )
}
