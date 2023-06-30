import {Container, TextField} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {enqueueSnackbar} from "notistack";
import {Navigate} from "react-router-dom";
import api from "../../../../api";
import useAuthStore from "../../../../app/store/auth";
import AuthForm from "../../../../shared/components/AuthForm";
import catchAndNotifyErrors from "../../../../shared/helpers/catchAndNotifyErrors";
import useLoginFormData, {LoginFormData} from "./useLoginFormData";

export default function Login() {
  // FORM_VALIDATION
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useLoginFormData();

  // USER_STORE
  const {user, setUser, setUserInfo} = useAuthStore();

  // LOGIN_SERVICE
  async function login(body: LoginFormData) {
    const res = await api.post("/auth/login", body);
    if (res.status === 200) {
      setUser(res.data.token);
      setUserInfo(res.data.user);
      enqueueSnackbar("Successfully Login", {variant: "success"});
    }
  }
  const {mutate, isLoading} = useMutation(login, {
    onError: catchAndNotifyErrors,
  });
  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  // REDIRECT_TO_HOME_IF_LOGGED_IN
  if (user) return <Navigate to="/" />;

  return (
    <Container component={"section"} maxWidth="xs">
      <AuthForm
        isLoading={isLoading}
        formHead="Sign In"
        handleSubmit={handleSubmit(onSubmit)}
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
      </AuthForm>
    </Container>
  );
}
/*
{<Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{mt: 1}}
        >
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
          <Button
            type="submit"
            variant="contained"
            sx={{mt: 3, mb: 2}}
            fullWidth
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress size={15} color="inherit" />
            }
          >
            <span>{isLoading ? "Loading" : "Sign In"}</span>
          </Button>

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
      </Box> }
*/
