import imgLow from "@/assets/kinder01.png";
const ElementLow = () => {
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={imgLow} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="http://localhost:5000/uploads/1716692972912-KakaoTalk_20240526_110240416.jpg"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="http://localhost:5000/uploads/1716692972912-KakaoTalk_20240526_110240416.jpg"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ElementLow;
