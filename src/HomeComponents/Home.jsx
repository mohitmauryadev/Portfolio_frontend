import React from 'react'
import Hero from './Hero'
import About from './About'
import SkillsSection from './SkillsSection'
import ProjectsSection from './ProjectsSection'
import ContactSection from './ContactSection'
import Animates from './Animates'
import AnimatedCards from './AnimatedCards'

const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <SkillsSection/>
      <AnimatedCards/>
      <ProjectsSection/>
      <ContactSection/>
      <Animates/>
    </div>
  )
}

export default Home


