import axios from 'axios';
import Props from '../types/props';

export default (props: Props) => {
  console.log({ props });
  return (
    <ul>
      {props.data.map((item, idx: number) => (
        <li key={idx}>{item.park_name}</li>
      ))}
    </ul>
  );
};

const endpoint: string = 'https://www.nps.gov/nps-alerts.json?dt=159075838698';

export async function getServerSideProps() {
  const data = await axios.get(endpoint);
  return {
    props: {
      data: data.data,
    },
  };
}
