import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer_component">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-vertical padding-xxlarge">
            <div className="padding-bottom padding-xxlarge">
              <div className="w-layout-grid footer_top-wrapper">
                <div className="footer_left-wrapper">
                  <div className="margin-bottom margin-small">
                    <Link href="/" className="footer_logo-link w-nav-brand">
                      <img
                        src="https://microtex.co/wp-content/uploads/2020/09/Mctex.png"
                        loading="lazy"
                        width={215}
                        alt="Microtex International"
                        className="footer_logo"
                      />
                    </Link>
                  </div>
                </div>

                <div className="w-layout-grid footer_menu-wrapper">
                  <div className="footer_link-list">
                    <div className="margin-bottom margin-xsmall">
                      <div className="text-weight-medium">Navigate</div>
                    </div>
                    <Link href="/" className="footer_link">Home</Link>
                    <Link href="/solutions" className="footer_link">Machines</Link>
                    <Link href="/services" className="footer_link">Spare Parts</Link>
                    <Link href="/our-services" className="footer_link">Services</Link>
                    <Link href="/about-us" className="footer_link">About Us</Link>
                    <Link href="/contact" className="footer_link">Contact Us</Link>
                  </div>

                  <div className="footer_link-list">
                    <div className="margin-bottom margin-xsmall">
                      <div className="text-weight-medium">Machines</div>
                    </div>
                    <Link href="/solutions#hlp250" className="footer_link">HLP250 Packing Line</Link>
                    <Link href="/solutions#wrapper" className="footer_link">Wrapper MTI-W200-1</Link>
                    <Link href="/solutions#overwrapper" className="footer_link">Over Wrapper MTI-OW25-1</Link>
                    <Link href="/solutions#boxer" className="footer_link">High Speed Boxer MTI-HSB30-1</Link>
                    <Link href="/solutions#casepacker" className="footer_link">Case Packer MTI-CP06-1</Link>
                    <Link href="/solutions#rebuilt" className="footer_link">Rebuilt &amp; Used Machines</Link>
                  </div>

                  <div className="footer_link-list">
                    <div className="margin-bottom margin-xsmall">
                      <div className="text-weight-medium">Contact</div>
                    </div>
                    <a
                      href="mailto:info@microtex.co"
                      className="footer_social-link w-inline-block"
                    >
                      <div className="icon-embed-xsmall w-embed">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div>info@microtex.co</div>
                    </a>
                    <a
                      href="tel:+971521361040"
                      className="footer_social-link w-inline-block"
                    >
                      <div className="icon-embed-xsmall w-embed">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.707 12.293C17.6142 12.2 17.504 12.1263 17.3827 12.076C17.2614 12.0257 17.1313 11.9998 17 11.9998C16.8687 11.9998 16.7386 12.0257 16.6173 12.076C16.496 12.1263 16.3858 12.2 16.293 12.293L14.699 13.887C13.96 13.667 12.581 13.167 11.707 12.293C10.833 11.419 10.333 10.04 10.113 9.30096L11.707 7.70696C11.7999 7.61417 11.8737 7.50397 11.924 7.38265C11.9743 7.26134 12.0002 7.13129 12.0002 6.99996C12.0002 6.86862 11.9743 6.73858 11.924 6.61726C11.8737 6.49595 11.7999 6.38575 11.707 6.29296L7.707 2.29296C7.61421 2.20001 7.50401 2.12627 7.38269 2.07596C7.26138 2.02565 7.13133 1.99976 7 1.99976C6.86866 1.99976 6.73862 2.02565 6.6173 2.07596C6.49599 2.12627 6.38579 2.20001 6.293 2.29296L3.581 5.00496C3.201 5.38496 2.987 5.90696 2.995 6.43996C3.018 7.86396 3.395 12.81 7.293 16.708C11.191 20.606 16.137 20.982 17.562 21.006H17.59C18.118 21.006 18.617 20.798 18.995 20.42L21.707 17.708C21.7999 17.6152 21.8737 17.505 21.924 17.3837C21.9743 17.2623 22.0002 17.1323 22.0002 17.001C22.0002 16.8696 21.9743 16.7396 21.924 16.6183C21.8737 16.4969 21.7999 16.3867 21.707 16.294L17.707 12.293ZM17.58 19.005C16.332 18.984 12.062 18.649 8.707 15.293C5.341 11.927 5.015 7.64196 4.995 6.41896L7 4.41396L9.586 6.99996L8.293 8.29296C8.17546 8.41041 8.08904 8.55529 8.04155 8.71453C7.99406 8.87376 7.987 9.04231 8.021 9.20496C8.045 9.31996 8.632 12.047 10.292 13.707C11.952 15.367 14.679 15.954 14.794 15.978C14.9565 16.0129 15.1253 16.0064 15.2846 15.9591C15.444 15.9117 15.5889 15.825 15.706 15.707L17 14.414L19.586 17L17.58 19.005V19.005Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div>+971 521 361 040</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="line-divider"></div>

            <div className="padding-top padding-medium">
              <div className="footer_bottom-wrapper">
                <div className="footer_credit-text">&copy; 2025 Microtex International. All rights reserved.</div>
                <div className="footer_logo-wrapper">
                </div>
                <div className="w-layout-grid footer_legal-list">
                  <a href="#" className="footer_legal-link">Privacy Policy</a>
                  <a href="#" className="footer_legal-link">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
