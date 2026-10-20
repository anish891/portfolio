import type { ComponentType } from "react";
import { HashChain } from "@/components/lab/HashChain";
import { MaxPain } from "@/components/lab/MaxPain";
import { Ransac } from "@/components/lab/Ransac";
import { Welford } from "@/components/lab/Welford";

export const labDemos: Record<string, ComponentType> = {
  "hash-chain": HashChain,
  ransac: Ransac,
  welford: Welford,
  "max-pain": MaxPain,
};
