"use client"

import AnimatedText from "../../../../components/animatedText";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

function Pricing() {
  const {
    home: { pricing },
  } = useContext(ConfigContext)!;
  
  if (!pricing) return null;

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id={pricing.id}
      className="overflow-hidden max-w-screen-lg mx-auto px-4 py-16"
    >
      <div className="mb-12 max-w-none flex flex-col items-center prose prose-lg text-center">
        <h1 className="mb-0">
          <AnimatedText text={pricing.title} />
        </h1>
        <motion.p
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 0.7 }}
          viewport={{ once: true }}
          className="text-xl max-w-lg"
        >
          {pricing.subtitle}
        </motion.p>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col max-w-none gap-8 md:flex-row md:justify-center"
      >
        {pricing.plans?.map((plan, index) => (
          <motion.div
            key={index}
            transition={{ delay: 0.25 + index * 0.25 }}
            className="md:w-1/3 flex relative"
            variants={{
              hidden: { x: "-100%", opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            <div
              className="border-2 border-primary/30 flex-1 card shadow-md bg-base-100 overflow-hidden">
              <div className="card-body p-0 text-center">
                <div className="relative">
                  <div className={clsx("p-4 pt-4 bg-primary/10")}>
                    <img
                      src={plan.image}
                      alt="pricing plan"
                      loading="lazy"
                      className="m-0 h-16 w-auto object-contain mx-auto"
                    />
                  </div>
                </div>
                
                <div className="px-6 pt-4">
                  <div className="text-xl font-bold">{plan.title}</div>
                </div>
                
                <div className="px-6 py-3">
                  <div className="text-3xl font-bold text-primary">
                    <span className="text-4xl">{plan.price}</span>
                  </div>
                </div>
                
                <div className="w-full flex-1 flex flex-col px-6 mb-4">
                  {plan.rows.map((row, rowIndex) => {   
                    const highlightRow = rowIndex === 0;       
                    return (
                      <div 
                        key={rowIndex} 
                        className={clsx(
                          "flex relative items-start py-2",
                          highlightRow ? "" : "text-black/70"
                        )}
                      >
                        <span className={clsx(
                          "relative flex h-3 w-3 mt-1.5 mr-3",
                          highlightRow  ? "" : "opacity-50"
                        )}>
                          {highlightRow  && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          )}
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${highlightRow ? 'bg-primary' : 'bg-black/50'}`}></span>
                        </span>
                        <p className="flex-1 text-left my-0">{row}</p>
                      </div>
                    );
                  })}
                </div>
                
                {pricing.actionText && (
                  <div className="w-full mt-auto p-4">
                    <button
                      onClick={scrollToContact}
                      className="btn btn-primary text-white w-full text-lg h-auto py-4"
                    >
                      {pricing.actionText}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Pricing;
