import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import loginSchemaValidation from "./loginSchemaValidation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Login() {
  // LOGIN_VALIDATION&SUBMIT
  type FormData = yup.InferType<typeof loginSchemaValidation>;
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(loginSchemaValidation),
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
          Sign in
        </Typography>
        {/* Form_Body */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{mt: 1}}
        >
          {/* Form_Input_Email */}
          <TextField
            inputProps={{...register("email")}}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {/* Form_Input_Password */}
          <TextField
            inputProps={{...register("password")}}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            name="password"
            label="Password"
          />
          {/* Submit_Form_Button */}
          <Button
            type="submit"
            // loading={loggedStatus.loading}
            // disabled={loggedStatus.loading}
            // startIcon={
            //   loggedStatus.loading && (
            //     <CircularProgress size={15} color="inherit" />
            //   )
            // }
            variant="contained"
            sx={{mt: 3, mb: 2}}
            fullWidth
          >
            <span>Sign In</span>
          </Button>

          {/* Forgot_Password & SignIn_Link */}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
