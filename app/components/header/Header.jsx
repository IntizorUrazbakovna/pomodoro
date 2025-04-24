'use client';

import { useState } from 'react';
import Image from "next/image";
import styles from '../header/Header.scss'; // SCSS fayling ishlatilsa





export default function Header() {
  const [showSettings, setShowSettings] = useState(false);

  const handleConfigClick = () => setShowSettings(true);
  const handleCloseModal = () => setShowSettings(false);



  return (
    <>
      <header className="header container">
        <div className="logo">
          <span className="check">
            <Image src="/logo.png" alt="Logo" width={20} height={20} />
          </span>
          <h3 className="text">Pomofocus</h3>
        </div>

        <div className="actions">
          <ul className="nav-menu-list">
            <li className="nav-menu-item">
              <Image src="/graph.png" alt="Graph" width={16} height={16} />
              <p className="item-text">Report</p>
            </li>

            <li className="nav-menu-item" onClick={handleConfigClick} style={{ cursor: 'pointer' }}>
              <Image src="/config.png" alt="Config" width={16} height={16} />
              <p className="item-text">Config</p>
            </li>

            <li className="nav-menu-item">
              <Image src="/user.png" alt="User" width={16} height={16} />
              <p className="item-text">Sign In</p>
            </li>

            <li className="nav-menu-item">
              <Image src="/three.png" alt="More" width={16} height={16} />
            </li>
          </ul>
        </div>
      </header>

 
    </>
  );
}


