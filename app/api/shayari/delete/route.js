
import { deleteOldShayari } from "@/cron/dailyShayari";

export async function GET() {
  const result = await deleteOldShayari();

  return result;
}
