import { NextResponse } from "next/server";
import { Resend } from "resend";

type FeedbackRequest = {
  message: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FeedbackRequest;

    console.log(body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const res = await resend.emails.send({
      from: "feedback@error-interactive.com",
      to: "christopher@error-interactive.com",
      subject: "Julehjelp - Feedback",
      text: body.message,
    });

    console.log(res);

    return NextResponse.json(
      { message: "Feedback sent" },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send feedback" },
      { status: 500 },
    );
  }
}
