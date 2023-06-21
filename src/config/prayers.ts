import moment from "moment";

type Prayers = {
  fajr: string;
  duhr: string;
  asr: string;
  maghrb: string;
  ishaa: string;
};

export const getPrayers = async (): Promise<Prayers | null | undefined> => {
  try {
    const date = moment().format("DD-MM-YYYY");
    const url = `http://api.aladhan.com/v1/timings/${date}?latitude=21.422547464888435&longitude=39.826183447419844`;
    const response = await fetch(url);
    if (response && response.status === 200) {
      const data = await response.json();
      const timings = data.data.timings;
      return {
        fajr: timings["Fajr"],
        duhr: timings["Dhuhr"],
        asr: timings["Asr"],
        maghrb: timings["Maghrib"],
        ishaa: timings["Isha"],
      };
    }

    return null;
  } catch (err) {
    console.log(`getPrayers: ${err}`);
  }
};
