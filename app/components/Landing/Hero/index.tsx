'use client'

const Hero = () => {
  return (
    <section className="home__hero">
      <div className="home__hero__overlay">
        <h1 className="home__hero__title">
          {'SCOTT'.split('').map((letter, i) => {
            return (
              <span className="home__hero__title__letter" key={i}>
                {letter}
              </span>
            )
          })}
        </h1>
        <h1 className="home__hero__title">
          {'DULLER'.split('').map((letter, i) => {
            return (
              <span className="home__hero__title__letter" key={i}>
                {letter}
              </span>
            )
          })}
        </h1>
      </div>
      <p className="home__hero__subtitle">
        <strong>SCOTT DULLER</strong>
        <span className="vertical" />
        <span>FULL STACK WEB DEVELOPER</span>
      </p>
    </section>
  )
}

export default Hero
