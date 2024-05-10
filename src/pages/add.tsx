import { Button, TextField, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

const AddFish = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newFish = {
      src: formData.get("src") as string,
      distance: Number(formData.get("distance")),
      duration: Number(formData.get("duration")),
    };

    // 既存のデータを取得して新しいデータを追加
    const existingFishes = JSON.parse(localStorage.getItem("fishes") || "[]");
    existingFishes.push(newFish);
    localStorage.setItem("fishes", JSON.stringify(existingFishes));

    // ホームページに戻る
    router.push("/");
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        新しい魚を追加
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="src"
          label="画像URL"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="distance"
          label="動く距離 (ピクセル)"
          type="number"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="duration"
          label="アニメーションの周期 (秒)"
          type="number"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          魚を追加
        </Button>
      </form>
    </Box>
  );
};

export default AddFish;
