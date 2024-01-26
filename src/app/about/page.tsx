import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoMdClipboard } from 'react-icons/io';
import Link from 'next/link';
import Image from 'next/image';
import Abu from '../../../public/images/abu.jpg';
import Nurka from '../../../public/images/nurka.jpg';

const About = () => {
  return (
    <section className="mt-14 flex flex-col justify-center items-center ">
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div className="bg-[#243d66] text-3xl py-2 px-6 text-white">
            <p className="whitespace-nowrap font-rockSalt">Abu Raihan</p>
          </div>
          <div className="bg-[#b8b2e6] pt-6 m-4 rounded-full px-4 py-2">
            <Image
              src={Abu}
              alt="Abu Raihan"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="px-28 mb-10 flex flex-col justify-center">
          <h3 className="text-[#243b66] text-2xl font-bold">Our Project</h3>
          <p className="py-2">
            Vidverse is a video sharing platform that allows users to upload,
            view, rate, share, add to playlists, report, and comment on videos.
            The purpose of Vidverse is to allow people to easily upload and
            share videos with others. Vidverse wants to provide a platform for
            people to share their ideas and creativity. Vidverse is for anyone
            who wants to share a video with others. Vidverse is also for anyone
            who wants to find interesting videos to watch.
          </p>
          <div className="mt-6">
            <p className="text-6xl text-[#243b66] font-bold">Meet Our</p>
            <div className="bg-[#c68df9] rounded-md w-1/3">
              <p className="text-white font-bold text-6xl px-2 w-2/6 ">TEAM</p>
            </div>
          </div>
          <p className="pt-4">
            Welcome to our team's space! We are a collaborative group of skilled
            developers, each specializing in distinct areas – from robust
            backend solutions to engaging front-end interfaces and thoughtful
            UI/UX design. Our synergy brings life to innovative projects.
            Explore our collective journey on GitHub, where we showcase our
            collaborative efforts and contributions. Connect with each team
            member individually on LinkedIn to dive into their unique expertise.
            Join us in shaping the digital future through code. Together, we
            make the extraordinary happen
          </p>
        </div>
        <div className="flex flex-col">
          <div className="bg-[#243d66] font-rockSalt text-3xl py-2 px-6 text-white">
            <p className="whitespace-nowrap">Nurgul Kereikhan</p>
          </div>
          <div className="bg-[#b8b2e6] pt-6 m-4 rounded-full px-4 py-2">
            <Image
              src={Nurka}
              alt="Nurka"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-around bg-[#243d66] w-full py-6 px-10">
        <div className="flex gap-4 text-2xl text-white">
          <Link
            href="https://github.com/raihan2bd"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="cursor-pointer" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/raihan2bd/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin
              className="cursor-pointer"
              target="_blank"
              rel="noreferrer"
            />
          </Link>
          <Link href="">
            <IoMdClipboard
              className="cursor-pointer"
              target="_blank"
              rel="noreferrer"
            />
          </Link>
        </div>
        <div className="flex gap-4 text-2xl text-white">
          <Link
            href="https://github.com/NurkaAmre"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="cursor-pointer" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/amre-nurgul/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="cursor-pointer" />
          </Link>
          <Link
            href="https://nurka-portfolio.onrender.com/"
            target="_blank"
            rel="noreferrer"
          >
            <IoMdClipboard className="cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="py-1">
        Copyright © 2024 Vidverse®. All rights reserved.
      </div>
    </section>
  );
};

export default About;
