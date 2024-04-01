import React, { useState } from "react";
import quiz from "../assets/quiz-logo.png";

const Header = () => {
  return (
    <header>
      <img src={quiz} alt="Logo" />
      <h1>ReactQuizz</h1>
    </header>
  );
};

export default Header;
