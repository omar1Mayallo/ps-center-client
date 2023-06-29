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
import {enqueueSnackbar} from "notistack";
import {Navigate, Link as RouterLink} from "react-router-dom";
import api from "../../../../api";
import useAuthStore from "../../../../app/store/auth";
import catchAndNotifyErrors from "../../../../shared/helpers/catchAndNotifyErrors";
import useRegisterFormData, {RegisterFormData} from "./useRegisterFormData";

export default function Register() {
  // FORM_VALIDATION
  const {
    register: registerV,
    handleSubmit,
    formState: {errors},
  } = useRegisterFormData();

  // USER_STORE
  const {user, setUser} = useAuthStore();

  // REGISTER_SERVICE
  async function register(body: RegisterFormData) {
    const res = await api.post("/auth/register", body);
    if (res.status === 201) {
      setUser(res.data.token);
      enqueueSnackbar("Successfully Register", {variant: "success"});
    }
  }
  const {mutate, isLoading} = useMutation(register, {
    onError: catchAndNotifyErrors,
  });
  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  // REDIRECT_TO_HOME_IF_LOGGED_IN
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
            inputProps={{...registerV("username")}}
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
            inputProps={{...registerV("email")}}
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
            inputProps={{...registerV("password")}}
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
