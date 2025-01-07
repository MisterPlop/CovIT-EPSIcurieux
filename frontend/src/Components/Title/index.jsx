import { faArrowLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Title({ title }) {
  return (
    <section className={!title ? "hidden" : "section-title laptopAndDesktop-hidden"}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <h4>{title}</h4>
        <FontAwesomeIcon icon={faEllipsis} />
    </section>
  );
}