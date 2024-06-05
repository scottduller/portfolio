import Masonry, { Breakpoints } from '@/projects/components/Masonry'
import React from 'react'
import ProjectCard from './components/ProjectCard'

const Projects = () => {
  const columns: Breakpoints = {
    768: 1,
    1200: 2,
    1810: 3,
    1920: 4,
  } as const

  type Tags = {
    languages?: Array<'JavaScript' | 'TypeScript' | 'Python' | 'HTML' | 'CSS'>
    libraries?: Array<
      'React' | 'Next.js' | 'Express' | 'TailwindCSS' | 'Styled Components'
    >
    type?: Array<'Full Stack' | 'Frontend' | 'Backend'>
    device?: Array<'Desktop' | 'Mobile' | 'Tablet'>
  }

  const data = [
    {
      title: 'Financial Portal',
      description:
        'A financial portal application for organising my finances. It allows me to track my income, expenses, and investments. It also provides a dashboard with an overview of my financial health.',
      githubHref: 'https://github.com/scottduller/financial-portal',
      webHref: 'https://financial-portal.vercel.app',
      imageHref: '/mockup.png',
      tags: {
        languages: ['JavaScript', 'TypeScript'],
        libraries: ['React', 'Next.js', 'Styled Components'],
        type: ['Full Stack'],
        device: ['Desktop', 'Mobile'],
      } as Tags,
    },
    {
      title: 'Portfolio Website',
      description:
        'My personal portfolio website. It showcases my projects, skills, and experience. It contains some experimental features like a 3D background using the marching cubes alorithm.',
      githubHref: 'https://gitghub.com/scottduller/portfolio',
      webHref: 'https://scottduller.com',
      imageHref: '/mockup.png',
      tags: {
        languages: ['JavaScript', 'TypeScript'],
        libraries: ['React', 'Next.js'],
        type: ['Frontend'],
        device: ['Desktop', 'Mobile'],
      } as Tags,
      stretchColumns: 2,
    },
    {
      title: 'Study Now',
      description:
        'A study application for organising my studies. It allows me to track my study hours, subjects, and assignments. It also provides a dashboard with an overview of my study progress.',
      githubHref: 'https://github.com/scottduller/study-now',
      tags: {
        languages: ['JavaScript'],
        libraries: ['React', 'Next.js', 'TailwindCSS'],
        type: ['Full Stack'],
        device: ['Desktop', 'Mobile'],
      } as Tags,
    },
  ]

  return (
    <section className="container projects">
      {/* <h1>PROJECTS</h1> */}
      <Masonry columns={columns} gap={32}>
        {data.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </Masonry>
    </section>
  )
}

export default Projects
