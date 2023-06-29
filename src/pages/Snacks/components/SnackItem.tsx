import {Card, CardContent, Chip, Stack, Typography} from "@mui/material";

export interface SnackItemI {
  buyingPrice: number;
  createdAt: string;
  name: string;
  quantityInStock: number;
  sellingPrice: number;
  sold: number;
  updatedAt: string;
  _id: string;
}

export default function SnackItem({...item}: SnackItemI) {
  const {
    createdAt,
    name,
    _id,
    // buyingPrice,
    sellingPrice,
    quantityInStock,
    sold,
  } = item;

  const createdDate = new Date(createdAt).toLocaleDateString("en-US");

  return (
    <Card elevation={2}>
      <CardContent sx={{display: "flex", flexDirection: "column", gap: 1.5}}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{fontWeight: 500, fontSize: "15px"}}
          >
            {name.toUpperCase()}
          </Typography>

          <Stack direction={"row"} spacing={0.5}>
            <Chip
              label={
                quantityInStock > 0 ? `Qty: ${quantityInStock}` : "Sold Out"
              }
              color={quantityInStock > 0 ? "primary" : "error"}
              size="small"
            />
            <Chip label={`Sold: ${sold}`} color={"success"} size="small" />
          </Stack>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          ID: {_id}
        </Typography>

        <Stack
          direction={"row"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Chip label={`${sellingPrice} $`} color={"secondary"} size="small" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{textAlign: "end", fontSize: "11px"}}
          >
            Created At: {createdDate}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
