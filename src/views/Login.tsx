import * as React from "react"
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles"
import GlobalStyles from "@mui/joy/GlobalStyles"
import CssBaseline from "@mui/joy/CssBaseline"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import FormControl from "@mui/joy/FormControl"
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel"
import IconButton from "@mui/joy/IconButton"
import Link from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded"
import ColorSchemeToggle from "../components/shared/ColorSchemeToggle"

const AuthForm = ({ mode }: { mode: string }) => {
  return (
    <Stack gap={4} sx={{ mt: 2 }}>
      <form
        onSubmit={(event: React.FormEvent<SignInFormElement>) => {
          event.preventDefault()
          const formElements = event.currentTarget.elements
          const data = {
            email: formElements.email.value,
            password: formElements.password.value,
          }
          alert(JSON.stringify(data, null, 2))
        }}
      >
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" />
        </FormControl>
        <FormControl required>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" />
        </FormControl>
        <Stack gap={4} sx={{ mt: 2 }}>
          <Button type="submit" fullWidth>
            {mode == "signin" ? "Sign In" : "Log In"}
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
  persistent: HTMLInputElement
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function Login() {
  const [mode, setMode] = React.useState("signin")
  const switchMode = () => {
    if (mode == "signin") {
      setMode("login")
    } else {
      setMode("signin")
    }
  }
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
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
              <Typography level="title-lg">Customizable CRM</Typography>
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
                  {mode == "signin" ? "Sign In" : "Log In"}
                </Typography>
              </Stack>
            </Stack>

            <AuthForm mode={mode} />
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1} direction="row">
                <Typography level="body-sm">
                  {mode === "signin"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </Typography>
                <Link href="#" level="title-sm" onClick={() => switchMode()}>
                  {mode === "signin" ? "Sign Up" : "Log In"}
                </Link>
              </Stack>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Customizable CRM {new Date().getFullYear()}
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
    </CssVarsProvider>
  )
}
