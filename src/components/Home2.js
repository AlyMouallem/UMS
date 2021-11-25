import React from "react";
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaChevronUp,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { useState } from "react";
import { Redirect } from "react-router";
import { academicsData } from "../academicsData";
import { testimonialsData } from "../testimonialsData";

const Home2 = () => {
  const [state] = useState(JSON.parse(window.localStorage.getItem("auth")));

  return (
    <>
      {state && state.token && <Redirect to="/dashboard" />}

      <section key={Math.random() * 100} id="home" className="intro-section">
        <div className="container">
          <div className="row align-items-center text-white">
            <div className="col-md-6">
              <div className="intros">
                <h1 className="display-2">
                  <span className="display-2--intro"> Welcome to UMS </span>
                  <span className="display-2--description lh-base">
                    A University Management System that has all your needs as a
                    university member
                  </span>
                </h1>
              </div>
            </div>
            <div className="col-md-6 intros text-end">
              <img
                src="./images/school.png"
                alt="Student going to the university"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,128L48,154.7C96,181,192,235,288,256C384,277,480,267,576,234.7C672,203,768,149,864,144C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>

      <section key={Math.random() * 100} id="academics" className="services">
        <div className="container">
          <div className="row text-center">
            <h1 className="display-3 fw-bold">Academics</h1>
            <div className="heading-line mb-1"></div>
            <h4 className="display-6 fw-bold">Schools at our university</h4>
          </div>

          {/* <!-- START THE CONTENT FOR THE SERVICES  --> */}
          <div className="container">
            {academicsData.map(({ title, icon, description, image }) => {
              return (
                <>
                  <div key={Math.random() * 100} className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 services">
                      <div className="services__content">
                        <div className="icon d-block">{icon}</div>
                        <h3 className="display-3--title mt-1">{title}</h3>
                        <p className="lh-lg">
                          {[...description, ".", ...description]}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 services text-end">
                      <div className="services__pic ">
                        <img
                          src={image}
                          alt={`${image} illustration`}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
      {/* <!-- ////////////////////////////////////////////////////////////////////////////////////////////////
                                   START SECTION 5 - THE TESTIMONIALS  
    /////////////////////////////////////////////////////////////////////////////////////////////////////--> */}
      <section
        key={Math.random() * 100}
        id="testimonials"
        className="testimonials "
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,117.3C672,117,768,203,864,202.7C960,203,1056,117,1152,117.3C1248,117,1344,203,1392,245.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <div className="container">
          <div className="row text-center text-white">
            <h1 className="display-3 fw-bold">Testimonials</h1>
            <hr style={{ width: "100px", height: "3px" }} className="mx-auto" />
          </div>

          {/* <!-- START THE CAROUSEL CONTENT  --> */}
          <div className="row align-items-center">
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {/* <!-- CAROUSEL ITEM 1 --> */}
                {testimonialsData.map(
                  (
                    {
                      active,
                      iconLeft,
                      iconRight,
                      quote,
                      rating,
                      picture,
                      name,
                      occupation,
                    },
                    index
                  ) => {
                    return (
                      <div
                        key={(index + 1) * Math.random() * 87}
                        className={
                          active ? "carousel-item active" : "carousel-item"
                        }
                      >
                        <div className="testimonials__card">
                          <p className="lh-lg">
                            {iconLeft}
                            {quote}
                            {iconRight}
                          </p>
                          <div className="ratings p-1">{rating}</div>
                        </div>
                        <div className="testimonials__picture mt-3">
                          <img
                            className="rounded-circle img-fluid"
                            src={picture}
                            alt={`Client ${index + 1} picture`}
                          />
                        </div>
                        <div className="testimonials__name">
                          <h3>{name}</h3>
                          <p className="fw-light">{occupation}</p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="text-center mb-2">
                <button
                  className="btn btn-outline-light "
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <FaLongArrowAltLeft />
                </button>
                <button
                  className="btn btn-outline-light"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <FaLongArrowAltRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*   
        THE FOOTER  
      */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="row">
            {/* <!-- CONTENT FOR THE MOBILE NUMBER  --> */}
            <div className="col-md-4 col-lg-4 contact-box pt-1 d-md-block d-lg-flex d-flex">
              <div className="contact-box__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-phone-call"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                  <path d="M15 7a2 2 0 0 1 2 2" />
                  <path d="M15 3a6 6 0 0 1 6 6" />
                </svg>
              </div>
              <div className="contact-box__info">
                <a href="#" className="contact-box__info--title">
                  +961 71234567
                </a>
                <p className="contact-box__info--subtitle"> Mon-Fri 9am-6pm</p>
              </div>
            </div>
            {/* <!-- CONTENT FOR EMAIL  --> */}
            <div className="col-md-4 col-lg-4 contact-box pt-1 d-md-block d-lg-flex d-flex">
              <div className="contact-box__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mail-opened"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="3 9 12 15 21 9 12 3 3 9" />
                  <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                  <line x1="3" y1="19" x2="9" y2="13" />
                  <line x1="15" y1="13" x2="21" y2="19" />
                </svg>
              </div>
              <div className="contact-box__info">
                <a href="#" className="contact-box__info--title">
                  info@myums.com
                </a>
                <p className="contact-box__info--subtitle">Online Support</p>
              </div>
            </div>
            {/* <!-- CONTENT FOR LOCATION  --> */}
            <div className="col-md-4 col-lg-4 contact-box pt-1 d-md-block d-lg-flex d-flex">
              <div className="contact-box__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-map-2"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="18" y1="6" x2="18" y2="6.01" />
                  <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
                  <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
                  <line x1="9" y1="4" x2="9" y2="17" />
                  <line x1="15" y1="15" x2="15" y2="20" />
                </svg>
              </div>
              <div className="contact-box__info">
                <a href="#" className="contact-box__info--title">
                  Bekaa, Lebanon
                </a>
                <p className="contact-box__info--subtitle">Kabelias</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- START THE SOCIAL MEDIA CONTENT  --> */}
        <div className="footer-sm" style={{ backgroundColor: "#212121" }}>
          <div className="container">
            <div className="row py-4 text-center text-white">
              <div className="col-lg-5 col-md-6 mb-2 mb-md-0">
                Connect with us on social media
              </div>
              <div className="col-lg-7 col-md-6">
                <a href="https://www.facebook.com">
                  <i>
                    <FaFacebook />
                  </i>
                </a>
                <a href="https://www.twitter.com">
                  <i>
                    <FaTwitter />
                  </i>
                </a>
                <a href="https://www.github.com">
                  <i>
                    <FaGithub />
                  </i>
                </a>
                <a href="https://www.linkedin.com">
                  <i>
                    <FaLinkedin />
                  </i>
                </a>
                <a href="https://www.instagram.com">
                  <i>
                    <FaInstagram />
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <div className="row text-white justify-content-center mt-2 pb-2">
            <div className="col-12 col-sm-6 col-lg-6 mx-auto">
              <div className="text-capitalize text-black fw-bold ">
                My University
              </div>
              <hr
                className="bg-white d-inline-block mb-4"
                style={{ width: "60px", height: "2px" }}
              />
              <p className="lh-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                ex obcaecati blanditiis reprehenderit ab mollitia voluptatem
                consectetur?
              </p>
            </div>

            <div className="col-12 col-sm-6 col-lg-2 mb-3 mx-auto">
              <div className="text-capitalize text-black fw-bold">
                Useful links
              </div>
              <hr
                className="bg-white d-inline-block mb-3"
                style={{ width: "60px", height: "2px" }}
              />
              <ul className="list-inline campany-list">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* <!-- BACK TO TOP BUTTON  --> */}
      <a href="#" className="shadow btn-primary rounded-circle back-to-top">
        <i>
          <FaChevronUp />
        </i>
      </a>
    </>
  );
};

export default Home2;
