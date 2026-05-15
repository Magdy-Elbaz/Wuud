const data = [
  {
    date: "2020",
    description:
      "Just a dream in a small workshop, where we passionately began exploring the secrets of natural wood.",
  },
  {
    date: "2023",
    description:
      "We launched the 'The Wood Soul' collection, which combines luxury and comfort, and we reached more than 500 Egyptian homes.",
  },
  {
    date: "2026",
    description:
      "We aspire to be the first destination for anyone looking for a piece of furniture that lasts forever and mimics nature.",
  },
];

export default function OurJourney() {
  const showData = data.map((data) => (
    <div className="d-flex flex-md-column align-items-center gap-5 my-3 my-md-0">
      <p className="date text-center m-0">{data.date}</p>
      <div className="bg-light p-2 timeline-content rounded-3 position-relative">
        <p>{data.description}</p>
      </div>
    </div>
  ));
  return (
    <div className="timeline position-relative d-block d-md-flex align-items-center justify-content-between my-5">
      {showData}
    </div>
  );
}
