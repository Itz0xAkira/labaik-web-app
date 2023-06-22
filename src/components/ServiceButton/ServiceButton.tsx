"use client"
import { useI18n } from "@/hooks/useI18n";
import React, { FC, useEffect, useMemo } from "react";


export const ServiceButton: FC<{ icon: string; label: string; onClick: () => void; className?: string; }> = ({ icon, label, onClick, className = "" }) => {
  useI18n();
  return (
    <div className={`flex justify-center flex-col items-center cursor-pointer h-28 w-28 md:h-36 md:w-36 ${className}`} style={styles.gridButton} {...{ onClick }}>
      <img
        width={50}
        height={50}
        src={icon}
        style={styles.gridButtonIcon}
        alt={label}

      />
      <div className="bold line-clamp-1" style={styles.gridButtonLabel}>{label}</div>
    </div>
  );
};

export const ActionButton: FC<{ icon: string; label: string; onClick: () => void; className?: string; }> = ({ icon, label, onClick, className = "" }) => {
  useI18n();
  return (
    <div className={`flex justify-center flex-col items-center cursor-pointer h-28 w-28 md:h-36 md:w-36 ${className}`} style={styles.AgridButton} {...{ onClick }}>
      <img
        width={50}
        height={50}
        src={icon}
        style={styles.gridButtonIcon}
        alt={label}

      />
      <div className="bold line-clamp-1" style={styles.AgridButtonLabel}>{label}</div>
    </div>
  );
};

const styles: any = {
  gridButton: {
    position: "relative",
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#24272C",
    // backgroundColor: "#e6e9f0",
    elevation: 5,
    rowGap: 8,
    paddingHorizontal: 5,
  },
  AgridButton: {
    position: "relative",
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#ffffff",
    // backgroundColor: "#e6e9f0",
    elevation: 5,
    rowGap: 8,
    paddingHorizontal: 5,
  },
  gridButtonIcon: {
    height: 60,
    width: 60,
    marginTop: 5,
    // color: "#B49164",
    // color: "#535c68",
    // color: "#3498db",
  },
  gridButtonLabel: {
    textAlign: "center",
    color: "#E9DDD2",
    // color: "#B49164",
    // color: "#2f3542",
    // color: "#3498db",
    fontSize: 15,
    // fontFamily: "PoppinsRegular",
  },
  AgridButtonLabel: {
    textAlign: "center",
    color: "#24272C",
    // color: "#B49164",
    // color: "#2f3542",
    // color: "#3498db",
    fontSize: 15,
    // fontFamily: "PoppinsRegular",
  },
};
