import image_1 from "../public/assets/img_1.jpg";
import image_2 from "../public/assets/img_2.jpg";
import image_3 from "../public/assets/img_3.jpg";
import Image from "next/image";

import { gsap } from "gsap";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import { useRef, useEffect, useState, useLayoutEffect } from "react";

function Slider() {
  const albums = [
    {
      name: "Crash Landing On You",
      title: "사랑의 불시착",
      image: image_1,
    },
    {
      name: "Our Beloved Summer",
      title: "그 해 우리는",
      image: image_2,
    },
    {
      name: "Mr.Sunshine",
      title: "미스터 션샤인",
      image: image_3,
    },
  ];

  const [activeAlbum, setActiveAlbum] = useState(albums[0].title);
  const section = useRef();
  let imageList = useRef(null);
  let infoList = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(infoList.children[0], {
        opacity: 1,
        duration: 1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {};

  return (
    <section
      ref={section}
      className="section flex flex-col h-screen w-full justify-center items-center after:absolute after:bg-[#f2f2f6] after:w-[50%] after:h-[550px] after:right-0 after:bottom-0 after:opacity-80 after:-z-10"
    >
      <h1 className="text-6xl font-bold mb-[4rem]">Discography</h1>
      <div className="testinonial-container w-[1280px] h-[680px] relative">
        <div className="arrows-left absolute top-0 bottom-0 flex justify-center items-center cursor-pointer hover:shadow-[0px_0px_30px_rgba(0,0,80,0.05)] rounded-[8px] w-[100px] duration-300 ease-in-out">
          <svg className="w-10 h-8">
            <ArrowLeftIcon />
          </svg>
        </div>
        <div className="inner flex justify-center items-center h-[600px] border">
          <div className="t-image justify-center items-center w-[500px] h-[500px] after:content-[''] after:absolute after:w-[250px] after:h-[250px] after:bg-[#3f56da] after:left-[10px] after:top-0 after:rounded-full after:z-[-9]">
            <ul
              ref={(el) => (imageList = el)}
              className="flex absolute h-[460px] w-[460px] shadow-[0px_0px_40px_rgba(0,0,10,0.25)] overflow-hidden"
            >
              {albums &&
                albums.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        activeAlbum === item.title ? "active" : ""
                      } h-[460px] w-[460px]`}
                    >
                      <Image
                        src={item.image}
                        layout="fixed"
                        width={460}
                        height={460}
                        objectFit="cover"
                        loading="lazy"
                        placeholder="blur"
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="t-content w-[500px] h-[600px] flex items-center">
            <ul
              ref={(el) => (infoList = el)}
              className="absolute overflow-hidden w-[500px] h-[400px] "
            >
              {albums &&
                albums.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        activeAlbum === item.title ? "display" : "hidden"
                      } w-[500px] h-[400px] flex items-center absolute opacity-0`}
                    >
                      <div className="content-inner ">
                        <p className="quote items-center justify-center text-2xl tracking-[0.88px] text-[#a09da6]">
                          {item.title}
                        </p>
                        <p className="quote font-bold text-4xl tracking-[0.88px]">
                          {item.name}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="arrows-right absolute top-0 bottom-0 flex justify-center items-center right-0 cursor-pointer hover:shadow-[0px_0px_30px_rgba(0,0,80,0.05)] rounded-[8px] w-[100px] duration-300 ease-in-out">
          <svg className="w-10 h-8">
            <ArrowRightIcon />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Slider;
