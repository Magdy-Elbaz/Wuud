import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import lodingAnimation from "../../Assets/loding/lottieflow-loading.json";
import cartAnimation from "../../Assets/loding/lottieflow-loading-addcart.json";
import checkAnimation from "../../Assets/loding/lottieflow-loading-checkout.json";
import saveAnimation from "../../Assets/loding/lottieflow-loading-save.json";
import globalAnimationWhite from "../../Assets/loding/lottieflow-loading-global-white.json";
import globalAnimationPrimary from "../../Assets/loding/lottieflow-loading-global-primary.json";
import "./loding.css";
import { useTheme } from "../../Context/ThemeContext";

export default function Loding(props) {
  const theme = useTheme();

  return (
    <div
      className={`d-flex align-items-center justify-content-center ${!props.action && "spinner-countiner"} ${!props.action && (theme === "light" ? "bg-light" : "bg-dark-card")} `}
    >
      {props.action ? (
        <div
          style={{
            width: props.animationCheckout ? "25px" : "20px",
            height: props.animationCheckout ? "25px" : "20px",
          }}
        >
          <DotLottieReact
            data={
              props.animationCheckout
                ? checkAnimation
                : props.animationSave
                  ? saveAnimation
                  : props.animationAddcart
                    ? cartAnimation
                    : props.primaryLoding
                      ? globalAnimationPrimary
                      : globalAnimationWhite
            }
            width={"100%"}
            height={"100%"}
            loop
            autoplay
          />
        </div>
      ) : (
        <div>
          <DotLottieReact
            data={lodingAnimation}
            width={"120px"}
            height={"120px"}
            loop
            autoplay
          />
        </div>
      )}
    </div>
  );
}
