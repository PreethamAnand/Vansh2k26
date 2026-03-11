import Image from "next/image";

const topRow = [
  "/moments/moment-1.png",
  "/moments/moment-2.png",
  "/moments/moment-3.png",
  "/moments/moment-4.png",
  "/moments/moment-5.png"
];

const bottomRow = [
  "/moments/moment-3.png",
  "/moments/moment-4.png",
  "/moments/moment-5.png",
  "/moments/moment-1.png",
  "/moments/moment-2.png"
];

function MarqueeRow({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  const loop = [...images, ...images];

  return (
    <div className="moments-track-wrap">
      <div className={reverse ? "moments-track moments-track-reverse" : "moments-track"}>
        {loop.map((src, idx) => (
          <article className="moments-card" key={`${src}-${idx}`}>
            <Image
              src={src}
              alt="Festival moment"
              width={460}
              height={280}
              className="moments-image"
            />
          </article>
        ))}
      </div>
    </div>
  );
}

export default function MomentsMarquee() {
  return (
      <section className="moments-section" aria-label="Moments in time gallery">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <h2 className="moments-title">Moments In Time</h2>
        </div>

        <MarqueeRow images={topRow} />
        <MarqueeRow images={bottomRow} reverse />
      </section>
  );
}