import { useState } from "react";

// import { getItemWithExpiration } from "../../../../Assets/Variables/functions"; // pour version API

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

export default function UpdateProfile({ user }) {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [position, setPosition] = useState(user.position);
  const [email, setEmail] = useState(user.email);
  // const [msg, setMsg] = useState("");
  // const [msg2, setMsg2] = useState("");

  /*  async function handleSubmit(e) {
    e.preventDefault();
    
    const TOKEN = getItemWithExpiration("auth");
    
     const res = await fetch(FETCH_URL + "users/update/" + user.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authentication" : `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ pseudo, firstname, bio, email, id: user.id }),
    });
    const json = await res.json();
    setMsg(json.msg);
    setMsg2(json.msg2);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.length <= 200) {
      setBio(input);
    }
  }; */

  return (
    <>
      <h3>Modifier vos informations</h3>

      <div className="informations-update">
        <form /* onSubmit={handleSubmit} */>
          <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            name="firstname"
            placeholder="firstname"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            name="lastname"
            placeholder="lastname"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <label htmlFor="position">Poste</label>
          <input
            type="text"
            name="position"
            placeholder="position"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* {msg && <p className="green non-absolute">{msg}</p>}
          {msg2 && <p className="red non-absolute">{msg2}</p>} */}

          <button type="submit">
            Modifier
          </button>
        </form>
      </div>
    </>
  );
}
