import { motion, useScroll, useTransform } from "framer-motion";
import { useContext, useRef } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import SVGWave from "./svg/wave";
import UnderlineText from "../../../../components/underlineText";

function Header() {
  const {
    home: { header },
  } = useContext(ConfigContext)!;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: scrollTargetRef });

  const buttonScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.1, 1.15, 1]);
  const buttonRotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 2, -2, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 1, 0.8, 0.6]);
  const glowSize = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [10, 25, 20, 10]);

  return (
    <section id={header.id}>
      <div ref={containerRef} className="max-w-screen-lg mx-auto py-4 px-4 md:py-16">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1 items-center md:items-start md:h-[100vh]">
            <div className="static top-40 flex flex-col prose justify-center py-8 md:sticky h-[548px]">
              <motion.h2
                initial={{ opacity: 0, rotateZ: -10 }}
                animate={{ opacity: 1, rotateZ: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mt-0 mb-4 text-4xl md:text-6xl"
              >
                {header.headline}{" "}
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
                  transition={{ delay: 0.6, duration: 1, repeat: 1, repeatType: "mirror", ease: "easeInOut" }} // h2のアニメーション後
                  style={{ display: "inline-block" }}
                >
                  {header.hand}
                </motion.span>
              </motion.h2>

              {/* LCPに大きく関わる要素 */}
              <motion.p
                // LCP改善のため、初期状態で表示されるように変更
                // x軸のアニメーションは削除し、フェードインのみに。遅延を大幅に短縮。
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, ease: "easeInOut", duration: 0.3 }} // 遅延を極力小さく
                className="whitespace-pre-wrap text-left m-0 my-1 max-w-md md:text-lg md:max-w-lg text-gray-900"
              >
                {header.place}で毎週{" "}
                {header.businessDays.map((day, index) => {
                  const [label, time] = Object.entries(day)[0];
                  return (
                    <span key={label}>
                      <UnderlineText
                        text={`${label}（${time}）`}
                        // LCP改善のため、アンダーラインアニメーションの遅延を大幅に短縮
                        initial={{ scaleX: 0 }} // アンダーラインは初期非表示
                        whileInView={{ scaleX: 1 }} // viewportに入ったらアニメーション
                        // 親要素の表示が早まるため、それに合わせて遅延を調整
                        transition={{ duration: 0.25, ease: "easeOut", delay: 0.2 + index * 0.1 }} // 大幅に短縮
                        className="mr-1"
                        markerClassName="bg-blue-200"
                      />
                      {index === 0 && header.businessDays.length > 1 ? "と" : ""}
                    </span>
                  );
                })}
                に開催中！
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                // pタグの表示に合わせて遅延を調整
                transition={{ delay: 0.2 }}
                className="list-none flex gap-4 m-0 p-0"
              >
                {/* List items here */}
              </motion.ul>
            </div>
          </div>

          <div ref={scrollTargetRef} className="min-h-[100vh]">
            <div className="flex justify-center sticky top-28 md:top-40">
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                // この要素の遅延も少し早める
                transition={{ type: "spring", stiffness: 200, mass: 0.4, duration: 0.5, delay: 0.15 }}
                className="flex items-center justify-center h-[548px] 2xs:h-[720px] sm:h-[648px] md:h-[548px] rounded-[3rem]"
              >
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    opacity: glowOpacity,
                    filter: `blur(${glowSize}px)`,
                  }}
                />

                <motion.div
                  style={{ scale: buttonScale, rotate: buttonRotate }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    aria-label="資料を見る"
                    className="relative btn btn-primary btn-lg px-8 py-2 text-lg font-bold rounded-full overflow-hidden active:bg-primary"
                    onClick={() => {
                      const el = document.getElementById("pricing");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white drop-shadow-lg">資料を見る</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <SVGWave/>
    </section>
  );
}

export default Header;
