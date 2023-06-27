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
import {Link as RouterLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import registerSchemaValidation from "./registerSchemaValidation";

export default function Register() {
  // LOGIN_VALIDATION&SUBMIT
  type FormData = yup.InferType<typeof registerSchemaValidation>;
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(registerSchemaValidation),
  });
  const onSubmit = (data: FormData) => console.log(data);

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
            // loading={isMutation.loading}
            // disabled={isMutation.loading}
            // startIcon={
            //   isMutation.loading && (
            //     <CircularProgress size={15} color="inherit" />
            //   )
            // }
            variant="contained"
            sx={{mt: 3, mb: 2}}
            fullWidth
          >
            <span>Register</span>
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
