import { useEffect, useState } from "react";
import TrainingCard from "./TrainingCard";
import TrainingEditor from "./TrainingEditor";

const TrainingIndex = () => {
  const [trainings, setTrainings] = useState([]);

  const addTraining = (training) => {
    setTrainings([...trainings, training]);
    console.log(training, "동작했다 App");
  };
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch("http://localhost:5000/trainingShow");
        const data = await response.json();
        setTrainings(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTrainings();
  }, []);
  console.log(trainings, "Index");

  return (
    <>
      <TrainingEditor addTraining={addTraining}></TrainingEditor>

      <div className="container">
        {trainings.map((training, index) => (
          <div className="item" key={index}>
            <TrainingCard
              name={training.name}
              price={training.price}
              dtoContent={training.dtoContent}
              trainTerm={training.trainTerm}
              chipCartData={training.chipCartData}
              trainingId={training.trainingId}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TrainingIndex;
