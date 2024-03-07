 import { useEffect, useState } from "react";
import StockTable from "../StockTable/StockTable";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Positions() {
  const [positions, setPositions] = useState([{}]);
  const [isLoading,setLoading]=useState(true)
  const [cookies]=useCookies()
  const getPositions = async () => {
    const url = "/api/positions";
    const options = {
      method: "GET",
      headers: {
        "access-token": cookies.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const postionsResponse = await fetch(url, options);
    const positionsData = await postionsResponse.json();
    console.log(positionsData);
    setPositions(positionsData);
    setLoading(false)
  };
  useEffect(() => {
    getPositions()
    const id=setInterval(()=>{
      getPositions();
    },5000)
    return ()=>{
      clearInterval(id)
    }
  }, []);
  return (
    <>
      <h3>Positions</h3>
      <StockTable positions={positions} isLoading={isLoading}/>
    </>
  );
}

export default Positions;