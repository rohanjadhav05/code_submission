import { Example } from '@/utils/types/problem';
import React, { useState } from 'react';


type ExampleComponentProps = {
  examples: Example[];
  testCase1: Record<string, any>;
  testCase2: Record<string, any>;
  setTestCase1: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setTestCase2: React.Dispatch<React.SetStateAction<Record<string, any>>>;

};

const ExampleTabs: React.FC<ExampleComponentProps> = ({ examples, testCase1, testCase2, setTestCase1, setTestCase2 }) => {
  
  const [activeTab, setActiveTab] = useState<number>(0); // 0 for Case 1, 1 for Case 2
  const [isEdited1, setisEdited1] = useState<Boolean>(false);
  const [isEdited2, setisEdited2] = useState<Boolean>(false);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleInputChange = (key: string, value: string): void => {
    if (activeTab === 0) {
      // Update state for Test Case 1
      setisEdited1(true);
      setTestCase1((prevTestCase) => {
        let updatedValue: any[];
        const currentValue = prevTestCase[key];

        if (Array.isArray(currentValue)) {
          updatedValue = value
            .slice(1, -1) // Remove brackets
            .split(',')  // Split by comma
            .map(item => item.trim()); // Trim spaces
        } else {
          updatedValue = [value];
        }

        return {
          ...prevTestCase,
          [key]: updatedValue,
        };
      });
    } else if (activeTab === 1) {
      // Update state for Test Case 2
      setisEdited2(true);
      setTestCase2((prevTestCase) => {
        let updatedValue: any[];
        const currentValue = prevTestCase[key];

        if (Array.isArray(currentValue)) {
          updatedValue = value
            .slice(1, -1) // Remove brackets
            .split(',')  // Split by comma
            .map(item => item.trim()); // Trim spaces
        } else {
          updatedValue = [value];
        }

        return {
          ...prevTestCase,
          [key]: updatedValue,
        };
      });
    }
  };

   // Select the active test case based on the tab
   const activeTestCase = activeTab === 0 ? testCase1 : testCase2;

   return (
    <div className='example-tabs-container'>
      {/* Tab Headers */}
      <div className="flex">
        {examples.map((_, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 ml-2 ${
              activeTab === index
                ? 'bg-customGray rounded-lg text-white'
                : '#A8A9A9 rounded-lg text-gray-400'
            }`}
          >
            Case {index + 1}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 overflow-auto">
        <div
          style={{ display: activeTab === 0 ? 'block' : 'none' }}
          className="mt-4"
        >
          <div className="font-medium" style={{ color: "#A8A9A9" }}>Input :</div>
          {Object.entries(testCase1).map(([key, value]) => (
            <div key={key} className="mt-2">
              <p style={{ color: "#A8A9A9" }}>{key} = </p>
              <textarea
                className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-1'
                value={Array.isArray(value) ? `[ ${value.join(', ')} ]` : value}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))}
          <br />
          { !isEdited1 && ( 
              <>
                <div className="font-medium" style={{ color: "#A8A9A9" }}>Output = </div>
                <div
                  className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-1'
                  style={{ color: '#A8A9A9' }}
                >
                  { JSON.stringify(examples[0].outputText) }
                </div>
              </>
            )
          }
          
        </div>
        <div
          style={{ display: activeTab === 1 ? 'block' : 'none' }}
          className="mt-4"
        >
          <div className="font-medium" style={{ color: "#A8A9A9" }}>Input :</div>
          {Object.entries(testCase2).map(([key, value]) => (
            <div key={key} className="mt-2">
              <p style={{ color: "#A8A9A9" }}>{key} = </p>
              <textarea
                className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-1'
                value={Array.isArray(value) ? `[ ${value.join(', ')} ]` : value}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))}
          <br />
          {
            !isEdited2 && (
              <>
                <div className="font-medium" style={{ color: "#A8A9A9" }}>Output = </div>
                  <div
                    className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-1'
                    style={{ color: '#A8A9A9' }}
                  >
                    { JSON.stringify(examples[1].outputText) }
                  </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ExampleTabs;
