import { useEffect } from "react";
import { Axios } from "../Api/Axios";

export default function HandleSearch(
  searchName,
  searchLink,
  search,
  setSearchLoding,
  setFilteredData,
  searchDate,
  setPage,
  setTotal,
) {
  async function handleSearch() {
    setSearchLoding(true);
    try {
      const res = await Axios.post(`${searchLink}`, {
        [searchName]: search,
        date: searchDate || "",
      });

      if (res.status === 200) {
        setTotal && setTotal(res.data.length);
        setFilteredData(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoding(false);
    }
  }

  useEffect(() => {
    if (search !== "" || searchDate !== "") {
      setSearchLoding(true);
      const timeSearch = setTimeout(() => {
        searchLink && handleSearch();
      }, 500);
      return () => clearTimeout(timeSearch);
    } else {
      setSearchLoding(false);
    }
  }, [search, searchDate]);
}
