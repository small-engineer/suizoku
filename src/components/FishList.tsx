import {
  Button,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Fish {
  id: number;
  src: string;
  angle: number;
  speed: number;
}

const FishList = () => {
  const [fishes, setFishes] = useState<Fish[]>([]);

  useEffect(() => {
    fetch("/api/getFishes")
      .then((response) => response.json())
      .then((data) => setFishes(data as Fish[])) // 型アサーションを追加
      .catch((error) => console.error("Error fetching fishes:", error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/deleteFish", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setFishes(fishes.filter((fish) => fish.id !== id));
      } else {
        throw new Error("Failed to delete the fish");
      }
    } catch (error) {
      console.error("Error deleting fish:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image URL</TableCell>
            <TableCell align="right">Angle (degrees)</TableCell>
            <TableCell align="right">Speed (seconds)</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fishes.map((fish) => (
            <TableRow
              key={fish.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {fish.src}
              </TableCell>
              <TableCell align="right">{fish.angle}</TableCell>
              <TableCell align="right">{fish.speed}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleDelete(fish.id)} color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FishList;
