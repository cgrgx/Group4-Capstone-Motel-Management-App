import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Heading from "../../ui/Heading";

const startData = [
  {
    duration: "1 night",
    value: 0,
    color: "#f94144",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#43aa8b",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#4d908e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#577590",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#277da1",
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.num_nights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const data = prepareData(startData, confirmedStays);
  return (
    <div className="col-span-2 rounded-md border border-gray-200 bg-gray-50  p-6 shadow-sm">
      <div className="mb-12 border-b border-gray-300 pb-6 uppercase">
        <Heading as="h2">Stay duration summary</Heading>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
                value={entry.value}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            iconType="circle"
            iconSize={15}
            align="right"
            width="30%"
            layout="vertical"
            verticalAlign="middle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationChart;
