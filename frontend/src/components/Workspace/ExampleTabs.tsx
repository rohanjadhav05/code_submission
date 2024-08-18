import { Example } from '@/utils/types/problem';
import React, { useState } from 'react';

type InputText = {
  [key: string]: any;
};


type ExampleComponentProps = {
  examples: Example[];
};

const ExampleTabs: React.FC<ExampleComponentProps> = ({ examples }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

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
      {examples.map((example, index) => (
        <div
          key={index}
          style={{ display: activeTab === index ? 'block' : 'none' }}
          className="mt-4"
        >
          <div className="font-medium text-white">Input :</div>
          {Object.entries(example.inputText).map(([key, value]) => (
            <div key={key} className="mt-2">
              <p className='text-white'>{key} : </p>
              <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-1'>
                {Array.isArray(value) ? `[${value.join(', ')}]` : value}
              </div>
            </div>
          ))}
          <br />
          <div className="font-medium text-white">Output:</div>
          <div
            className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-1'
            style={{ color: '#A8A9A9' }}
          >
            {JSON.stringify(example.outputText)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExampleTabs;
