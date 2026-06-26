import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { Axios } from "../../Api/Axios";
import { CATEGORY, productsSearch, shopSearch } from "../../Api/Api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function PageHeader(props) {
  const theme = useTheme();
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const NameSearch =
    props.title === "Category"
      ? `${CATEGORY}/${id}/${productsSearch}`
      : shopSearch;

  const options = [
    { value: "newest", label: t("Newest") },
    { value: "price-min", label: t("Price: from the minimum") },
    { value: "price-max", label: t("Price: from the maximum") },
  ];

  async function handleSearch() {
    props.setLoding(true);
    try {
      const res = await Axios.get(
        `${NameSearch}?search=${props.search}&limit=${props.limit}&sort=${props.selectedOption.value}`,
      );
      if (res.status === 200) {
        props.setData(
          props.title === "Category" ? res.data.products : res.data.data,
        );
        props.setTotalCategories(res.data.total_categories);
      }
    } catch (err) {
      console.log(err);
    } finally {
      props.setLoding(false);
    }
  }

  useEffect(() => {
    const timeSearch = setTimeout(() => {
      props.search !== "" && handleSearch();
    }, 500);

    return () => clearTimeout(timeSearch);
  }, [props.search, props.limit, props.selectedOption.value]);

  return (
    <div
      className="mt-3 d-flex align-items-center flex-wrap justify-content-between gap-2"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <h2 className="text-primary text-nowrap fw-bold" data-aos="fade-right">
        {props.title}
      </h2>
      <form
        className="form-floating position-relative col-12 col-lg-6 order-3 order-lg-2"
        data-aos="zoom-in"
      >
        <Form.Control
          type="search"
          value={props.search}
          className={`form-control ${theme === "dark" ? "bg-dark-card" : "bg-light-card"} ${i18n.language === "en" && "pe-5" } search-cancel-button placeholder-light text-dark py-1 px-2 mt-1 rounded-4`}
          id="floatingInputValue"
          onChange={(e) => props.setSearch(e.target.value)}
          placeholder={t("Search")}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={`position-absolute icon-search ${i18n.language === "ar" ? "ar" : "en"} text-primary`}
        />
      </form>
      <div
        className="d-flex align-items-center z-1 gap-2 order-2 order-lg-3"
        data-aos="fade-left"
      >
        <span className="text-nowrap">{t("sort by")} :</span>
        <Select
          options={options}
          isSearchable={false}
          value={props.selectedOption}
          onChange={props.setSelectedOption}
          defaultValue={options[0]}
          className={`${theme === "light" ? "bg-light-card" : "bg-dark-card"}`}
        />
      </div>
    </div>
  );
}
