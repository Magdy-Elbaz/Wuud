import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stars from "./Stars";
import { Form } from "react-bootstrap";
import BtnSubmit from "../../Btn/BtnSubmit";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { LatestReviews, Reviews } from "../../../Api/Api";
import { useUser } from "../../../Context/UserContext";
import { useToast } from "../../../Context/Toast Notification/ToastNotification";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import SkeletonPage from "../SkeletonPage";
import { ChangeAlContext } from "../../../Context/ChangeAllContext";
import StringSlice from "../../../helpers/StringSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { WindowSize } from "../../../Context/WindowContext";
import { useTheme } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function CustomerOpinions({ product, commentsHome, id }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [lodingPublish, setLodingPublish] = useState(false);
  const { user } = useUser();
  const { addToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loding, setLoding] = useState(true);
  const { setIsChange, isChange } = useContext(ChangeAlContext);
  const { windowSize } = useContext(WindowSize);
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLoding(true);
    Axios.get(`${!commentsHome ? `${Reviews}/${id}` : LatestReviews}`)
      .then((review) => setReviews(review.data))
      .finally(() => setLoding(false));
  }, [isChange, id, commentsHome]);

  async function handlePublish() {
    if (comment !== "") {
      setLodingPublish(true);
      try {
        const res = await Axios.post(`${Reviews}`, {
          product_id: id,
          user_id: user.id,
          comment: comment,
          rating: rating,
        });

        addToast(res.data.message);
        setComment("");
        setRating(0);
        setIsChange((prev) => !prev);
      } catch (err) {
        console.log(err);
      } finally {
        setLodingPublish(false);
      }
    }
  }

  const showReviews = reviews.map((review, key) =>
    windowSize <= "991" && commentsHome ? (
      <SwiperSlide
        key={key}
        style={{
          padding: "20px 0 35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className={`${commentsHome ? "col-10 col-md-5 col-lg-3" : "w-50"} bg-primary ${i18n.language === "ar" ? "pe-2" : "ps-2"} rounded-4`}
          data-aos="fade-right"
        >
          <div
            className={`${commentsHome ? "p-2" : "p-3"} w-100 ${theme === "light" ? "bg-light-card" : "bg-dark-card"} rounded-3 d-flex align-items-center gap-2`}
            style={{ height: commentsHome ? "110px" : "fit-content" }}
          >
            <img
              src={review.user.avatar}
              width={"60px"}
              height={"60px"}
              className="icon-user"
              alt=""
            />
            <div className="w-100">
              <div className="d-flex align-items-center justify-content-between">
                <h4
                  className={`m-0 text-capitalize ${theme === "dark" && "text-light"}`}
                >
                  {review.user.first_name + " " + review.user.last_name}
                </h4>
                {!commentsHome && <Stars product={review} />}
              </div>
              <small
                className={`${theme === "dark" ? "text-light" : "text-muted"}`}
              >
                {formatDistanceToNow(new Date(review.created_at), {
                  locale: i18n.language === "ar" ? ar : undefined,
                  addSuffix: true,
                })}
              </small>
              <p className="m-0">
                "{StringSlice(review.comment, commentsHome && 40)}"
              </p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ) : (
      <div
        key={key}
        className={`${commentsHome ? "col-10 col-md-5 col-lg-3 bg-primary" : "col-11 col-md-6"} ${i18n.language === "ar" ? "pe-2" : "ps-2"} rounded-4`}
        data-aos="fade-right"
      >
        <div
          className={`${commentsHome ? `gap-2 p-2` : "p-3 gap-4 shadow"} ${theme === "light" ? "bg-light-card" : "bg-dark-card"} w-100 rounded-3 d-flex align-items-center`}
          style={{ height: commentsHome ? "110px" : "fit-content" }}
        >
          <img
            src={review.user.avatar}
            width={"60px"}
            height={"60px"}
            className="icon-user"
            alt=""
          />
          <div className="w-100">
            <div className="d-flex align-items-center justify-content-between">
              <h4
                className={`m-0 text-capitalize ${theme === "dark" && "text-light"}`}
              >
                {StringSlice(
                  review.user.first_name + " " + review.user.last_name,
                  commentsHome ? 15 : 20,
                )}
              </h4>
              {!commentsHome && <Stars product={review} />}
            </div>
            <small
              className={`${theme === "dark" ? "text-light" : "text-muted"}`}
            >
              {formatDistanceToNow(new Date(review.created_at), {
                locale: i18n.language === "ar" ? ar : undefined,
                addSuffix: true,
              })}
            </small>
            <p className="m-0">
              "{StringSlice(review.comment, commentsHome && 50)}"
            </p>
          </div>
        </div>
      </div>
    ),
  );

  return (
    <div>
      <h1 className="text-center fw-bold" data-aos="zoom-in">
        {t(commentsHome ? t("Customer Comments") : "Customer Opinions")}
        <FontAwesomeIcon icon={faComments} className="text-primary" />
      </h1>
      {user.length !== 0 && !commentsHome && (
        <div
          className={`m-auto mt-4 shadow col-10 col-md-6 d-flex align-items-center flex-column rounded-4 ${theme === "light" ? "bg-light-card" : "bg-dark-card text-light"}`}
        >
          <p className="m-0 text-secondary my-1">
            {t("Add your opinion about the product")}
          </p>
          <div className="mb-3">
            <Stars
              product={product}
              setRating={setRating}
              rating={rating}
              action={true}
            />
          </div>
          <Form
            as={"textarea"}
            placeholder={t(
              "What are your feelings towards this piece of furniture?",
            )}
            className={`w-75 p-2 mb-3 ${theme === "light" ? "bg-light-card" : "bg-dark-card text-light"} rounded-3`}
            style={{ minHeight: "90px" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="mb-3 w-75" onClick={handlePublish}>
            <BtnSubmit
              name={t("publish")}
              width="100px"
              loding={lodingPublish}
              disabled={comment === ""}
              animationSave={true}
            />
          </div>
        </div>
      )}
      {loding ? (
        <div className="mb-5 mt-4">
          <SkeletonPage
            number={
              commentsHome
                ? windowSize <= "768"
                  ? 1
                  : windowSize <= "991"
                    ? 2
                    : 5
                : 3
            }
            width={commentsHome ? "324px" : "660px"}
            height={commentsHome ? "110px" : "150px"}
            wrap={true}
          />
        </div>
      ) : (
        <div className="w-100 d-flex align-items-center justify-content-center flex-wrap gap-3 my-5">
          {reviews.length !== 0 ? (
            windowSize <= "991" && commentsHome ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={windowSize <= "768" ? 30 : -20}
                slidesPerView={windowSize <= "991" && 1}
                navigation={windowSize <= "768" ? false : true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 10000, disableOnInteraction: false }}
                className="mask-img"
              >
                {showReviews}
              </Swiper>
            ) : (
              showReviews
            )
          ) : (
            <p
              className={`p-3 shadow-lg rounded-3 ${theme === "light" ? "bg-light" : "bg-dark-card"}`}
            >
              {t("Be the first to share your thoughts!")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
