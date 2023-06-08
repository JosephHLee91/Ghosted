import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import pattern from 'patternomaly';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { chart } from '../interfaces/interfaces';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Chart: React.FC<chart> = ({ jobs, reduceData, dataField, title }) => {
  const [actualData, setActualData] = useState<any>([]);

  const data = {
    labels: actualData.map((label: any) => label.title),
    datasets: [
      {
        label: 'Amount',
        data: actualData.map((label: any) => label.amount),
        backgroundColor: [
          pattern.draw('line-vertical', 'rgba(99, 102, 241, 0.2)'),
          pattern.draw('diagonal-right-left', 'rgba(199, 210, 254, 0.3)'),
        ],
        borderColor: ['rgba(99, 102, 241, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    setActualData(reduceData(jobs, dataField));
  }, []);

  return (
    <Pie
      data={data}
      options={{
        plugins: {
          title: {
            display: true,
            text: `${title}`,
            align: 'center',
            font: {
              size: 17,
            },
          },
        },
      }}
    />
  );
};

export default Chart;
