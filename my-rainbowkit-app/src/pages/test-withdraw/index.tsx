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
import {
  useAccount,
  useReadContract,
  useWriteContract,
  type UseReadContractParameters,
} from "wagmi";
import { stakeAbi } from "@/assets/abis/stake";
import { PID } from "@/constants";
import { formatEther, parseEther, formatUnits } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/wagmi";

export default function Withdraw() {
  const { enqueueSnackbar } = useSnackbar();
  const { address } = useAccount();

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

  const [amountToUnstake, setAmountToUnstake] = useState<string>("");
  const [unStakeLoading, setUnStakeLoading] = useState<boolean>(false);
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false);

  const { writeContractAsync } = useWriteContract();

  const handleUnstake = async () => {
    if (
      !amountToUnstake ||
      Number(amountToUnstake) <= 0 ||
      isNaN(Number(amountToUnstake))
    ) {
      enqueueSnackbar("Please enter a valid amount to unstake", {
        variant: "error",
      });
      return;
    }

    if (Number(amountToUnstake) > Number(formattedStakedAmount)) {
      enqueueSnackbar("Not enough amount to unstake", {
        variant: "error",
      });
      return;
    }

    try {
      setUnStakeLoading(true);
      const txHash = await writeContractAsync({
        abi: stakeAbi,
        address: process.env.NEXT_PUBLIC_STAKE_ADDRESS as `0x${string}`,
        functionName: "unstake",
        args: [BigInt(PID), parseEther(amountToUnstake as string)],
      });

      const result = await waitForTransactionReceipt(config, {
        hash: txHash as unknown as `0x${string}`,
      });

      if (result?.status === "success") {
        enqueueSnackbar("Unstake successfully", { variant: "success" });
        setAmountToUnstake("");
        refetch();
        refetchAvailableToUnstakeAmount();
      }
    } catch (error) {
      console.error("Unstake failed", error);
      enqueueSnackbar("Unstake failed", { variant: "error" });
    } finally {
      setUnStakeLoading(false);
    }
  };

  const {
    data: readWithdrawAmountResult,
    refetch: refetchAvailableToUnstakeAmount,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_STAKE_ADDRESS,
    abi: stakeAbi,
    functionName: "withdrawAmount",
    args: [PID, address],
    watch: true,
  } as UseReadContractParameters);

  const formattedPendingWithdrawAmount = useMemo(() => {
    if (!readWithdrawAmountResult) return "0.0000";
    const [totalAmount, availableToWithdrawAmount] =
      readWithdrawAmountResult as [bigint, bigint];
    const total = Number(formatUnits(totalAmount, 18));
    const available = Number(formatUnits(availableToWithdrawAmount, 18));

    const res = (total - available).toFixed(4).toString();
    return res;
  }, [readWithdrawAmountResult]);

  const formattedAvailableToWithdrawAmount = useMemo(() => {
    const availableToWithdrawAmount = (
      readWithdrawAmountResult as [bigint, bigint]
    )?.[1];
    if (!availableToWithdrawAmount) return "0.0000";
    return Number(formatUnits(availableToWithdrawAmount, 18))
      .toFixed(4)
      .toString();
  }, [readWithdrawAmountResult]);

  const handleWithdraw = async () => {
    if (Number(formattedAvailableToWithdrawAmount) <= 0) {
      enqueueSnackbar("You don't have any amount to withdraw", {
        variant: "error",
      });
      return;
    }

    try {
      setWithdrawLoading(true);
      const txHash = await writeContractAsync({
        abi: stakeAbi,
        address: process.env.NEXT_PUBLIC_STAKE_ADDRESS as `0x${string}`,
        functionName: "withdraw",
        args: [BigInt(PID)],
      });
      const result = await waitForTransactionReceipt(config, {
        hash: txHash as unknown as `0x${string}`,
      });
      if (result?.status === "success") {
        enqueueSnackbar("Withdraw successfully", { variant: "success" });
        refetch();
        refetchAvailableToUnstakeAmount();
      }
    } catch (error) {
      console.error("Withdraw failed !", error);
      enqueueSnackbar("Withdraw failed", { variant: "error" });
    } finally {
      setWithdrawLoading(false);
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
            <h3 style={{ marginRight: "30px" }}>Staked Amount: </h3>
            <h3> {formattedStakedAmount} ETH</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3 style={{ marginRight: "30px" }}>Available to withdraw: </h3>
            <h3> {formattedAvailableToWithdrawAmount} ETH</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3 style={{ marginRight: "30px" }}>Pending withdraw: </h3>
            <h3> {formattedPendingWithdrawAmount} ETH</h3>
          </div>
          <div>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                <div style={{ color: "aqua" }}> Amount to Unstake</div>
              </InputLabel>
              <OutlinedInput
                style={{ color: "aqua" }}
                value={amountToUnstake}
                onChange={(e) => setAmountToUnstake(e.target.value)}
                id="outlined-adornment-amount"
                endAdornment={
                  <InputAdornment position="end">
                    <div style={{ color: "aqua" }}>ETH</div>
                  </InputAdornment>
                }
                label="Amount to Unstake"
              />
            </FormControl>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 25,
            }}
          >
            <Button
              disabled={unStakeLoading}
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#000",
                color: unStakeLoading ? "red" : "aqua",
                fontWeight: "bold",
              }}
              onClick={handleUnstake}
            >
              {unStakeLoading ? "Unstaking..." : "Unstake"}
            </Button>
            <Button
              disabled={withdrawLoading}
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#000",
                color: withdrawLoading ? "red" : "aqua",
                fontWeight: "bold",
              }}
              onClick={handleWithdraw}
            >
              {withdrawLoading ? "Withdrawing..." : "Withdraw"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </StakePageLayout>
  );
}
