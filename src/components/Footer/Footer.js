import React from "react";

function Footer() {
  return (
    <div className="footer">&copy;<span id="year">{new Date().getFullYear()}</span><span> Your Company Name. All rights reserved.</span></div>
  );
}

export default Footer;