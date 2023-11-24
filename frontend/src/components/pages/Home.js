import { Link } from 'react-router-dom'

function Home() {
  return (
    <section>
      <h1>Home</h1>
      <p>
        Ve: <Link to="#">Clique aqui</Link>
      </p>
    </section>
  )
}

export default Home