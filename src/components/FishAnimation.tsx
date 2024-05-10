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
      }}
    >
      {fishes.map((fish, index) => {
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
              top: `${10 + index * 15}%`, // 各魚が重ならないように位置を調整
            }}
          />
        );
      })}
    </Box>
  );
};

export default FishAnimation;
