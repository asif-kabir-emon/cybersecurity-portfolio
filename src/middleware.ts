import { NextResponse } from "next/server";
import initializeApp from "./lib/initialize";

export async function middleware() {
  // await initializeApp();
  return NextResponse.next();
}
