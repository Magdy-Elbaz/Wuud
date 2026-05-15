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
import SkeletonPage from "../SkeletonPage";
import { ChangeAlContext } from "../../../Context/ChangeAllContext";
import StringSlice from "../../../helpers/StringSlice";

export default function CustomerOpinions({ product, commentsHome }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [lodingPublish, setLodingPublish] = useState(false);
  const { user } = useUser();
  const { addToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loding, setLoding] = useState(false);
  const { setIsChange, isChange } = useContext(ChangeAlContext);

  useEffect(() => {
    setLoding(true);
    Axios.get(`${!commentsHome ? `${Reviews}/${product.id}` : LatestReviews}`)
      .then((review) => setReviews(review.data))
      .finally(() => setLoding(false));
  }, [isChange]);

  async function handlePublish() {
    if (comment !== "") {
      setLodingPublish(true);
      try {
        const res = await Axios.post(`${Reviews}`, {
          product_id: product.id,
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

  const showReviews = reviews.map((review, key) => (
    <div
      key={key}
      className={`${commentsHome ? "w-25" : "w-50"} bg-primary ps-2 rounded-4`}
    >
      <div
        className={`${commentsHome ? "p-2" : "px-3"} w-100 bg-light rounded-3 d-flex align-items-center gap-2`}
        style={{ height: commentsHome ? "110px" : "150px" }}
      >
        <img src={review.user.avatar} width={"60px"} height={"60px"} alt="" />
        <div className="w-100">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="m-0">{review.user.name}</h4>
            {!commentsHome && <Stars product={review} />}
          </div>
          {!commentsHome && (
            <small className="text-muted">
              {formatDistanceToNow(new Date(review.created_at), {
                addSuffix: true,
              })}
            </small>
          )}
          <p>"{StringSlice(review.comment, commentsHome && 60)}"</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <h1 className="text-center fw-bold">
        Customer {commentsHome ? "Comments" : "Opinions"}
        <FontAwesomeIcon icon={faComments} className="text-primary" />
      </h1>
      {user.length !== 0 && !commentsHome && (
        <div className="d-flex align-items-center justify-content-center">
          <div className="border border-3 border-black w-50 d-flex align-items-center flex-column rounded-4">
            <p className="m-0 text-secondary my-1">
              Add your opinion about the product
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
              placeholder="What are your feelings towards this piece of furniture?"
              className="w-75 p-2 mb-3 bg-light rounded-3"
              style={{ minHeight: "90px" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="mb-3 w-75" onClick={handlePublish}>
              <BtnSubmit
                name="publish"
                width="100px"
                loding={lodingPublish}
                disabled={comment === ""}
              />
            </div>
          </div>
        </div>
      )}
      {loding ? (
        <div className="mb-5 mt-4">
          <SkeletonPage
            number={commentsHome ? 5 : 3}
            width={commentsHome ? "324px" : "660px"}
            height={commentsHome ? "110px" : "150px"}
            wrap={true}
          />
        </div>
      ) : (
        <div className="w-100 d-flex align-items-center justify-content-center flex-wrap gap-2 my-5">
          {showReviews}
        </div>
      )}
    </div>
  );
}
