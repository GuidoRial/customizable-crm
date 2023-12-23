import InfoIcon from "@mui/icons-material/Info"
import WarningIcon from "@mui/icons-material/Warning"
import ReportIcon from "@mui/icons-material/Report"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import * as React from "react"
import Box from "@mui/joy/Box"
import Alert from "@mui/joy/Alert"
import IconButton from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import { ColorPaletteProp } from "@mui/joy/styles"
import { useDispatch, useSelector } from "react-redux"
import alertSlice, {
  selectAlert,
  setAlert,
} from "../../features/alert/alertSlice"
interface IAlert {
  [key: string]: {
    title: string
    color: ColorPaletteProp
    icon: React.ReactElement
  }
}
interface IAlertsProps {
  type: "success" | "warning" | "error" | "neutral"
}
export default function Alerts() {
  const data = useSelector(selectAlert)
  const dispatch = useDispatch()

  const alerts: IAlert = {
    success: {
      title: "Success",
      color: "success",
      icon: <CheckCircleIcon />,
    },
    warning: {
      title: "Warning",
      color: "warning",
      icon: <WarningIcon />,
    },
    error: {
      title: "Error",
      color: "danger",
      icon: <ReportIcon />,
    },
    neutral: {
      title: "Neutral",
      color: "neutral",
      icon: <InfoIcon />,
    },
  }
  const { display, type, message, title } = data
  const alert = React.useMemo(
    () =>
      type ? alerts[type] : { title: "", color: "neutral", icon: <InfoIcon /> },
    [display, type, message, title],
  ) as any

  return display ? (
    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        left: "80%",
        width: "30%",
        transform: "translateX(-50%)",
        display: "flex",
        direction: "column",
        alignItems: "flex-end",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          flexDirection: "column",
          opacity: "0.9",
        }}
      >
        <Alert
          key={title ? title : alert?.title}
          sx={{ alignItems: "flex-start" }}
          startDecorator={alert?.icon}
          variant="soft"
          color={alert?.color}
          endDecorator={
            <IconButton variant="soft" color={alert?.color}>
              <CloseRoundedIcon
                onClick={() =>
                  dispatch(
                    setAlert({
                      display: false,
                      type: "success",
                      message: "",
                      title: "",
                    }),
                  )
                }
              />
            </IconButton>
          }
        >
          <div>
            <div>{title ? title : alert?.title}</div>
            <Typography level="body-sm" color={alert?.color}>
              {message}
            </Typography>
          </div>
        </Alert>
      </Box>
    </Box>
  ) : null
}
