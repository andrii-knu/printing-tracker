import { Box, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type TemplateProps = {
  title: string;
  headerControls?: ReactNode;
} & PropsWithChildren;

export default function PageTemplate({ title, headerControls, children }: TemplateProps) {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box
        p={2}
        bgcolor="primary.main"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6">{title}</Typography>
        {headerControls}
      </Box>
      {children}
    </Box>
  );
}
