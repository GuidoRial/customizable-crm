import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import { formLabelClasses } from "@mui/joy/FormLabel"
import IconButton from "@mui/joy/IconButton"
import Link from "@mui/joy/Link"
import { Link as RouterLink } from "react-router-dom"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded"
import ColorSchemeToggle from "../components/shared/ColorSchemeToggle"
import ControlledTextField from "../components/inputs/ControlledTextField"
import { useForm } from "react-hook-form"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import { fieldRequired, isEmail, mustMatch } from "../rules"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import authSlice, {
  loginAsync,
  selectAuth,
  signUpAsync,
} from "../features/auth/authSlice"
import { ISignUpUserDTO } from "../interfaces/IAuth"
import { AnyAction } from "redux"
import Alerts from "../components/ui/Alerts"
const PasswordEndDecorator = ({
  showPassword,
  setShowPassword,
}: Partial<IForm>) => {
  if (showPassword) {
    return (
      <VisibilityOffIcon
        sx={{ cursor: "pointer" }}
        onClick={() => setShowPassword(!showPassword)}
      />
    )
  }

  return (
    <RemoveRedEyeIcon
      sx={{ cursor: "pointer" }}
      onClick={() => setShowPassword(!showPassword)}
    />
  )
}

interface IForm {
  control: any
  showPassword: boolean
  setShowPassword: any
  getValues?: any
}
const LoginForm = ({ control, showPassword, setShowPassword }: IForm) => {
  return (
    <>
      <ControlledTextField
        type="email"
        label="Email"
        name="auth.email"
        control={control}
        required
        rules={isEmail()}
      />
      <ControlledTextField
        type={showPassword ? "text" : "password"}
        label="Password"
        name="auth.password"
        control={control}
        required
        endDecorator={
          <PasswordEndDecorator
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        }
      />
    </>
  )
}

const SignUpForm = ({
  control,
  showPassword,
  setShowPassword,
  getValues,
}: IForm) => {
  return (
    <>
      <ControlledTextField
        label="First Name"
        name="auth.first_name"
        control={control}
        required
        rules={fieldRequired("First Name")}
      />
      <ControlledTextField
        label="Last Name"
        name="auth.last_name"
        control={control}
        required
        rules={fieldRequired("Last Name")}
      />
      <ControlledTextField
        type="email"
        label="Email"
        name="auth.email"
        control={control}
        required
        rules={isEmail()}
      />
      <ControlledTextField
        type={showPassword ? "text" : "password"}
        label="Password"
        name="auth.password"
        control={control}
        required
        endDecorator={
          <PasswordEndDecorator
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        }
        rules={fieldRequired("Password")}
      />
      <ControlledTextField
        type={showPassword ? "text" : "password"}
        label="Confirm Password"
        name="auth.confirm_password"
        control={control}
        required
        endDecorator={
          <PasswordEndDecorator
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        }
        rules={mustMatch("auth.password", getValues, "Password")}
      />
    </>
  )
}

interface IAuthForm {
  auth: {
    email: string
    password: string
    confirm_password: string
    first_name: string
    last_name: string
  }
}
const AuthForm = ({ mode }: { mode: string }) => {
  const { loading } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = React.useState(false)
  // const isEditable = useSelector(isEditableState)
  // const dispatch = useDispatch()
  const { handleSubmit, control, getValues } = useForm<IAuthForm>({
    defaultValues: {
      auth: {},
    },
  })

  const onSubmit = async ({ auth }: IAuthForm) => {
    try {
      dispatch(signUpAsync(auth) as unknown as AnyAction)
      // console.log(auth)
    } catch (e) {
      console.log(e)
    }
  }
  const params = {
    control,
    showPassword,
    setShowPassword,
    getValues,
  }
  return (
    <Stack gap={4} sx={{ mt: 2 }}>
      <Stack gap={4} sx={{ mt: 2 }}>
        {mode === "signup" ? (
          <SignUpForm {...params} />
        ) : (
          <LoginForm {...params} />
        )}
        <Button
          type="submit"
          fullWidth
          onClick={handleSubmit(onSubmit)}
          loading={loading}
        >
          {mode === "signup" ? "Sign Up" : "Log In"}
        </Button>
      </Stack>
    </Stack>
  )
}

export default function Auth() {
  const mode = useParams().mode as string

  return (
    <>
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                gap: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Customizable</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h3">
                  {mode === "signup" ? "Sign Up" : "Log In"}
                </Typography>
              </Stack>
            </Stack>

            <AuthForm mode={mode} />

            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1} direction="row">
                <Typography level="body-sm">
                  {mode === "signup"
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </Typography>
                <Link
                  level="title-sm"
                  component={RouterLink}
                  to={`/auth/${mode === "signin" ? "signup" : "signin"}`}
                >
                  {mode === "signup" ? "Log In" : "Sign Up"}
                </Link>
              </Stack>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Customizable {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </>
  )
}
