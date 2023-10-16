import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import { formLabelClasses } from "@mui/joy/FormLabel"
import IconButton from "@mui/joy/IconButton"
import Link from "@mui/joy/Link"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded"
import ColorSchemeToggle from "../components/shared/ColorSchemeToggle"
import ControlledTextField from "../components/inputs/ControlledTextField"
import { useForm } from "react-hook-form"

const LoginForm = ({ control }: { control: any }) => {
  return (
    <>
      <ControlledTextField
        type="email"
        label="Email"
        name="auth.email"
        control={control}
        required
      />
      <ControlledTextField
        type="password"
        label="Password"
        name="auth.password"
        control={control}
        required
      />
    </>
  )
}

const SignUpForm = ({ control }: { control: any }) => {
  return (
    <>
      <ControlledTextField
        label="First Name"
        name="auth.first_name"
        control={control}
        required
      />

      <ControlledTextField
        label="Last Name"
        name="auth.last_name"
        control={control}
        required
      />
      <ControlledTextField
        type="email"
        label="Email"
        name="auth.email"
        control={control}
        required
      />
      <ControlledTextField
        type="password"
        label="Password"
        name="auth.password"
        control={control}
        required
      />
      <ControlledTextField
        type="password"
        label="Confirm Password"
        name="auth.confirm_password"
        control={control}
        required
      />
    </>
  )
}

interface IAuthForm {
  auth: {
    email: string
    password: string
  }
}
const AuthForm = ({ mode }: { mode: string }) => {
  // const isEditable = useSelector(isEditableState)
  // const dispatch = useDispatch()
  const { handleSubmit, control } = useForm<IAuthForm>({
    defaultValues: {
      auth: {},
    },
  })

  const onSubmit = ({ auth }: IAuthForm) => {
    console.log(auth)
  }
  return (
    <Stack gap={4} sx={{ mt: 2 }}>
      <Stack gap={4} sx={{ mt: 2 }}>
        {mode === "signin" ? (
          <SignUpForm control={control} />
        ) : (
          <LoginForm control={control} />
        )}
        <Button type="submit" fullWidth onClick={handleSubmit(onSubmit)}>
          {mode == "signin" ? "Sign In" : "Log In"}
        </Button>
      </Stack>
    </Stack>
  )
}

export default function Login() {
  const [mode, setMode] = React.useState("login")
  const switchMode = () => {
    if (mode == "signin") {
      setMode("login")
    } else {
      setMode("signin")
    }
  }
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
                  {mode === "signin" ? "Log In" : "Sign Up"}
                </Typography>
              </Stack>
            </Stack>

            <AuthForm mode={mode} />

            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1} direction="row">
                <Typography level="body-sm">
                  {mode === "signin"
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </Typography>
                <Link href="#" level="title-sm" onClick={() => switchMode()}>
                  {mode === "signin" ? "Log In" : "Sign Up"}
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
