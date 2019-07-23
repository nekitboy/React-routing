import React from 'react'
import SiteSection from '../../UI/SiteSection/SiteSection'
import FeatureCard from './FeatureCard/FeatureCard'

export default () => (
  <SiteSection title='Why Academics Works' center>
    <div>
      <FeatureCard
        title='Personalize Learning'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi hendrerit elit'
        icon='mortarboard'
        link='#'
      />
      <FeatureCard
        title='Trusted Courses'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi hendrerit elit'
        icon='school-material'
        link='#'
      />
      <FeatureCard
        title='Tools for Students'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi hendrerit elit'
        icon='library'
        link='#'
      />
    </div>
  </SiteSection>

)
