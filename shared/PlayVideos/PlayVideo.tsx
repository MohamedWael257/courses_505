'use client';

import React, { useState } from 'react';
import Teleport from '../Teleport/Teleport';
import MainModal from '../CustomModal/MainModal';
import { useTranslations } from 'next-intl';
import PlayVideos from './PlayVideos';
import Image from 'next/image';

const PlayVideo = ({ src }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const t = useTranslations();
  return (
    <>
      <Image
        onClick={() => setOpenModal(true)}
        // data-fancybox="gallery"
        width={150}
        height={280}
        src={src}
        alt="img"
        className="w-full h-72 rounded-lg object-cover cursor-pointer"
      />
      {openModal && (
        <Teleport to="body">
          <MainModal
            presist={true}
            closeBtn={true}
            close={() => setOpenModal(false)}
          >
            <PlayVideos src={src} />
          </MainModal>
        </Teleport>
      )}
    </>
  );
};

export default PlayVideo;
