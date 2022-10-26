import image_1 from "../public/assets/img_1.jpg";
import image_2 from "../public/assets/img_2.jpg";
import image_3 from "../public/assets/img_3.jpg";
import Image from "next/image";

import { gsap } from "gsap";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import { useRef, useEffect, useState } from "react";
import { useLayoutEffect } from "react";

function Slider() {
  const albums = [
    {
      name: "Hotel California",
      title: "사랑의 불시착",
      title_jp: "ダウンタウン",
      image: image_1,
    },
    {
      name: "Our Beloved Summer",
      title: "그 해 우리는",
      title_jp: "その年、私たちは",
      image: image_2,
    },
    {
      name: "Mr.Sunshine",
      title: "미스터 션샤인",
      title_jp: "ミスター・サンシャイン",
      image: image_3,
    },
  ];

  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
  const [activeAlbum, setActiveAlbum] = useState(albums[0].title);

  const [isTweening, setIsTweening] = useState(false);

  const section = useRef();
  let imageList = useRef(null);
  let infoList = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(infoList.children[0], {
        opacity: 1,
        duration: 3,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const textIn = () => {
    setIsTweening(true);
    gsap.from(".quote", {
      opacity: 0,
      y: 50,

      stagger: {
        amount: 0.5,
      },
      ease: "power2.out",
      onComplete: () => {
        setIsTweening(false);
      },
    });
  };

  const slideLeft = (count) => {
    gsap.to(imageList.children[activeAlbumIndex], {
      opacity: 0,
      scale: 1.3,
      duration: 0.4,
      repeat: 1,
      yoyo: true,
    });
    gsap.from(imageList.children[activeAlbumIndex + 1], {
      scale: 1.2,
      duration: 1,
    });

    gsap.to(imageList, {
      x: -460 * count,
      duration: 1,
      ease: "power3.out",
    });
  };
  const slideRight = (count) => {
    gsap.to(imageList.children[activeAlbumIndex], {
      opacity: 0,
      duration: 0.4,
      repeat: 1,
      yoyo: true,
    });
    gsap.from(imageList.children[activeAlbumIndex - 1], {
      scale: 1.2,
      duration: 1,
    });
    gsap.to(imageList, {
      x: -460 * count,
      duration: 1,
      ease: "expo.out",
    });
  };

  const nextSlide = () => {
    let albumLength = albums.length;

    let count = (activeAlbumIndex + 1) % albumLength; // starting from 1
    setActiveAlbumIndex(count);
    setActiveAlbum(albums[count].title);

    // slide image

    slideLeft(count);
    textIn();

    // text animations
    // textOut(count);
  };

  const prevSlide = () => {
    let albumLength = albums.length;

    let count = (activeAlbumIndex + albumLength - 1) % albumLength; // starting from the last

    setActiveAlbumIndex(count);
    setActiveAlbum(albums[count].title);

    // slide image
    slideRight(count);
    textIn();
  };

  //   console.log(
  //     gsap.globalTimeline.getChildren().filter((tween) => tween.isActive())
  //   );

  //   console.log(gsap.globalTimeline.getChildren().length);

  return (
    <section
      ref={section}
      className="section flex flex-col h-screen w-full justify-center items-center after:absolute after:bg-[#f2f2f6] after:w-[50%] after:h-[550px] after:right-0 after:bottom-0 after:opacity-80 after:-z-10"
    >
      <h1 className="text-6xl font-bold mb-[4rem]">Photography</h1>
      <div className="testinonial-container w-[1280px] h-[680px] relative">
        <div
          className={`${
            isTweening ? "hidden" : ""
          } arrows-left absolute top-0 bottom-0 flex justify-center items-center 
          cursor-pointer hover:shadow-[0px_0px_30px_rgba(0,0,80,0.05)] rounded-[8px] w-[100px] duration-300 ease-in-out`}
          onClick={prevSlide}
        >
          <svg className="w-10 h-8">
            <ArrowLeftIcon />
          </svg>
        </div>
        <div className="inner flex  justify-center items-center h-[600px]">
          <div className="t-image outline outline-[0.4rem] outline-offset-[0.3rem] flex overflow-hidden justify-center items-center w-[460px] h-[460px] after:content-[''] after:absolute after:w-[270px] after:h-[270px] after:bg-[#455ff5] after:left-[10px] after:top-0 after:rounded-full after:z-[-9]">
            <ul
              ref={(el) => (imageList = el)}
              className="flex h-[460px] w-[460px] shadow-[0px_0px_40px_rgba(0,0,10,0.25)] "
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
                        alt={`${item.name}_image`}
                        className="h-[460px] w-[460px]"
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="t-content m-5 w-[500px] h-[600px] flex items-center">
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
                        activeAlbum === item.title ? "active" : "hidden"
                      } w-[500px] h-[400px] flex items-center absolute`}
                    >
                      <div className="content-inner ">
                        <p className="quote font-noto items-center justify-center text-2xl tracking-[0.88px] text-[#a09da6]">
                          {item.title}
                        </p>
                        <p className="quote font-bold text-4xl tracking-[0.88px]">
                          {item.name}
                        </p>
                        <p className="quote font-kosugi text-[2.5rem] tracking-[0.88px] mt-3">
                          {item.title_jp}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <button
          type="button"
          className={`${
            isTweening ? "hidden" : ""
          } arrows-right absolute top-0 bottom-0 flex justify-center items-center right-0 cursor-pointer hover:shadow-[0px_0px_30px_rgba(0,0,80,0.05)] 
          rounded-[8px] w-[100px] duration-300 ease-in-out`}
          onClick={nextSlide}
        >
          <svg className="w-10 h-8">
            <ArrowRightIcon />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Slider;
