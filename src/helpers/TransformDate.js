export default function TransformDate(date, long) {
  const selectedDate = new window.Date(date);
  const getFullYear = selectedDate.getFullYear();
  const getMonth = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
  const getDay = selectedDate.getDate().toString().padStart(2, "0");

  // تحويل الأرقام الإنجليزية لأرقام عربية أوتوماتيكياً
  return (
    new Intl.NumberFormat(long === "ar" ? "ar-EG" : "en", {
      useGrouping: false,
    }).format(getFullYear) +
    "-" +
    new Intl.NumberFormat(long === "ar" ? "ar-EG" : "en").format(getMonth).padStart(2, long === "ar" ? "٠" : "0") +
    "-" +
    new Intl.NumberFormat(long === "ar" ? "ar-EG" : "en").format(getDay).padStart(2, long === "ar" ? "٠" : "0")
  );
}
