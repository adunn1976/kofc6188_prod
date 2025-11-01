/* import Image from "next/image"

export default function Hero({ title, image }: { title: string; image: any }) {
  return (
    <div className="relative w-full h-[400px]">
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover brightness-75"
        />
      )}
      <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
        {title}
      </h1>
    </div>
  )
} */

/* import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

export default function Hero({ data }: { data: any }) {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center">
      {data.heroImage && (
        <Image
          src={urlFor(data.heroImage).width(1600).url()}
          alt={data.title || "Homepage hero image"}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p className="text-lg mt-2">{data.heroText}</p>
      </div>
    </section>
  );
} */

import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

type HeroProps = {
  title?: string;
  image?: any;
};

export default function Hero({ title, image }: HeroProps) {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center">
      {image && (
        <Image
          src={urlFor(image).width(1600).url()}
          alt={title || "Homepage hero image"}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute text-white text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </section>
  );
}


