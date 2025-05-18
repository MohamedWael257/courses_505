"use client";

import React, { useState } from "react";
import Teleport from "../Teleport/Teleport";
import PlayVideos from "./PlayVideos";
import Image from "next/image";
import AppModal from "../CustomModal/AppModal";

const PlayVideo = ({ src }: any) => {
  const [openModal, setOpenModal] = useState(false);
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
          <AppModal
            onCancel={() => setOpenModal(false)}
            isModalVisible={openModal}
            centered
          >
            <PlayVideos src={src} />
          </AppModal>
        </Teleport>
      )}
    </>
  );
};

export default PlayVideo;
