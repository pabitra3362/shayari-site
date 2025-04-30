import cron from "node-cron";
import { generateShayari } from "@/lib/ai/generateShayari";
import { saveShayari } from "@/lib/controllers/shayariController";
import { automaticDeleteShayariService } from "@/lib/services/shayariService";
import { serverError, success } from "@/lib/response";



// cron job hatao
export async function saveDailyShayari() {
  try {
    cron.schedule("0 0 * * *", async () => {
      const shayaries = await generateShayari();

      const saveShayaries = await saveShayari(shayaries);

      console.log("data added successfully");

      return true;
    });
  } catch (error) {
    console.log("error while adding data automatically: ", error.message);
    return false;
  }
}

export async function deleteOldShayari() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const currentDate = new Date();

      const lastWeekDate = new Date(
        currentDate.setDate(currentDate.getDate() - 7)
      );

      const deleteShayaries = await automaticDeleteShayariService(lastWeekDate);

      console.log(
        `deleted ${deleteShayaries.count} shayaris older than 7 days`
      );

      return true;

    } catch (error) {
      console.error(
        "error while deleting old data automatically: ",
        error.message
      );

      return false;
    }
  });
}
