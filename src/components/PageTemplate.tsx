import { Box, Stack, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { PropsWithChildren, ReactNode } from "react";
import HomeIcon from "@mui/icons-material/Home";

type TemplateProps = {
  title: string;
  childrenTitle: string;
  topChildren?: ReactNode;
  childrenControls?: ReactNode;
  onBack?: () => void;
} & PropsWithChildren;

const PRIMARY_HEADER_BG_COLOR = "rgba(25, 118, 210, 1.0)";
const SECONDARY_HEADER_BG_COLOR = "rgba(25, 118, 210, 0.8)";

export default function PageTemplate({
  title,
  childrenTitle: subtitle,
  topChildren,
  childrenControls,
  children,
  onBack,
}: TemplateProps) {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box
        p={2}
        bgcolor={onBack ? SECONDARY_HEADER_BG_COLOR : PRIMARY_HEADER_BG_COLOR}
        color="white"
        display="flex"
        alignItems="center"
        gap={1}
      >
        {onBack && (
          <IconButton onClick={onBack} color="inherit" edge="start">
            <ArrowBackIcon />
          </IconButton>
        )}
        {!onBack && (
          <IconButton color="inherit" edge="start" disableRipple>
            <HomeIcon />
          </IconButton>
        )}
        <Typography variant="h6">{title}</Typography>
      </Box>
      {topChildren}
      <Stack p={2} direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{subtitle}</Typography>
        {childrenControls}
      </Stack>
      <Box overflow="auto">{children}</Box>
    </Box>
  );
}
