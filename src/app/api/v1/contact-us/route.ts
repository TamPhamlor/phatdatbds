import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (API_KEY) {
      headers["X-API-Key"] = API_KEY;
    }

    const response = await fetch(
      `${API_URL}/api/v1/contact-us`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Gửi yêu cầu thất bại", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xử lý yêu cầu" },
      { status: 500 }
    );
  }
}
