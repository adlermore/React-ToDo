import React from "react";

function Footer() {
  return (
    <div className="footer">&copy;<span id="year">{new Date().getFullYear()}</span><span> Armorbita. All rights reserved.</span></div>
  );
}

export default Footer;