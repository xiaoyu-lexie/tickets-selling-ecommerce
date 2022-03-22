import axios from 'axios';

const LandingPage = ({currentuser}) => {
  console.log(currentuser);
  // axios.get('/api/users/currentuser')

  return <h1>Landing page</h1>
};

LandingPage.getInitialProps = async ({req}) => {
  if (typeof window === 'undefined') {
    // we are on the server
    const {data} = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
        headers: req.headers
      }
    );
    return data;
  } else {
    //we are on the client(browser)
    const {data} = await axios.get('/api/users/currentuser')
    return data;
  }


  return {}
}

export default LandingPage;