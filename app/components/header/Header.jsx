'use client';

import { useState } from 'react';
import Image from "next/image";
import styles from './Header.module.scss';
import SettingsModal from '../SettingsModal/SettingsModal';

export default function Header({ setTimes }) {
  const [showSettings, setShowSettings] = useState(false);

  const handleConfigClick = () => setShowSettings(true);
  const handleCloseModal = () => setShowSettings(false);

  const handleSaveSettings = (newTimes) => {
    setTimes(newTimes);
    setShowSettings(false);
  };

  return (
    <>
      <header className={`${styles.header} container`}>
        <div className={styles.left}>
          <Image src="/logo.png" alt="Pomofocus" width={30} height={30} />
          <span>Pomofocus</span>
        </div>

        <div className={styles.right}>
          <button className={styles.button}>
            <Image src="/graph.png" alt="Report" width={20} height={20} />
            Report
          </button>
          <button className={styles.button} onClick={handleConfigClick}>
            <Image src="/config.png" alt="Config" width={20} height={20} />
            Config
          </button>
          <button className={styles.button}>
            <Image src="/user.png" alt="Sign in" width={20} height={20} />
            Sign in
          </button>
          <button className={styles.button}>
            <Image src="/three.png" alt="Menu" width={20} height={20} />
          </button>
        </div>
      </header>

      {showSettings && (
        <SettingsModal
          onClose={handleCloseModal}
          onSave={handleSaveSettings}
        />
      )}
    </>
  );
}





