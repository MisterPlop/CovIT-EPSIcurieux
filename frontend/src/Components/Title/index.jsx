import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Title({ title }) {
  return (
    <section className={!title ? "hidden" : "section-title"}>
        <h4>{title}</h4>
        <FontAwesomeIcon icon={faCircleUser} />
    </section>
  );
}