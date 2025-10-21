import React, { useState, useMemo } from "react";
import StakePageLayout from "@/components/StakePageLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { PID } from "@/constants";
import { stakeAbi } from "@/assets/abis/stake";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  type UseReadContractParameters,
} from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { formatEther, parseEther } from "viem";
import { config } from "@/wagmi";

export default function Stake() {
  const { enqueueSnackbar } = useSnackbar();
  const { address } = useAccount();

  const [amountToStake, setAmountToStake] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: stakedAmount, refetch } = useReadContract({
    address: process.env.NEXT_PUBLIC_STAKE_ADDRESS,
    abi: stakeAbi,
    functionName: "stakingBalance",
    args: [PID, address],
    watch: true,
  } as UseReadContractParameters);

  const formattedStakedAmount = useMemo(() => {
    if (!stakedAmount) return "0.0000";
    return parseFloat(formatEther(stakedAmount as bigint))
      .toFixed(4)
      .toString();
  }, [stakedAmount]);

  const { writeContractAsync } = useWriteContract();

  const handleStake = async () => {
    if (
      !amountToStake ||
      Number(amountToStake) <= 0 ||
      isNaN(Number(amountToStake))
    ) {
      enqueueSnackbar("Please enter a valid stake amount", {
        variant: "error",
      });
      return;
    }
    try {
      setIsLoading(true);

      const txHash = await writeContractAsync({
        abi: stakeAbi,
        address: process.env.NEXT_PUBLIC_STAKE_ADDRESS as `0x${string}`,
        functionName: "depositETH",
        value: parseEther(amountToStake as string),
      });

      const result = await waitForTransactionReceipt(config, {
        hash: txHash as unknown as `0x${string}`,
      });

      if (result?.status === "success") {
        enqueueSnackbar("Stake successfully! ", { variant: "success" });
        setAmountToStake("");
        refetch();
      }
    } catch (error) {
      console.error("Stake failed", error);
      enqueueSnackbar("Stake failed", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1> {formattedStakedAmount} ETH</h1>
          </div>

          <div>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                <div style={{ color: "aqua" }}>Amount to Stake</div>
              </InputLabel>
              <OutlinedInput
                style={{ color: "aqua" }}
                id="outlined-adornment-amount"
                value={amountToStake}
                onChange={(e) => {
                  setAmountToStake(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <div style={{ color: "aqua" }}>ETH</div>
                  </InputAdornment>
                }
                label="Amount to Stake"
              />
            </FormControl>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              disabled={isLoading}
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#000",
                color: isLoading ? "red" : "aqua",
                fontWeight: "bold",
              }}
              onClick={handleStake}
            >
              {isLoading ? "Staking..." : "Stake"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </StakePageLayout>
  );
}
