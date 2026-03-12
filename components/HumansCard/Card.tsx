import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import {
  LinkedInLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

interface HumanCardProps {
  name: string;
  role?: string;
  image: ImageProps["src"];
  linkedin?: string;
  twitter?: string;
  github?: string;
  behance?: string;
}

export default function HumanCard({
  name,
  role,
  image,
  linkedin,
  twitter,
  github,
  behance
}: HumanCardProps) {
  return (
    <div className="w-full max-w-[300px] flex flex-col gap-3">
      <div className=" relative
  w-full
  aspect-square
  rounded-2xl
  bg-white
  overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-[0.25em] items-start pl-1">
        {role && (
          <p
            className="
              text-[#777777] font-Poppins text-sm sm:text-base font-semibold leading-[140%]
            "
          >
            {role}
          </p>
        )}
        <p
          className="
            text-white font-Kanit text-xl sm:text-2xl font-semibold leading-[140%]
          "
        >
          {name}
        </p>
        <div className="flex gap-[0.5em] items-start text-[#777777]">
          {linkedin && (
            <Link href={linkedin} target="_blank">
              <LinkedInLogoIcon className="w-[1em] h-[1em]" />
            </Link>
          )}
          {twitter && (
            <Link href={twitter} target="_blank">
              <TwitterLogoIcon className="w-[1em] h-[1em]" />
            </Link>
          )}
          {github && (
            <Link href={github} target="_blank">
              <GitHubLogoIcon className="w-[1em] h-[1em]" />
            </Link>
          )}
          {behance && (
            <Link href={behance} target="_blank">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-[1em] h-[1em] fill-current"
              >
                <path d="M8.24 10.6c.79 0 1.5-.12 1.5-1.08 0-.82-.57-1.06-1.31-1.06H6.04v2.14H8.24zM8.38 15.54c.9 0 1.63-.27 1.63-1.31 0-1.01-.68-1.28-1.56-1.28H6.04v2.59h2.34zM15.74 10.42c-1.44 0-1.85 1.15-1.91 1.88h3.72c-.11-.76-.47-1.88-1.81-1.88zM15.87 16.01c1.04 0 1.55-.56 1.78-1.04h1.98c-.63 1.93-2.18 2.57-3.82 2.57-2.58 0-4.17-1.74-4.17-4.22 0-2.37 1.54-4.36 4.1-4.36 2.75 0 4.06 2.31 3.9 4.87h-5.81c.06 1.3.69 2.18 2.04 2.18zM14.22 7.34h3.36v.82h-3.36v-.82zM2.5 5.5h6.41c1.55 0 3.16.44 3.16 2.48 0 1.02-.53 1.73-1.45 2.11 1.3.3 1.98 1.36 1.98 2.68 0 2.15-1.82 3.09-3.73 3.09H2.5V5.5z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
