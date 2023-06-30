import {Container, TextField} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {enqueueSnackbar} from "notistack";
import {Navigate} from "react-router-dom";
import api from "../../../../api";
import useAuthStore from "../../../../app/store/auth";
import AuthForm from "../../../../shared/components/AuthForm";
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
  const {user, setUser, setUserInfo} = useAuthStore();

  // REGISTER_SERVICE
  async function register(body: RegisterFormData) {
    const res = await api.post("/auth/register", body);
    if (res.status === 201) {
      setUser(res.data.token);
      setUserInfo(res.data.user);
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
      <AuthForm
        isLoading={isLoading}
        formHead="Sign Up"
        handleSubmit={handleSubmit(onSubmit)}
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
      </AuthForm>
    </Container>
  );
}
