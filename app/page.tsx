import dynamic from 'next/dynamic'

const MetaballsScene = dynamic(() => import('./components/MetaballsScene'), {
  ssr: false,
})

const Home = () => {
  return (
    <>
      <MetaballsScene />
    </>
  )
}

export default Home
