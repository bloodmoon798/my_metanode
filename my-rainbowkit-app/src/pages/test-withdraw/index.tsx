import React from "react";
import StakePageLayout from "@/components/StakePageLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

export default function Withdraw() {
  return (
    <StakePageLayout>
      <Card
        sx={{ minWidth: 700 }}
        style={{
          color: "aqua",
          backgroundColor: "#1e1e1e",
          border: "1px solid aqua",
        }}
      >
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ marginRight: "30px" }}>Staked Amount: </h1>
            <h1> 0.00 ETH</h1>
          </div>

          <div>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                <div style={{ color: "aqua" }}> Amount to Withdraw</div>
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                endAdornment={
                  <InputAdornment position="end">
                    <div style={{ color: "aqua" }}>ETH</div>
                  </InputAdornment>
                }
                label="Amount to Withdraw"
              />
            </FormControl>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              disabled={false}
              size="large"
              style={{
                backgroundColor: "#000",
                color: "aqua",
                fontWeight: "bold",
              }}
            >
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>
    </StakePageLayout>
  );
}
