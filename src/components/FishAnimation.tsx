import { Box, useTheme } from "@mui/material";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface Fish {
  src: string;
  angle: number; // 角度
  speed: number; // 速度
}

const createAnimatedFish = (angle: number, speed: number) => {
  const radians = (angle * Math.PI) / 180;
  const translateX = 1000 * Math.cos(radians); // 画面幅に合わせて調整可能
  const translateY = 1000 * Math.sin(radians); // 画面の高さに合わせて調整可能

  const swimAnimation = keyframes`
    from { transform: translate(0px, 0px); }
    to { transform: translate(${translateX}px, ${translateY}px); }
  `;

  return styled(Image)`
    animation: ${swimAnimation} ${speed}s linear infinite;
  `;
};

const FishAnimation = () => {
  const theme = useTheme();
  const [fishes, setFishes] = useState<Fish[]>([]);

  useEffect(() => {
    // localStorage から魚のリストを読み込む
    const storedFishes = localStorage.getItem("fishes");
    if (storedFishes) {
      setFishes(JSON.parse(storedFishes));
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.primary.main,
        position: "relative",
        overflow: "hidden", // 画面外の要素は非表示にする
      }}
    >
      {fishes.map((fish, index) => {
        const AnimatedFish = createAnimatedFish(fish.angle, fish.speed);
        return (
          <AnimatedFish
            key={index}
            src={fish.src}
            alt={`Fish ${index + 1}`}
            width={100}
            height={100}
            layout="fixed"
            style={{
              position: "absolute",
              left: "0%",
              top: "0%",
              transform: "translate(-50%, -50%)", // 中心からのアニメーションを確実にする
            }}
          />
        );
      })}
    </Box>
  );
};

export default FishAnimation;
