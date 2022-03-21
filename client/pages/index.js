import axios from 'axios';

const LandingPage = ({currentuser}) => {
  console.log(currentuser);
  // axios.get('/api/users/currentuser')

  return <h1>Landing page</h1>
};

LandingPage.getInitialProps = async () => {
  const response = await axios.get('/api/users/currentuser')

  return response.data;
}

export default LandingPage;