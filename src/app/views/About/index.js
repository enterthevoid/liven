/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { isMobile } from "react-device-detect";

// Styles
import "./styles.scss";

const About = () => {
  return (
    <div className="about">
      <div className={`about-content ${isMobile && "--mobile"}`}>
        <h1>
          Hi, I’m <span>Alexandra Liven (Stets)</span> media artist which mostly
          work with
          <span> photography and design</span>. <span> Contributor</span> of
          Stocksy United. <span> Based</span> in Uzhhorod, Ukraine. 14.12.1995
          borned in Korosten’, Zhytomir region, Ukraine.{" "}
          <span> Exhibition </span>
          2018 - solo exhibition Offline Gallery. Uzhhorod. UA 2018 -
          participant of the exhibition PhotoKyiv. “Phragmentation”. Kyiv. UA
          2019 - participant of the exhibition “Intro” in Ilko Gallery.
          Uzhhorod. UA 2019 - partisipant of the exhibition “Intro” in Museum of
          contemporary Ukrainian art. Lytsk.UA 2020 - participant of exhibition
          “Tell me about silence” ILKO Gallery.Uzhhorod.UA
          <span> Resident</span> in project by CCI and Sorry, room no available,
          Dream Doc 2020.
          <span> Published in</span> book by Periscop.ua ‘Alternative
          Archeology’ .
        </h1>

        <div className="about-contacts-wrapper">
          <div>
            <h1>
              <span>Contact</span>
            </h1>
            <h1>+380994300820</h1>
          </div>
          <div>
            <h1>
              <a href="mailto:lexandraliven@gmail.com">
                lexandraliven@gmail.com
              </a>
            </h1>
            <h1>
              <a
                href="https://www.instagram.com/alexandraliven/"
                target="_blank"
              >
                @alexandraliven
              </a>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
