import {Link} from "react-router-dom";
import"../styles/NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are trying to access could not be found.It may
        have been moved, deleted, or the address entered is incorrect.
      </p>
      <p>Please use the navigation menu to return to one of the available pages.</p>
      <Link to="/" className="home-btn">Back to Home</Link>
    </main>
  );
}

export default NotFound;