import { cn } from '@/utils/cn'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLink } from 'react-icons/fa'
import { MasonryItem } from '../Masonry'

type ProjectCardProps = {
  title: string
  description: string
  githubHref: string
  webHref?: string
  imageHref?: string
  stretchColumns?: number
  tags?: {
    languages?: Array<'JavaScript' | 'TypeScript' | 'Python' | 'HTML' | 'CSS'>
    libraries?: Array<
      'React' | 'Next.js' | 'Express' | 'TailwindCSS' | 'Styled Components'
    >
    type?: Array<'Full Stack' | 'Frontend' | 'Backend'>
    device?: Array<'Desktop' | 'Mobile' | 'Tablet'>
  }
}

//TODO: Check useEffects in Masonry to see if it can be optimized (less rerenders!!!)

//TODO: extract tags to seperate component for filtering

const ProjectCard = ({
  title,
  description,
  githubHref,
  webHref,
  imageHref,
  stretchColumns = 1,
}: ProjectCardProps) => {
  const isFeatured = stretchColumns > 1

  return (
    <MasonryItem stretchColumns={stretchColumns}>
      <div
        className={cn(
          'project-card',
          isFeatured && 'featured',
          !imageHref && 'no-image',
        )}
      >
        {isFeatured && <div className="hoverTrigger" />}
        {imageHref && (
          <Image src={imageHref} alt={title} width={479} height={292} />
        )}
        <div className="project-card__overlay">
          <div className="project-card__overlay__header">
            <h2 className="project-card__overlay__header__title">{title}</h2>
            <hr />
            <div className="project-card__overlay__header__links">
              <Link href={githubHref} target="_blank" rel="noopener noreferrer">
                GitHub
                <div className="divider" />
                <FaGithub />
              </Link>
              {webHref && (
                <Link href={webHref} target="_blank" rel="noopener noreferrer">
                  Website
                  <div className="divider" />
                  <FaLink />
                </Link>
              )}
            </div>
          </div>
          <div className="project-card__overlay__content">
            <p>{description}</p>
            <div className="project-card__overlay__content__tags">
              <span className="pill">React</span>
              <span className="pill">Next.js</span>
              <span className="pill">Styled Components</span>
            </div>
          </div>
        </div>
      </div>
    </MasonryItem>
  )
}

export default ProjectCard
