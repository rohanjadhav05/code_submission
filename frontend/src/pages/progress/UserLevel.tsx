import React, { useState } from 'react';

// Define styles as a JavaScript object
const styles = {
  progressContainer: {
    textAlign: 'center' as 'center',
    fontFamily: 'Arial, sans-serif',
    background: '#121212', // Black background
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    color: '#e0e0e0',
  },
  matrix: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    margin: '0 auto',
    maxWidth: '600px',
    position: 'relative' as 'relative',
  },
  row: {
    display: 'flex',
  },
  cell: {
    position: 'relative' as 'relative',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    borderRadius: '12px',  // Rounded corners
    backgroundColor: '#333333', // Dark gray for cells
    color: '#e0e0e0',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s',
    cursor: 'pointer' as 'pointer',
  },
  activeCell: {
    backgroundColor: '#ffeb3b', // Yellow background for current level
    color: '#333333',
  },
  completedCell: {
    backgroundColor: '#4caf50', // Green background for completed levels
    color: '#fff',
  },
  incompleteCell: {
    backgroundColor: '#333333', // Dark gray background for incomplete levels
    color: '#e0e0e0',
    textDecoration: 'line-through' as 'line-through',
  },
  messageBox: {
    position: 'absolute' as 'absolute',
    bottom: '-70px', // Adjust based on the height of the cell
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    backgroundColor: '#444',
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    whiteSpace: 'nowrap',
    zIndex: 1,
    fontSize: '14px',
    textAlign: 'left' as 'left',
    maxWidth: '200px',
    boxSizing: 'border-box' as 'border-box',
  },
  messageLink: {
    color: '#4caf50', // Green color for the link
    textDecoration: 'underline' as 'underline',
    cursor: 'pointer' as 'pointer',
  },
  nextButton: {
    marginTop: '20px',
    padding: '12px 24px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#2196f3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer' as 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  nextButtonHover: {
    backgroundColor: '#1976d2',
  },
  nextButtonActive: {
    transform: 'scale(0.98)',
  },
};

const ProgressLevel: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  // Create a 10x10 matrix of levels from 1 to 100
  const levels = Array.from({ length: 10 }, (_, row) =>
    Array.from({ length: 10 }, (_, col) => row * 10 + col + 1)
  );

  // Function to handle the button click
  const handleNextLevel = () => {
    setCurrentLevel(prevLevel => Math.min(prevLevel + 1, 100));
  };


  const getDetailedMessage = (level: number) => {
    if (level <= currentLevel) {
      return (
        <>
          <div>{level === currentLevel? "In progress" : "Completed"}</div>
        </>
      );
    }
    return 'pending';
  };

  return (
    <div style={styles.progressContainer}>
      <div style={styles.matrix}>
        {levels.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.row}>
            {row.map(level => {
              const isCompleted = level < currentLevel;
              const isActive = level === currentLevel;
              const cellStyle = {
                ...styles.cell,
                ...(isActive ? styles.activeCell : isCompleted ? styles.completedCell : styles.incompleteCell),
              };

              return (
                <div
                  key={level}
                  style={cellStyle}
                  onMouseEnter={() => setHoveredLevel(level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                >
                  {level}
                  {hoveredLevel === level && (
                    <div style={styles.messageBox}>
                      {getDetailedMessage(level)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button
        onClick={handleNextLevel}
        style={styles.nextButton}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.nextButtonHover.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.nextButton.backgroundColor}
        onMouseDown={(e) => e.currentTarget.style.transform = styles.nextButtonActive.transform}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Next Level
      </button>
    </div>
  );
};

export default ProgressLevel;