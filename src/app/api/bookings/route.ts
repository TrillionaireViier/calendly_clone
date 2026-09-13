import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, title, date, time } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = `🔔 *New Booking Received!*\n\n*Event:* ${title}\n*Date:* ${date}\n*Time:* ${time}`;
      
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    } else {
      console.warn("Telegram bot token or chat ID is missing. Notification not sent.");
    }

    // In a real application, we would save this to a database here.
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
  }
}
