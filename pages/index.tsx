import axios from 'axios';

export default props => {
  console.log({ props });
  return (
    <ul>
      {props.data.map((item, idx) => (
        <li key={idx}>{item.park_name}</li>
      ))}
    </ul>
  );
};

const endpoint: string = 'https://www.nps.gov/nps-alerts.json?dt=159075838698';

export async function getServerSideProps(context) {
  const data = await axios.get(endpoint);
  return {
    props: {
      data: data.data,
    },
  };
}
