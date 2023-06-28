import {yupResolver} from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {enqueueSnackbar} from "notistack";
import {useForm} from "react-hook-form";
import {Navigate, Link as RouterLink} from "react-router-dom";
import * as yup from "yup";
import api from "../../../../api";
import useAuthStore from "../../../../app/store/auth";
import {ResErrorsI} from "../Login";
import registerSchemaValidation from "./registerSchemaValidation";

export default function Register() {
  const {user, setUser} = useAuthStore();

  // LOGIN_VALIDATION&SUBMIT
  type FormData = yup.InferType<typeof registerSchemaValidation>;

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(registerSchemaValidation),
  });
  const {mutate, isLoading} = useMutation(
    (body: FormData) =>
      api.post("/auth/register", body).then((res) => {
        if (res.status === 201) {
          // Set token to cookies to expire in 10 days
          setUser(res.data.token);
          enqueueSnackbar("Successfully Register", {variant: "success"});
        }
      }),
    {
      onError: (error) => {
        const axiosError = error as AxiosError<ResErrorsI>;
        const errMsg = axiosError?.response?.data;
        if (errMsg?.message) {
          enqueueSnackbar(errMsg?.message, {variant: "error"});
        }
      },
    }
  );

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  if (user) return <Navigate to={"/"} />;

  return (
    <Container component={"section"} maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Form_Header */}
        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {/* Form_Body */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{mt: 1}}
        >
          {/* Form_Input_Username */}
          <TextField
            inputProps={{...register("username")}}
            error={!!errors.username}
            helperText={errors.username?.message}
            margin="normal"
            required
            fullWidth
            type="text"
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          {/* Form_Input_Email */}
          <TextField
            inputProps={{...register("email")}}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          {/* Form_Input_Password */}
          <TextField
            inputProps={{...register("password")}}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
          />
          {/* Submit_Form_Button */}
          <Button
            type="submit"
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress size={15} color="inherit" />
            }
            variant="contained"
            sx={{mt: 3, mb: 2}}
            fullWidth
          >
            <span>{isLoading ? "Loading" : "Register"}</span>
          </Button>

          {/* SignIn_Link */}
          <Box sx={{textAlign: "center"}}>
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
