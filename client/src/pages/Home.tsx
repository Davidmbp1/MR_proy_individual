import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Bienvenido a Last Minute Foods</h1>
      <p>Esta es la página principal (Home).</p>
      <Link to="/login">Ir a Login</Link> |{' '}
      <Link to="/register">Ir a Registro</Link>
    </div>
  )
}

export default Home
