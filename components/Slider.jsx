import Image from "next/image";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import { useState } from "react";

function Slider() {
  const albums = [
    {
      name: "Crash Landing On You",
      title: "사랑의 불시착",
      image: "/assets/img_1.jpg",
    },
    {
      name: "Our Beloved Summer",
      title: "그 해 우리는",
      image: "/assets/img_2.jpg",
    },
    {
      name: "Mr.Sunshine",
      title: "미스터 션샤인",
      image: "/assets/img_3.jpg",
    },
  ];

  const [activeAlbum, setActiveAlbum] = useState(albums[0].title);

  return (
    <section className="section flex flex-col h-screen w-full justify-center items-center">
      <h1 className="text-3xl font-bold my-3">Discography</h1>
      <div className="testinonial-container w-[1280px] h-[680px] relative border ">
        <div className="arrows-left absolute top-0 bottom-0 flex justify-center items-center cursor-pointer">
          <svg className="w-8 h-8">
            <ArrowLeftIcon />
          </svg>
        </div>
        <div className="inner flex justify-center items-center h-[600px]">
          <div className="t-image w-[500px] h-[600px] after:content-[''] after:absolute after:w-[200px] after:h-[200px] after:background-[#3f56da] after:left-[140px] after:top-0 after:rounded-full">
            <ul className="flex absolute border h-[460px] w-[460px]">
              {albums &&
                albums.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        activeAlbum === item.title ? "display" : "hidden"
                      } h-full w-full`}
                    >
                      <Image
                        src={item.image}
                        layout="responsive"
                        width={600}
                        height={600}
                        objectFit="cover"
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="t-content">
          <ul>
            {albums &&
              albums.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`${
                      activeAlbum === item.title ? "display" : "hidden"
                    }`}
                  >
                    <div className="content-inner">
                      <p className="quote">{item.title}</p>
                      <p className="quote font-bold">{item.name}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="arrows-right absolute top-0 bottom-0 flex justify-center items-center right-0 cursor-pointer">
          <svg className="w-8 h-8">
            <ArrowRightIcon />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Slider;
