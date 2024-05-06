import dynamic from 'next/dynamic'
import React from 'react'

const FilteredProjects = dynamic(
  () => import('@/components/Projects/FilteredProjects'),
  { ssr: false },
)

const page = () => {
  return (
    <div className="container">
      <FilteredProjects />
    </div>
  )
}

export default page
