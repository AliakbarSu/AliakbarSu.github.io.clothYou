import React, { useContext } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { ThemeContext } from 'providers/ThemeProvider'
import { Container, Button } from 'components/common'
import dev from 'assets/illustrations/skills.svg'
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles'

export const How = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <Wrapper id="about">
      <SkillsWrapper as={Container}>
        <Thumbnail>
          <img src={dev} alt="A photo of t-shirt" />
        </Thumbnail>
        <Details theme={theme}>
          <h1>How it works</h1>
          <p>More to come....</p>
          <Button as={AnchorLink} href="#contact">
            Exchange Now
          </Button>
        </Details>
      </SkillsWrapper>
    </Wrapper>
  )
}
