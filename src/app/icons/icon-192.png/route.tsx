import { ImageResponse } from "next/og";
import { AppIconMark } from "@/lib/appIcon";

export const dynamic = "force-static";

export async function GET() {
  const size = 192;
  return new ImageResponse(<AppIconMark size={size} />, {
    width: size,
    height: size,
  });
}
