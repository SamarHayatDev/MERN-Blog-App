const { NextResponse } = require("next/server");

export async function GET(request) {
  console.log("Blog GET Hit");
  return NextResponse.json({ msg: "Api Working" });
}
