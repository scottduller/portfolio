import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('./components/Canvas'), {
  ssr: false,
})

const Home = () => {
  return (
    <>
      <Canvas />
      <div className="container">
        <div className="heroWrapper">
          <h1>
            <span className="beautiful">
              BEAUTIFUL
              <span className="ampersand"> &</span>
            </span>
            <br />
            <span className="emphasis">
              <span className="functional">
                <span className="fun">FUN</span>
                CTIONAL
              </span>
            </span>
          </h1>
          {/* <p>
            I am a full-stack developer with a passion for creating beautiful
            and functional web applications. I have experience with a variety of
            technologies and am always looking to learn more.
          </p>
          <Socials /> */}
        </div>
      </div>
    </>
  )
}

export default Home
