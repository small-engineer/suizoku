import { Button, TextField, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import FishList from "../components/FishList";

const AddFish = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newFish = {
      src: formData.get("src") as string,
      angle: Number(formData.get("angle")),
      speed: Number(formData.get("speed")),
    };

    try {
      const response = await fetch("/api/addFish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFish),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      // ホームページに戻る
      router.push("/");
    } catch (error) {
      console.error("Failed to add the fish:", error);
    }
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
          name="angle"
          label="動く角度 (度)"
          type="number"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="speed"
          label="速度 (秒)"
          type="number"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          魚を追加
        </Button>
      </form>
      <FishList />
    </Box>
  );
};

export default AddFish;
