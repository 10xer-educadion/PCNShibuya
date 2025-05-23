import { useState, useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ConfigContext } from '../../../../utils/configContext';
import AnimatedText from '../../../../components/animatedText';

const reCAPTCHASiteKey = '6Lf_DkQrAAAAAL0SpMEwLJ98ag4xqb2t1pv_sIUV';
const ssgFormURL = 'https://ssgform.com/s/em8Uz7K8Yx7Q';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

function Contact() {
  const {
    home: { contact },
  } = useContext(ConfigContext)!;
  if (!contact) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${reCAPTCHASiteKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('success') === 'true') {
      setSubmitted(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = await window.grecaptcha.execute(reCAPTCHASiteKey, { action: "submit_form" });
      if (tokenRef.current) {
        tokenRef.current.value = token;
      }
      if(formRef.current?.reportValidity()) {
        formRef.current?.submit();
      }
    } catch (error: any) {
      console.error('送信エラー:');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id={contact.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="max-w-screen-lg mx-auto px-4 -mb-6 md:-mb-10 lg:-mb-14"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center pt-6 pb-12">
        <AnimatedText text="お問合せ" />
      </h1>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ mass: 0.4, type: "spring", duration: 0.2 }}
      >
        <div className="flex-1 flex flex-col items-center justify-center min-h-full">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card bg-base-100 border-2 border-primary/30 p-6 rounded-lg max-w-md mx-auto text-center"
            >
              <h2 className="text-primary font-bold text-xl mb-2">送信ありがとうございました。</h2>
              <p className="text-primary-content">追ってご連絡いたします。</p>
            </motion.div>
          ) : (
            <motion.form
              ref={formRef}
              action={ssgFormURL}
              method="POST"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-6 w-full max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-lg border-2 border-primary/30"
            >
              <input
                type="text"
                name="name"
                placeholder={contact.form.name}
                value={formData.name}
                onChange={handleChange}
                required
                className={`input input-bordered w-full bg-white text-black rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
              />
              <input
                type="email"
                name="email"
                placeholder={contact.form.email}
                value={formData.email}
                onChange={handleChange}
                required
                className={`input input-bordered w-full bg-white text-black rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
              />
              <textarea
                name="message"
                placeholder={contact.form.message}
                value={formData.message}
                onChange={handleChange}
                required
                className={`textarea textarea-bordered w-full bg-white text-black rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                rows={5}
              />
              <input type="hidden" name="g-recaptcha-response" ref={tokenRef} />
              <button
                type="submit"
                className="btn btn-primary text-white w-full text-lg h-auto py-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "送信中..." : "送信する"}
              </button>
            </motion.form>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Contact;
