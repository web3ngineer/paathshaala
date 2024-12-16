import { School } from "lucide-react";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <div
      className={`${
        "dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-800"
      } transition-all`}
    >
      <div className="max-w-screen-xl p-10 mx-auto">
        <div className="flex flex-col gap-2 md:flex-row ">
        <div className="flex items-center gap-2">
        <School size={"30"} className="text-blue-600" />
        <h3 className="text-3xl font-extrabold">
            Paathshaala
        </h3>
        </div>
        <h3 className="text-3xl font-extrabold text-blue-600">| Learn Your Way</h3>
        </div>
        
        <p className="items-center mt-2 text-sm">
          Empowering learners to achieve their goals, one course at a time.
        </p>
        <footer className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          <nav>
            <h6 className="mb-2 text-lg font-semibold">Explore</h6>
            <a className="block transition-colors hover:text-blue-600">
              Browse Courses
            </a>
            <a className="block transition-colors hover:text-blue-600">
              Teach on Paathshaala
            </a>
            <a className="block transition-colors hover:text-blue-600">
              Student Reviews
            </a>
            <a className="block transition-colors hover:text-blue-600">
              Corporate Training
            </a>
          </nav>
          <nav>
            <h6 className="mb-2 text-lg font-semibold">Company</h6>
            <a className="block transition-colors hover:text-blue-600">
              About Us
            </a>
            <a className="block transition-colors hover:text-blue-600">
              Careers
            </a>
            <a className="block transition-colors hover:text-blue-600">
              Privacy Policy
            </a>
            <a className="block transition-colors hover:text-blue-600">
              Terms of Service
            </a>
          </nav>
          <nav>
            <h6 className="mb-2 text-lg font-semibold">Support</h6>
            <a className="block transition-colors hover:text-blue-600">
              Help Center
            </a>
            <a className="block transition-colors hover:text-blue-600">
              FAQs
            </a>
            <a className="block transition-colors hover:text-blue-600">
              Payment Methods
            </a>
            <a className="block transition-colors hover:text-blue-600">
              Contact Us
            </a>
          </nav>
          <nav>
            <h6 className="mb-2 text-lg font-semibold">Stay Updated</h6>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 text-black rounded-md"
              />
              <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Subscribe
              </button>
              <p className="text-sm">
                Sign up to get updates on the latest courses and exclusive
                offers.
              </p>
            </div>
          </nav>
        </footer>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-blue-600" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-600" aria-label="YouTube">
              <FaYoutube size={24} />
            </a>
            <a href="#" className="hover:text-blue-600" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="hover:text-blue-600" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
      <footer className="flex justify-center py-4 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200">
        <div className="max-w-screen-xl mx-auto text-center text-black dark:text-white">
          <p className="text-xs">© 2024 Paathshaala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
