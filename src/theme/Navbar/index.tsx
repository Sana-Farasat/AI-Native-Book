import React, { JSX } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
//import { useLocation } from '@docusaurus/router';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import styles from './Navbar.module.css';

function Navbar(): JSX.Element {
  //const location = useLocation();
  //const currentLang = location.pathname.startsWith('/ur') ? 'ur' : 'en';

  return (
    <nav className={clsx('navbar', 'navbar--fixed-top', styles.navbar)}>
      <div className="navbar__inner">
        {/* Left Side - Logo + Title */}
        <div className="navbar__items">
          <div className="navbar__brand">
            <Link className={styles.logoLink} to={useBaseUrl('/')}>
              <img
                src={useBaseUrl('/img/book.webp')}
                alt="Logo"
                className={styles.logoImg}
              />
              <strong className={styles.title}>
                AI Robotics 
              </strong>
            </Link>
          </div>

          {/* Desktop Menu Items */}
          <div className={styles.desktopMenu}>
            <NavbarItem type="docSidebar" sidebarId="tutorialSidebar" label="Read Book" />
            {/* <NavbarItem to="/docs/hardware-guide" label="Hardware Guide" /> */}
            {/* <NavbarItem to="/docs/chatbot" label="RAG Chatbot" /> */}
          </div>
        </div>

        {/* Right Side - Language + GitHub + Theme */}
        <div className="navbar__items navbar__items--right">
          {/* Language Switcher with Icon */}
          {/* <div className={styles.languageDropdown}>
            <button className={styles.languageButton}>
              {currentLang === 'ur' ? 'اردو' : 'English'}
            </button>
            <div className={styles.languageMenu}>
              <Link to="/" className={styles.languageItem}>English</Link>
              <Link to="/ur/" className={styles.languageItem}>اردو</Link>
            </div>
          </div> */}

          {/* GitHub */}
          <NavbarItem
            href="https://github.com/your-username/physical-ai-and-humanoid-robotics-textbook"
            label="GitHub"
            className={styles.githubLink}
          />

          {/* Theme Toggle */}
          <NavbarColorModeToggle className={styles.themeToggle} />
        </div>
      </div>

      {/* Mobile Hamburger */}
      {/* <MobileSidebarToggle /> */}
    </nav>
  );
};

export default Navbar;

// import React, { JSX } from 'react';
// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useBaseUrl from '@docusaurus/useBaseUrl';
// import NavbarItem from '@theme/NavbarItem';
// import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
// import styles from './Navbar.module.css';
// import LocaleDropdown from '@theme/NavbarItem/LocaleDropdownNavbarItem';


// function Navbar(): JSX.Element {
//   return (
//     <nav className={clsx('navbar', 'navbar--fixed-top', styles.navbar)}>
//       <div className="navbar__inner">
//         {/* Left Side */}
//         <div className="navbar__items">
//           <div className="navbar__brand">
//             <Link className={styles.logoLink} to={useBaseUrl('/')}>
//               <img
//                 src={useBaseUrl('/img/book.webp')}
//                 alt="Logo"
//                 className={styles.logoImg}
//               />
//               <strong className={styles.title}>AI Robotics</strong>
//             </Link>
//           </div>

//           <div className={styles.desktopMenu}>
//             <NavbarItem
//               type="docSidebar"
//               sidebarId="tutorialSidebar"
//               label="Read Book"
//             />
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="navbar__items navbar__items--right">
//           {/* ✅ Correct Language Switch */}
//           {/* <NavbarItem type="localeDropdown" /> */}
//           <LocaleDropdown dropdownItemsBefore={[]} dropdownItemsAfter={[]} items={[]} />

//           <NavbarItem
//             href="https://github.com/your-username/physical-ai-and-humanoid-robotics-textbook"
//             label="GitHub"
//           />

//           <NavbarColorModeToggle />
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




