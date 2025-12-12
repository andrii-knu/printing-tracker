import { Box, Stack, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type TemplateProps = {
  title: string;
  childrenTitle: string;
  topChildren?: ReactNode;
  childrenControls?: ReactNode;
} & PropsWithChildren;

export default function PageTemplate({
  title,
  childrenTitle: subtitle,
  topChildren,
  childrenControls,
  children,
}: TemplateProps) {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box p={2} bgcolor="primary.main" color="white" display="flex">
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
