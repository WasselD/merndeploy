
const Home = () => {
  return (
    <div className="app-page">
      <div className="app-page__grid">
        <section className="app-hero">
          <p className="app-eyebrow">Welcome to ClearSpace</p>
          <h1>Simple, readable, responsive.</h1>
          <p>
            The interface focuses on clarity: clean spacing, strong contrast, and sections that adapt smoothly to smaller screens.
          </p>
          <div className="app-hero__statrow">
            <span className="app-hero__stat">Clear content</span>
            <span className="app-hero__stat">Responsive layout</span>
            <span className="app-hero__stat">Footer stays down</span>
          </div>
        </section>
        <aside className="app-page__card">
          <h2 className="app-page__headline">Get started</h2>
          <p className="app-page__subtext">Use the navigation to log in, register, or view your profile.</p>
        </aside>
      </div>
    </div>
  )
}

export default Home
