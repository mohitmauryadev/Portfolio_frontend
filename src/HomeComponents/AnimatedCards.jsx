import React from "react";
import { motion } from "framer-motion";

const bubbles = [
  { src: "https://st2.depositphotos.com/1004174/7566/i/450/depositphotos_75664411-stock-photo-programming-concept.jpg", alt: "JavaScript" },
  { src: "https://t3.ftcdn.net/jpg/04/51/12/88/360_F_451128839_vmKOyil368UoXcac46W7aaqelTtLuNFk.jpg", alt: "Java" },
  { src: "https://img.freepik.com/premium-photo/python-programming-code-abstract-technology-background_926199-2202275.jpg", alt: "Python" },
  { src: "https://elazizi.com/images/react-native-libraries.png", alt: "React" },
  { src: "https://static.vecteezy.com/system/resources/thumbnails/052/003/464/small_2x/ai-technology-the-future-is-now-free-video.jpg", alt: "AI" },
  { src: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/html-la-gi-3.jpg", alt: "HTML5" },
  { src: "https://www.elegantthemes.com/blog/wp-content/uploads/2021/01/000-Basic-CSS.png", alt: "CSS3" },
  { src: "https://media.licdn.com/dms/image/v2/D5612AQHTJ-RtsFB3mw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721191066317?e=2147483647&v=beta&t=cvRodUsIPusIJxIdNoQkoW57WCnVbrgZsAnFYsVEKZI", alt: "MongoDB" },
  { src: "https://c8.alamy.com/comp/2E8XJND/nodejs-inscription-against-laptop-and-code-background-learn-node-programming-language-computer-courses-training-2E8XJND.jpg", alt: "Node.js" },
//   { src: "https://avatars.githubusercontent.com/u/190856835?s=400&u=5aee8c08a77a733472c326936e10af13199ace90&v=4", alt: "Mohit Maurya" },
  { src: "https://theskillboost.com/images/C-languagwwe.jpg", alt: "C Programming" },
    { src: "https://www.shutterstock.com/image-vector/low-poly-letter-logo-dsa-600nw-2676856741.jpg", alt: "DSA" },
];

const AnimatedCards = () => {
  const bubbleSize = 80; // px
  const sectionWidth = window.innerWidth; // %
  const sectionHeight = 400; // px
  const minDistance = 0; // px, bubbles ke beech minimum distance

  // Function to generate non-overlapping positions
  const generatePositions = () => {
    const positions = [];
    bubbles.forEach(() => {
      let top, left, safe;
      let attempts = 0;
      do {
        safe = true;
        top = Math.random() * (sectionHeight - bubbleSize);
        left = Math.random() * (sectionWidth - bubbleSize);
        // Check distance with already placed bubbles
        for (let pos of positions) {
          const dx = pos.left - left;
          const dy = pos.top - top;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance) {
            safe = false;
            break;
          }
        }
        attempts++;
        // Prevent infinite loop
        if (attempts > 100) break;
      } while (!safe);
      positions.push({ top, left });
    });
    return positions;
  };

  const positions = generatePositions();

  return (
    <div
      className="relative h-[400px] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-gradient-to-br from-[#0a0f1f] via-[#14162e] to-[#020617] text-white"
    >
      
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent mb-4"
        animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        Coding & Technologies Bubbles
      </motion.h1>

      {/* Bubbles */}
      {bubbles.map((bubble, index) => {
        const { top, left } = positions[index];
        const moveX = 20 + Math.random() * 20;
        const moveY = 20 + Math.random() * 20;

        return (
          <motion.div
            key={index}
            className="absolute rounded-full border-2 border-white/30 overflow-hidden"
            style={{
              width: `${bubbleSize}px`,
              height: `${bubbleSize}px`,
              top: `${top}px`,
              left: `${left}px`,
            }}
            animate={{
              x: [ -moveX, moveX, -moveX ],
              y: [ -moveY, moveY, -moveY ],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <img 
              src={bubble.src} 
              alt={bubble.alt} 
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        )
      })}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default AnimatedCards;

