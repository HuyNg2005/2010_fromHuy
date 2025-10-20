'use client';

import { motion, AnimatePresence, Variants, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import Image from 'next/image';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';

export default function Home() {
  const [submittedWish, setSubmittedWish] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const sampleWishes = [
    'Chúc bạn ngày 20/10 ngập tràn niềm vui và hạnh phúc! ✨',
    'Gửi đến bạn - người phụ nữ tuyệt vời: Hãy luôn mạnh mẽ và tỏa sáng! 💖',
    'Chúc bạn ngày 20/10 thật rực rỡ như những đóa hoa! 🌸',
    'Hãy luôn xinh đẹp, tự tin và hạnh phúc nhé! 🌟',
    'Chúc bạn một ngày 20/10 đầy bất ngờ và yêu thương! 🎉',
    'Bạn xứng đáng với những điều tốt đẹp nhất! 💐',
  ];

  const getRandomWish = () => sampleWishes[Math.floor(Math.random() * sampleWishes.length)];

  const handleClick = () => {
    setSubmittedWish(getRandomWish());
    setShowConfetti(true);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring' as const, stiffness: 100 },
    },
  };

  const wishVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: 'spring' as const, stiffness: 120 },
    },
  };

  const handVariants: Variants = {
    hidden: { opacity: 0, scale: 0.7, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, type: 'spring' as const, stiffness: 150 },
    },
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-rose-200 via-violet-200 to-sky-200 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden">
        {showConfetti && !shouldReduceMotion && (
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={100}
                gravity={0.1}
            />
        )}

        <title>Chúc Mừng 20/10</title>
        <meta name="description" content="Gửi lời chúc 20/10 đến tất cả những người phụ nữ tuyệt vời!" />

        {/* Main Content */}
        <motion.div
            className="text-center max-w-md sm:max-w-2xl z-10 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          <motion.h1
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-rose-600 mb-3 sm:mb-4 tracking-tight"
              variants={itemVariants}
          >
            Chúc Mừng 20/10
          </motion.h1>
          <motion.p
              className="text-sm sm:text-base md:text-xl text-gray-700 mb-4 sm:mb-6 font-medium px-2"
              variants={itemVariants}
          >
            Tôn vinh những người phụ nữ tuyệt vời ở mọi lứa tuổi!
          </motion.p>

          {/* Wish Button Section */}
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <Button
                asChild
                className="px-5 py-2 sm:px-6 sm:py-3 bg-rose-500 hover:bg-rose-600 text-white text-sm sm:text-base rounded-full shadow-md transition-all duration-200"
                onClick={handleClick}
            >
              <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                Nhận Lời Chúc Đặc Biệt!
              </motion.button>
            </Button>
          </motion.div>

          {/* Display Wish with Pointing Hand */}
          <AnimatePresence>
            {submittedWish && (
                <motion.div
                    variants={wishVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="mt-3"
                >
                  <motion.div
                      variants={handVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex justify-center mb-2"
                  >
                    <Image
                        src="/images/chitay.png"
                        alt="Pointing hand"
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                  </motion.div>
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg w-full max-w-sm mx-auto">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl text-rose-500 text-center">Lời Chúc Yêu Thương</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <motion.p
                          className="text-sm sm:text-base text-gray-700 italic text-center"
                          animate={shouldReduceMotion ? {} : { opacity: [0.7, 1, 0.7], transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' } }}
                      >
                        "{submittedWish}"
                      </motion.p>
                    </CardContent>
                  </Card>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Falling Flowers Animation */}
        {!shouldReduceMotion && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                  <motion.div
                      key={i}
                      className="absolute text-lg sm:text-xl"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: '-10%',
                      }}
                      animate={{
                        y: ['-10%', '110%'],
                        opacity: [0.3, 0.8, 0],
                      }}
                      transition={{
                        duration: 5 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'easeInOut',
                      }}
                  >
                    {['🌸', '🌷', '🌺', '🌹'][Math.floor(Math.random() * 4)]}
                  </motion.div>
              ))}
            </div>
        )}
      </div>
  );
}