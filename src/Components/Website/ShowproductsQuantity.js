import { useTranslation } from "react-i18next";

export default function ShowProductsQuantity({ stock }) {
  const { t } = useTranslation();

  return stock === 0 ? (
    <p className="m-0 fs-6 text-danger">{t("Not currently available")}</p>
  ) : stock <= 10 ? (
    <p className="m-0 text-danger d-flex align-items-center gap-2">{t(`There is only left `) + stock }</p>
  ) : (
    <p className="m-0 text-success">{t('Available')}</p>
  );
}
