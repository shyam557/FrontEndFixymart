"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import PhoneLoginComponent from "./PhoneLogin";
import OtpVerify from "./OtpVerify";








function PhoneLogIn() {
   const [confirm, setConfirm] = useState(null);

  return (
    <div>
      {!confirm ? (
        <PhoneLoginComponent setConfirm={setConfirm} />
      ) : (
        <OtpVerify confirm={confirm} />
      )}
    </div>
  );
}



export default PhoneLogIn;
