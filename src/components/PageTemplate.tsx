import { Box, Stack, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { PropsWithChildren, ReactNode } from "react";

type TemplateProps = {
  title: string;
  childrenTitle: string;
  topChildren?: ReactNode;
  childrenControls?: ReactNode;
  onBack?: () => void;
} & PropsWithChildren;

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
      <Box p={2} bgcolor="primary.main" color="white" display="flex" alignItems="center" gap={1}>
        {onBack && (
          <IconButton onClick={onBack} color="inherit" edge="start">
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6">{title}</Typography>
      </Box>
      {topChildren}
      <Stack p={2} pb={0} direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="h2">
          {subtitle}
        </Typography>
        {childrenControls}
      </Stack>
      <Box overflow="auto">{children}</Box>
    </Box>
  );
}
