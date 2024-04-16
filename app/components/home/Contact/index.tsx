import React, { forwardRef } from 'react'

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="home__contact">
      contact
    </div>
  )
})

Contact.displayName = 'HeroContact'

export default Contact
