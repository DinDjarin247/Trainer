import * as React from "react";
import { useEffect, useState } from "react";
import ProfPageEditor from "./ProfPageEditor";

import ProfPage from "./ProfPage"; // Ensure you have this import for the ProfPage component

import styles from "./ProfIndex.module.css";
import ProfSearch from "./ProfSearch";

export default function ProfIndex() {
  const [persons, setPersons] = useState([]);

  const addPerson = (person) => {
    setPersons([...persons, person]);
    console.log(person, "동작했다 App");
  };
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await fetch("http://localhost:5000/persons");
        const data = await response.json();
        setPersons(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPersons();
  }, []);
  console.log(persons, "Index");

  return (
    <>
      <ProfPageEditor addPerson={addPerson}></ProfPageEditor>

      <div className={styles.container}>
        {persons.map((person, index) => (
          <div className={styles.item} key={index}>
            <ProfPage
              name={person.name}
              age={person.age}
              image={person.image}
              content={person.content}
              classStartDate={person.classStartDate}
              chipCartData={person.chipCartData}
              personId={person.personId}
            />
          </div>
        ))}
      </div>
    </>
  );
}
