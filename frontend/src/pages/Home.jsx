import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
    <main className="container main-grid">
      <div className="container">
        <h1>Bare Minimum Notes</h1>
        <p className="sub">Small reminders and gotchas for Everything</p>
        <div className="controls">
        <Link to="/topics" className="controls-btn">Go to topics</Link>
        </div>
      </div>
    </main>


    {/* keep a section for reminders!!! */}
    </>
  );
}