import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us - Microtex International",
  description:
    "Microtex International is a leading supplier of high quality packaging machinery based in Saif Zone, Sharjah, UAE. We provide superior turnkey-solutions for industries worldwide.",
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main className="main-wrapper">
        {/* Hero/Header Section */}
        <section className="section_header-main is-blue">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-xlarge">
                <div className="w-layout-grid header-main_component">
                  <div className="header-main_content-left">
                    <h1 className="heading-style-h4 _w-100">About Microtex International</h1>
                  </div>
                  <div className="header-main_content-right">
                    <p className="heading-style-h3 text-color-white">
                      We provide superior turnkey-solutions through custom design, manufacturing, installation and support of packaging machinery for industries worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="section_header-main">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-xlarge">
                <div className="w-layout-grid header-main_component">
                  <div className="header-main_content-left">
                    <h2 className="heading-style-h4 m-blue-75">Our Vision</h2>
                  </div>
                  <div className="header-main_content-right">
                    <p className="heading-style-h3 m-blue-100">
                      We sustain our vision and mission by constantly seeking renewal via continuous education and learning, and the application of new technologies and best business practices. Our systematic methodology ensures the best possible solutions for your packaging needs.
                    </p>
                  </div>
                  <div className="button-wrapper">
                    <a
                      href="/contact"
                      className="button is-price w-inline-block"
                    >
                      <div>Send us your inquiry</div>
                      <div className="button-circle">
                        <div className="arrow-right w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            viewBox="0 0 12 10"
                            fill="none"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                            role="img"
                          >
                            <path
                              d="M7 0L6.285 0.6965L10.075 4.5H0V5.5H10.075L6.285 9.2865L7 10L12 5L7 0Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                    <a
                      href="/solutions"
                      className="button is-secondary w-inline-block"
                    >
                      <div>View our machines</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="section_industries">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="w-layout-grid industries_component">
                  <div className="industries_content">
                    <div className="industries_top-wrapper">
                      <h2 className="heading-style-h4">What We Do</h2>
                    </div>
                    <div className="industries_bottom-wrapper">
                      <div className="max-width-small">
                        <p className="text-size-regular">
                          Microtex International is a leading supplier of high quality bespoke and generic packaging machinery for tobacco, confectionery, tea, coffee, and cosmetics industries. We design wrappers, over-wrappers, case packers, and flexi conveyor systems. We also supply a huge collection of spare parts for makers and packers.
                        </p>
                      </div>
                      <div className="margin-top margin-medium">
                        <div className="button-wrapper">
                          <a
                            href="/contact"
                            className="button is-price w-inline-block"
                          >
                            <div>Send us your inquiry</div>
                            <div className="button-circle">
                              <div className="arrow-right w-embed">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 12 10"
                                  fill="none"
                                  preserveAspectRatio="xMidYMid meet"
                                  aria-hidden="true"
                                  role="img"
                                >
                                  <path
                                    d="M7 0L6.285 0.6965L10.075 4.5H0V5.5H10.075L6.285 9.2865L7 10L12 5L7 0Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <a
                            href="/our-services"
                            className="button is-secondary w-inline-block"
                          >
                            <div>Full catalog of services</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="industries_image-wrapper">
                    <img
                      src="https://microtex.co/wp-content/uploads/2021/10/m1.png"
                      loading="lazy"
                      height={695}
                      alt="Microtex International packaging machinery"
                      width={521}
                      className="industries_image"
                    />
                    <img
                      src="https://microtex.co/wp-content/uploads/2020/12/m2.png"
                      loading="lazy"
                      height={506}
                      alt="Microtex International over wrapper machine"
                      width={460}
                      className="industries_image is-absolute"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section_header-main">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-xlarge">
                <div className="w-layout-grid header-main_component">
                  <div className="header-main_content-left">
                    <h2 className="heading-style-h4 m-blue-75">Our Mission</h2>
                  </div>
                  <div className="header-main_content-right">
                    <p className="heading-style-h3 m-blue-100">
                      We seek to develop diversified markets which provide stability and adequate financial returns. Our goal is to create a pleasant, nurturing and growth oriented environment which encourages our team members to be highly productive and to grow personally and professionally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof Section */}
        <section className="section_proof">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="margin-bottom margin-xxlarge">
                  <div className="text-align-center">
                    <div className="max-width-large align-center">
                      <div className="margin-bottom margin-small">
                        <h2>Why choose Microtex International</h2>
                      </div>
                      <div className="max-width-medium align-center">
                        <p className="text-size-medium">
                          With years of industry experience, we deliver packaging solutions that meet the highest international standards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-grid proof_component">
                  <div className="proof_row">
                    {/* Turnkey Solutions */}
                    <div className="proof_card">
                      <div className="proof_image-wrapper">
                        <div className="proof_overlay"></div>
                        <img
                          src="https://microtex.co/wp-content/uploads/2020/09/the-laser-cuts-spark-production-4398315.jpg"
                          loading="lazy"
                          width={420}
                          alt="Turnkey packaging solutions"
                          className="proof_image"
                        />
                      </div>
                      <div className="proof_card-content">
                        <h3 className="heading-style-h3 text-color-white">
                          Turnkey Solutions
                          <br />
                        </h3>
                        <div className="proof_card-content-bottom">
                          <div className="margin-top margin-small">
                            <p className="text-color-white">
                              Complete packaging solutions from design to installation and support
                            </p>
                          </div>
                          <div className="margin-top margin-medium">
                            <a
                              href="/solutions"
                              className="button is-secondary is-small w-inline-block"
                            >
                              <div>View all machines</div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Global Expertise */}
                    <div className="proof_card">
                      <div className="proof_image-wrapper">
                        <div className="proof_overlay"></div>
                        <img
                          src="https://microtex.co/wp-content/uploads/2020/09/machine-perforated-cnc-5446222.jpg"
                          loading="lazy"
                          width={420}
                          alt="Global expertise in packaging machinery"
                          className="proof_image"
                        />
                      </div>
                      <div className="proof_card-content">
                        <h3 className="heading-style-h3 text-color-white">
                          Global Expertise
                          <br />
                        </h3>
                        <div className="proof_card-content-bottom">
                          <div className="margin-top margin-small">
                            <p className="text-color-white">
                              Serving tobacco, confectionery, tea, coffee, and cosmetics industries worldwide
                            </p>
                          </div>
                          <div className="margin-top margin-medium">
                            <a
                              href="/our-services"
                              className="button is-secondary is-small w-inline-block"
                            >
                              <div>Our services</div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quality Assured */}
                    <div className="proof_card">
                      <div className="proof_image-wrapper">
                        <div className="proof_overlay"></div>
                        <img
                          src="https://microtex.co/wp-content/uploads/2020/09/milling-machine-tool-cnc-1137956.jpg"
                          loading="lazy"
                          width={420}
                          alt="Quality assured packaging machinery"
                          className="proof_image"
                        />
                      </div>
                      <div className="proof_card-content">
                        <h3 className="heading-style-h3 text-color-white">
                          Quality Assured
                          <br />
                        </h3>
                        <div className="proof_card-content-bottom">
                          <div className="margin-top margin-small">
                            <p className="text-color-white">
                              Highest industrial quality meeting all international standards
                            </p>
                          </div>
                          <div className="margin-top margin-medium">
                            <a
                              href="/contact"
                              className="button is-secondary is-small w-inline-block"
                            >
                              <div>Contact us</div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Let's Talk Section */}
        <header className="section_lets-talk">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="w-layout-grid lets-talk_component">
                  <div className="lets-talk_content-left">
                    <h2 className="text-color-white text-weight-normal">Let&apos;s talk</h2>
                  </div>
                  <div className="lets-talk_content-right">
                    <p className="heading-style-h3 text-color-white">
                      Whether you have specific questions about our company, want to discuss a potential collaboration, or simply need more information, our team at Microtex International is here to help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Contact Section */}
        <section className="section_contact">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="w-layout-grid contact_component">
                  <div className="contact_content">
                    <div className="margin-bottom margin-xsmall">
                      <div className="text-weight-medium">Get in touch</div>
                    </div>
                    <div className="margin-bottom margin-medium">
                      <div className="margin-bottom margin-small">
                        <h2 className="text-weight-normal text-color-white">Contact us</h2>
                      </div>
                      <div className="max-width-small">
                        <p className="heading-style-h3 text-color-white">
                          Fill out the form and a member of our team will reach out to you.
                        </p>
                      </div>
                    </div>
                    <div className="contact_contact-list">
                      {/* Email */}
                      <div className="contact_item">
                        <div className="contact_icon-wrapper">
                          <div className="icon-embed-xsmall w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <a href="mailto:info@microtex.co" className="link-6">info@microtex.co</a>
                        </div>
                      </div>
                      {/* Phone */}
                      <div className="contact_item">
                        <div className="contact_icon-wrapper">
                          <div className="icon-embed-xsmall w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.707 12.293C17.6142 12.2 17.504 12.1263 17.3827 12.076C17.2614 12.0257 17.1313 11.9998 17 11.9998C16.8687 11.9998 16.7386 12.0257 16.6173 12.076C16.496 12.1263 16.3858 12.2 16.293 12.293L14.699 13.887C13.96 13.667 12.581 13.167 11.707 12.293C10.833 11.419 10.333 10.04 10.113 9.30096L11.707 7.70696C11.7999 7.61417 11.8737 7.50397 11.924 7.38265C11.9743 7.26134 12.0002 7.13129 12.0002 6.99996C12.0002 6.86862 11.9743 6.73858 11.924 6.61726C11.8737 6.49595 11.7999 6.38575 11.707 6.29296L7.707 2.29296C7.61421 2.20001 7.50401 2.12627 7.38269 2.07596C7.26138 2.02565 7.13133 1.99976 7 1.99976C6.86866 1.99976 6.73862 2.02565 6.6173 2.07596C6.49599 2.12627 6.38579 2.20001 6.293 2.29296L3.581 5.00496C3.201 5.38496 2.987 5.90696 2.995 6.43996C3.018 7.86396 3.395 12.81 7.293 16.708C11.191 20.606 16.137 20.982 17.562 21.006H17.59C18.118 21.006 18.617 20.798 18.995 20.42L21.707 17.708C21.7999 17.6152 21.8737 17.505 21.924 17.3837C21.9743 17.2623 22.0002 17.1323 22.0002 17.001C22.0002 16.8696 21.9743 16.7396 21.924 16.6183C21.8737 16.4969 21.7999 16.3867 21.707 16.294L17.707 12.293ZM17.58 19.005C16.332 18.984 12.062 18.649 8.707 15.293C5.341 11.927 5.015 7.64196 4.995 6.41896L7 4.41396L9.586 6.99996L8.293 8.29296C8.17546 8.41041 8.08904 8.55529 8.04155 8.71453C7.99406 8.87376 7.987 9.04231 8.021 9.20496C8.045 9.31996 8.632 12.047 10.292 13.707C11.952 15.367 14.679 15.954 14.794 15.978C14.9565 16.0129 15.1253 16.0064 15.2846 15.9591C15.444 15.9117 15.5889 15.825 15.706 15.707L17 14.414L19.586 17L17.58 19.005V19.005Z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <a href="tel:+971521361040" className="link-5">+971 521 361 040</a>
                        </div>
                      </div>
                      {/* Location */}
                      <div className="contact_item">
                        <div className="contact_icon-wrapper">
                          <div className="icon-embed-xsmall w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 14C14.206 14 16 12.206 16 10C16 7.794 14.206 6 12 6C9.794 6 8 7.794 8 10C8 12.206 9.794 14 12 14ZM12 8C13.103 8 14 8.897 14 10C14 11.103 13.103 12 12 12C10.897 12 10 11.103 10 10C10 8.897 10.897 8 12 8Z" fill="currentColor" />
                              <path d="M11.42 21.814C11.5892 21.9349 11.792 21.9998 12 21.9998C12.208 21.9998 12.4107 21.9349 12.58 21.814C12.884 21.599 20.029 16.44 20 10C20 5.589 16.411 2 12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.116 21.599 11.42 21.814ZM12 4C15.309 4 18 6.691 18 10.005C18.021 14.443 13.612 18.428 12 19.735C10.389 18.427 5.979 14.441 6 10C6 6.691 8.691 4 12 4Z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          Microtex International<br />
                          D2 06, Saif Zone<br />
                          Sharjah, United Arab Emirates<br />
                          PO BOX 123447
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contact_form-block w-form">
                    <form
                      id="wf-form-Contact-Form"
                      name="wf-form-Contact-Form"
                      data-name="Contact Form"
                      method="get"
                      className="contact_form"
                    >
                      <div className="form-field-2col">
                        <div className="form-field-wrapper">
                          <label htmlFor="Contact-Full-Name" className="field-label">Full Name</label>
                          <input
                            className="form-input w-input"
                            maxLength={256}
                            name="Contact-Full-Name"
                            data-name="Contact-Full-Name"
                            placeholder=""
                            type="text"
                            id="Contact-Full-Name"
                            required
                          />
                        </div>
                        <div className="form-field-wrapper">
                          <label htmlFor="Contact-Company" className="field-label">Company</label>
                          <input
                            className="form-input w-input"
                            maxLength={256}
                            name="Contact-Company"
                            data-name="Contact-Company"
                            placeholder=""
                            type="text"
                            id="Contact-Company"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-field-2col is-mobile-1col">
                        <div className="form-field-wrapper">
                          <label htmlFor="Contact-Email" className="field-label">Email</label>
                          <input
                            className="form-input w-input"
                            maxLength={256}
                            name="Contact-Email"
                            data-name="Contact-Email"
                            placeholder=""
                            type="email"
                            id="Contact-Email"
                            required
                          />
                        </div>
                        <div className="form-field-wrapper">
                          <label htmlFor="Contact-Phone" className="field-label">Phone number</label>
                          <input
                            className="form-input w-input"
                            maxLength={256}
                            name="Contact-Phone"
                            data-name="Contact-Phone"
                            placeholder=""
                            type="tel"
                            id="Contact-Phone"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-field-wrapper">
                        <label htmlFor="Contact-Message" className="field-label">Message</label>
                        <textarea
                          id="Contact-Message"
                          name="Contact-Message"
                          maxLength={5000}
                          data-name="Contact-Message"
                          placeholder="Type your message..."
                          required
                          className="form-input is-text-area w-input"
                        ></textarea>
                      </div>
                      <input
                        type="submit"
                        className="button is-secondary w-button"
                        value="Send inquiry"
                      />
                    </form>
                    <div className="success-message w-form-done">
                      <div className="success-text">Thank you! Your submission has been received!</div>
                    </div>
                    <div id="Contact-error" className="error-message is-contact w-form-fail">
                      <div className="error-text is-contact">
                        Something went wrong when submitting the form. Please check that all required input fields are filled or contact us manually at info@microtex.co. You can find our contact information on the top of this page, on the left side. Thank you
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
