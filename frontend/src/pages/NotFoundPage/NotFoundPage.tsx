import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <p>404</p>
      <h1>Page not found</h1>
      <Link className="button button-accent" to="/">Return home</Link>
    </section>
  )
}
