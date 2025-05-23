// import { motion, useScroll, useTransform } from "framer-motion";
import { /* motion, */ useContext, useRef } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import SVGWave from "./svg/wave";
import UnderlineText from "../../../../components/underlineText";

function Header() {
  const {
    home: { header },
  } = useContext(ConfigContext)!;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  // const { scrollYProgress } = useScroll({ target: scrollTargetRef });
  // const buttonScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.1, 1.15, 1]);
  // const buttonRotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 2, -2, 0]);
  // const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 1, 0.8, 0.6]);
  // const glowSize = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [10, 25, 20, 10]);

  return (
    <section id={header.id}>
      <div ref={containerRef} className="max-w-screen-lg mx-auto py-4 px-4 md:py-16">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1 items-center md:items-start md:h-[100vh]">
            <div className="static top-40 flex flex-col prose justify-center py-8 md:sticky h-[548px]">
              {/* 見出しやテキストのアニメーションは残す場合は motion のままにしてください */}
              <h2 className="mt-0 mb-4 text-4xl md:text-6xl">
                {header.headline} <span>{header.hand}</span>
              </h2>

              <p className="whitespace-pre-wrap text-left m-0 my-1 max-w-md md:text-lg md:max-w-lg text-gray-900">
                {header.place}で毎週{" "}
                {header.businessDays.map((day, index) => {
                  const [label, time] = Object.entries(day)[0];
                  return (
                    <span key={label}>
                      <UnderlineText
                        text={`${label}（${time}）`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                        className="mr-1"
                        markerClassName="bg-blue-200"
                      />
                      {index === 0 && header.businessDays.length > 1 ? "と" : ""}
                    </span>
                  );
                })}
                に開催中！
              </p>

              <ul className="list-none flex gap-4 m-0 p-0">
                {/* List items here */}
              </ul>
            </div>
          </div>

          <div ref={scrollTargetRef} className="min-h-[100vh]">
            <div className="flex justify-center sticky top-28 md:top-40">
              {/* motion を外して通常の div に */}
              <div className="flex items-center justify-center h-[548px] 2xs:h-[720px] sm:h-[648px] md:h-[548px] rounded-[3rem] relative">
                {/* グロー要素もコメントアウトするなら以下 */}
                {/*
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    opacity: glowOpacity.get(), // コメントアウト済みなので実際には動作しません
                    filter: `blur(${glowSize.get()}px)`,
                  }}
                />
                */}
                <div>
                  <button
                    aria-label="資料を見る"
                    className="relative btn btn-primary btn-lg px-8 py-2 text-lg font-bold rounded-full overflow-hidden active:bg-primary"
                    onClick={() => {
                      window.open("/pcnshibuya.pdf", "_blank");
                    }}
                  >
                    <span className="text-white drop-shadow-lg">資料を見る</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SVGWave />
    </section>
  );
}

export default Header;
