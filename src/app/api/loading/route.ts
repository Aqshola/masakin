import { redisClient } from "@/libs/redis";
import { getIpRequest, getLoadingRedis } from "@/utils/server/network";
import { NextRequest, NextResponse } from "next/server";
import { EventNotifier, getSSEWriter } from "ts-sse";

type SyncEvents = EventNotifier<{
  update: {
    data: any;
    comment?: string;
  };
  complete: {
    data: any;
    event: "some_event" | "some_other_event";
  };
  close: {
    data: never;
  };
  error: {
    data: never;
  };
}>;

export async function GET(request: NextRequest) {
  const ip = getIpRequest(request);
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();
  let interValCurrent: any;

  const syncStatusStream = async (notifier: SyncEvents) => {
    interValCurrent = setInterval(async () => {
      const loadingStatus = await getLoadingRedis(redisClient, ip);
      notifier.update({
        data: {
          loading: loadingStatus,
        },
      });
    }, 500);
  };

  request.signal.onabort = () => {
    clearInterval(interValCurrent);
    writer.close();
  };

  syncStatusStream(getSSEWriter(writer, encoder));
  // Return the response stream
  return new NextResponse(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
