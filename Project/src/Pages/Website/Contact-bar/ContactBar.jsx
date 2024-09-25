import './ContactBar.css';


const ContactBar = () => {
  return (
    <div className="contact-bar">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <div className="left">
              <ul>
                <li><i class="fa-solid fa-phone"></i> +021-95-51-84</li>
                <li><i class="fa-solid fa-envelope"></i> email@email.com</li>
                <li><i class="fa-solid fa-location-dot"></i> 1734 Stonecoal Road</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="right">
              <ul>
                <li><i class="fa-solid fa-dollar-sign"></i> USD</li>
                <li><i class="fa-solid fa-user"></i> My Account</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ContactBar;