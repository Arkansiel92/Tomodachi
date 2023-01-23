import {NavLink} from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="mb-5 navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink to ="/" className={'navbar-brand'}>Tomodachi</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to ="/" className={'nav-link'}>Partie privée</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to ="/jerk" className={'nav-link'}>Jeu du con</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;