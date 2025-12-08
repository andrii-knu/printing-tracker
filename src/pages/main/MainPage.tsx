import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import PrintingReport from "./PrintingReport";
import { useState } from "react";
import AddOrderDialog from "./AddOrderDialog";

export default function MainPage() {
  const [isOpenAddOrderDialog, setIsOpenAddOrderDialog] = useState(false);

  const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

  return (
    <>
      <Box display="flex" flexDirection="column" height="100vh">
        <Box
          p={2}
          bgcolor="primary.main"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Printing Tracker</Typography>
          <Button color="inherit" onClick={() => setIsOpenAddOrderDialog(true)}>
            + Замовлення
          </Button>
        </Box>

        <Box p={2} bgcolor="#f5f5f5">
          <PrintingReport />
        </Box>

        <Box p={1}>
          {/*Поки без пошуку*/}
          <TextField size="small" variant="outlined" fullWidth />
        </Box>
        <Box overflow="auto">
          <List>
            {items.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <AddOrderDialog
        isOpen={isOpenAddOrderDialog}
        onClose={() => setIsOpenAddOrderDialog(false)}
        onSubmit={(newOrder) => console.log("qwe", newOrder)}
      />
    </>
  );
}
