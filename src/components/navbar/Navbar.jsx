import './navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* navbar container start */}
      <div className='navContainer'>
        {/* navbar logo */}
        <span className='logo'>Booker</span>

        {/* navbar items */}
        <div className='navItems'>
            <button className='navButton'>Register</button>
            <button className='navButton'>Login</button>
        </div>
      </div>
      {/* navbar container end */}
    </div>
  )
}

export default Navbar
