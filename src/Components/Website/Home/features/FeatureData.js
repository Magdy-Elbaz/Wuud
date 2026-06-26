import {
  faBagShopping,
  faBox,
  faHeadset,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import i18n from "i18next";

export const FeatureData = [
  {
    title: "Free Shipping",
    description: "We deliver to your doorstep for free on all orders.",
    icon: faTruck,
    animation: i18n.language === "en" ? "fade-right" : "fade-left",
  },
  {
    title: "100% Secure Payment",
    description: "Pay with complete security — your data is fully protected",
    icon: faBagShopping,
    animation: "fade-up",
  },
  {
    title: "Great Support 24x7",
    description: "Our team is available 24/7 to answer any questions.",
    icon: faHeadset,
    animation: "fade-up",
  },
  {
    title: "Money - Returns",
    description: "Don't like the product? Return it easily for a full refund.",
    icon: faBox,
    animation: i18n.language === "ar" ? "fade-right" : "fade-left",
  },
];
