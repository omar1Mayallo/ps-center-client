import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DateText from "../../../shared/components/DateText";
import useUserRole from "../../../shared/hooks/useUserRole";
import Device from "../../../shared/types/entities/Device";
import {SessionTypes} from "../../../shared/types/entities/Session";
import CounterTimer from "./Timer";
import {Link as RouterLink} from "react-router-dom";

export default function DeviceItem({item}: {item: Device}) {
  const {isOwner, isUser} = useUserRole();
  const sessionTypesArr = [
    {
      value: SessionTypes.DUO,
    },
    {
      value: SessionTypes.MULTI,
    },
  ];

  return (
    <Card elevation={2} sx={{minHeight: isUser ? "268px" : "345px"}}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: isUser ? 2 : item.order ? 2 : 2.5,
        }}
      >
        {/* NAME / TYPE / DELETE_ICON*/}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography sx={{fontSize: "15px", fontWeight: 700}}>
            {item.name.toUpperCase()}
          </Typography>
          <Chip
            label={item.type.toUpperCase()}
            color={"info"}
            size="medium"
            sx={{fontWeight: 700}}
          />
          {isOwner &&
            (!Math.random() ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton
                aria-label="delete"
                color="error"
                // onClick={() => {
                //   mutate(item._id);
                //   navigate("/orders");
                // }}
              >
                <DeleteIcon />
              </IconButton>
            ))}
        </Stack>

        {/* ID / IS_EMPTY */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Chip label={item._id} color={"default"} size="small" />
          <Chip
            label={item.isEmpty ? "Empty" : "Playing"}
            color={item.isEmpty ? "default" : "success"}
            size="small"
          />
        </Stack>

        {/* TIMER */}
        {item.startTime && <CounterTimer startTime={item.startTime} />}

        {/* ORDER */}
        {isUser ||
          (item.order && (
            <Typography
              sx={{fontSize: "12px", fontWeight: 600, textAlign: "center"}}
            >
              Order :{" "}
              <Link component={RouterLink} to={`/orders/${item.order}/edit`}>
                {item.order}
              </Link>
            </Typography>
          ))}

        {/* END_TIME */}
        {isUser ||
          (item.startTime && (
            <Button variant="contained" color="error" size="small">
              End Time
            </Button>
          ))}

        {/* EDIT_SESSION_TYPE / START_TIME */}
        {isUser ||
          ((item.isEmpty || !item.startTime) && (
            <>
              <TextField
                id="outlined-select-currency"
                size="small"
                select
                label="Set SessionType"
                defaultValue={item.sessionType}
              >
                {sessionTypesArr.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <Button variant="contained" size="small">
                Start Time
              </Button>
            </>
          ))}

        {/* SESSION TYPE / PRICES */}
        <Stack
          direction={"row"}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={0.5}>
            <Chip
              label={`Session Type: ${item.sessionType}`}
              color={"warning"}
              size="small"
            />
            <Chip
              label={`Duo Price: ${item.duoPricePerHour} $`}
              color={"secondary"}
              size="small"
            />
            <Chip
              label={`Multi Price: ${item.multiPricePerHour} $`}
              color={"secondary"}
              size="small"
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
            <DateText date={item.createdAt} preText="Created at:" />
            <DateText date={item.updatedAt} preText="Updated at:" />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
