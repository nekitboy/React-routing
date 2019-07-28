import React from 'react'
import MainSlider from '../../components/MainSlider/MainSlider'
import WhyAcademicWorks from '../../components/WhyAcademicWorks/WhyAcademicWorks'
import PopularCourses from '../../components/PopularCourses/PopularCourses'
import AboutOurUniversity from '../../components/AboutOurUniversity/AboutOurUniversity'
import Testimonials from '../../components/Testimonials/Testimonials'
import Features from '../../components/Features/Features'
import SubscribeToUs from '../../components/SubscribeToUs/SubscribeToUs'

export default () => (
  <React.Fragment>
    <MainSlider/>
    <WhyAcademicWorks/>
    <PopularCourses/>
    <AboutOurUniversity/>
    <Testimonials/>
    <Features/>
    <SubscribeToUs/>
  </React.Fragment>
)
