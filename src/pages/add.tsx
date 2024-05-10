import { Box, useTheme } from "@mui/material";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

// 魚のデータ型を定義
interface Fish {
  src: string;
  duration: number; // アニメーションの周期（秒）
  distance: number; // 動く距離（ピクセル）
}

// 魚のリスト
const fishList: Fish[] = [
  { src: "/fish.png", duration: 5, distance: 300 },
  { src: "/fish2.png", duration: 8, distance: 200 },
  { src: "/fish3.png", duration: 3, distance: 400 },
];

// アニメーション適用用のスタイルドコンポーネントを生成
const createAnimatedFish = (duration: number, distance: number) => {
  const swimAnimation = keyframes`
    0% { transform: translateX(0px); }
    50% { transform: translateX(${distance}px); }
    100% { transform: translateX(0px); }
  `;

  return styled(Image)`
    animation: ${swimAnimation} ${duration}s infinite;
  `;
};

const FishAnimation = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.primary.main,
        position: "relative",
      }}
    >
      {fishList.map((fish, index) => {
        const AnimatedFish = createAnimatedFish(fish.duration, fish.distance);
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
              top: `${10 + index * 15}%`, // 重ならないように位置調整
            }}
          />
        );
      })}
    </Box>
  );
};

export default FishAnimation;
