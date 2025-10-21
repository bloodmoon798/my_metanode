import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import styles from "@/styles/Stake.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const pages = ["Stake", "Withdraw"];

export default function StakeHeader() {
  const pathName = usePathname();

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#000", borderBottom: "2px solid #fff" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ElectricBoltIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "aqua" }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "aqua",
              textDecoration: "none",
            }}
          >
            MetaNode Stake
          </Typography>

          <div className={styles.navLinks}>
            {pages.map((page) => {
              return (
                <Link
                  key={page}
                  href={`/test-${page.toLowerCase()}`}
                  style={{
                    borderBottom: pathName.includes(page.toLowerCase())
                      ? "2px solid aqua"
                      : "inherit",
                  }}
                >
                  {page}
                </Link>
              );
            })}
          </div>
          <div className={styles.connectWalletButton}>
            <ConnectButton />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
