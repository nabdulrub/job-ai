import React from "react";
import NewsletterForm from "../NewsletterForm";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full bg-black text-white flex flex-col items-center justify-center p-16 text-center gap-4 mt-8">
      <div>
        <h2 className="text-2xl">Job AI</h2>
        <h2 className="mt-4">We are consistently adding new features!</h2>
        <p>Sign up for our newsletter to recieve emails about new features!</p>
      </div>
      <div className="w-full max-w-[400px]">
        <NewsletterForm />
      </div>
      <span className="w-full bg-white h-[1px] mt-12"></span>
      <div className="flex md:flex-row flex-col w-full text-gray-400 justify-between items-center mt-4">
        <p>© 2023 Job AI. All rights reserved.</p>
        <ul className="flex gap-4 ">
          <li>Terms</li>
          <li>Privacy</li>
          <li>Cookies</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
