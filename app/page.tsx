import dynamic from 'next/dynamic'

const MetaballsScene = dynamic(() => import('./components/MetaballsScene'), {
  ssr: false,
})

const Home = () => {
  return (
    <div>
      <MetaballsScene />
    </div>
  )
}

export default Home
