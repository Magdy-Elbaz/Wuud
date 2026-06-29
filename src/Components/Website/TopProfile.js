import StringSlice from "../../helpers/StringSlice";
import { useUser } from "../../Context/UserContext";
import TransformDate from "../../helpers/TransformDate";
import { useTheme } from "../../Context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function TopProfile(props) {
  const { user } = useUser();
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const role =
    user.role === "1995"
      ? t("Admin")
      : user.role === "1999"
        ? t("Product Manger")
        : t("User");

  return (
    <div className="w-100">
      <div className="d-flex align-items-center h-100 gap-2">
        <div className={`position-relative`}>
          {user.length === 0 ? (
            <img
              src={require(`../../Assets/user-icon.png`)}
              className="icon-user"
              width={props.settings ? "70px" : "50px"}
              height={props.settings ? "70px" : "50px"}
              alt=""
              data-aos={props.settings && "fade-right"}
            />
          ) : (
            <img
              src={!props.image ? user.avatar : props.image}
              className="icon-user rounded-circle"
              width={props.settings ? "70px" : "50px"}
              height={props.settings ? "70px" : "50px"}
              alt=""
              data-aos={props.settings && "fade-right"}
            />
          )}
        </div>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center flex-wrap gap-2">
              <h5
                className="m-0 text-capitalize"
                data-aos={props.settings && "fade-down"}
              >
                {props.settings
                  ? user.length !== 0
                    ? user.first_name + " " + user.last_name
                    : "User Name"
                  : StringSlice(
                      user.length !== 0
                        ? user.first_name
                        : "User Name",
                      10,
                    )}
              </h5>
              <span
                className="condition bg-primary text-light"
                data-aos={props.settings && "fade-down"}
              >
                {t(StringSlice(role, 10))}
              </span>
            </div>
            <button
              className={`btn ${props.settings ? "d-none" : `btn-close ${theme === "dark" && "bg-light"}`} mx-2`}
              onClick={() => (props.menuRef.current.style.display = "none")}
            />
          </div>
          <p className="m-0" data-aos={props.settings && "fade-up"}>
            {props.settings
              ? `${t("Joining date")} : ${user.length !== 0 ? TransformDate(user.created_at, i18n.language) : "-"}`
              : StringSlice(user.email || "Email", 20)}
          </p>
        </div>
      </div>
    </div>
  );
}
