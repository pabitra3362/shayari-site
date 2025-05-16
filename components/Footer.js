"use client";

import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-primary mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-primary">ShayarSpot</h2>
          <p className="mt-2 text-sm text-primary/70">
            Feel it. Write it. Share it. ❤️
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={`${process.env.NEXT_PUBLIC_BASEURL}`} className="hover:text-primary transition-colors">🏠 Home</Link></li>
            <li><Link href={`${process.env.NEXT_PUBLIC_BASEURL}/pages/shayari`} className="hover:text-primary transition-colors">🧾 Shayaries</Link></li>
            <li><Link href={`${process.env.NEXT_PUBLIC_BASEURL}/pages/submit-shayari`} className="hover:text-primary transition-colors">📝 Submit Shayari</Link></li>
            <li><Link href={`${process.env.NEXT_PUBLIC_BASEURL}/pages/favourites`} className="hover:text-primary transition-colors">🙋 Favourites</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Connect With Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://www.instagram.com/pabitra_m3022?igsh=MWY0bWpjcmg0c29jaQ==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <FaInstagram />
            </a>
            <a href="www.facebook.com/pabitram3022" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/pabitra-mohanty-5b2474332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/pabitra3362" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="border-t border-primary text-center py-4 text-sm text-primary/70">
        © {new Date().getFullYear()} <span className="font-semibold text-primary">ShayarSpot</span>. Made with ❤️ by *Pabitra.*
      </div>
    </footer>
  );
};

export default Footer;
