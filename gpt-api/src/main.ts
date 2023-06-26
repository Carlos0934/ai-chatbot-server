import "https://deno.land/std@0.192.0/dotenv/load.ts";
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

import botService from "./config/bot.config.ts";

function reqHandler(req: Request) {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket: ws, response } = Deno.upgradeWebSocket(req);
  ws.onmessage = async (event: MessageEvent) => {
    const { message, userId } = JSON.parse(event.data);

    const response = await botService.handle({ message, userId });
    console.log(response.content);
    return event.data;
  };

  return response;
}

serve(reqHandler);
