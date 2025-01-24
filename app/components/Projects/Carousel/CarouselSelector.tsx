import styles from '../styles.module.css';

type Props = {
  projectIndex: number;
  setProjectIndex: React.Dispatch<React.SetStateAction<number>>;
  projectsLength: number;
};

const CarouselSelector = ({
  projectIndex,
  setProjectIndex,
  projectsLength,
}: Props) => {
  const handleDecrement = () => {
    if (projectIndex <= 0) {
      setProjectIndex(projectsLength - 1);
    } else {
      setProjectIndex((prevState) => prevState - 1);
    }
  };

  const handleIncrement = () => {
    if (projectIndex >= projectsLength - 1) {
      setProjectIndex(0);
    } else {
      setProjectIndex((prevState) => prevState + 1);
    }
  };

  return (
    <div className={styles.carouselSelector}>
      <button type="button" onClick={handleDecrement}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.chevron}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {Array.from({ length: projectsLength }, (_, i) => {
        if (i === projectIndex) {
          return (
            <button
              type="button"
              className={`${styles.dot} ${styles.active}`}
              onClick={() => setProjectIndex(i)}
              key={i}
            />
          );
        }
        return (
          <button
            type="button"
            className={`${styles.dot}`}
            onClick={() => setProjectIndex(i)}
            key={i}
          />
        );
      })}

      <button type="button" onClick={handleIncrement}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.chevron}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default CarouselSelector;
