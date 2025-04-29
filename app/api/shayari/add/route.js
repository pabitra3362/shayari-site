import { saveDailyShayari } from "@/cron/dailyShayari";


export async function GET() {
  const result = await saveDailyShayari();

  return result;
}
