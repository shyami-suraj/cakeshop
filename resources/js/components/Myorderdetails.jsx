import React,{useState} from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Table = styled.table`
height:90vh;

`;
const Tr = styled.tr`


 `;
const Th = styled.th`
/* width:100%, */
font-size:30px;
color:#EC407A;

  `;
const Td = styled.td`
width:300px;
text-align:center;
   `;
   const Hr = styled.hr`
   font-size:20px ;
   width:95%;


   `;
const Button = styled.button`
width: 50%;
padding: 10px;
background-color: #EC407A;
color: white;
border: none;
font-weight: 600;
cursor: pointer;


`;

const Myorderdetails = () => {

 let navigate = useNavigate()
 const routesingleorder = (id) => {
     let path = `/@/Mysingleorder/${id}`;
     navigate(path);
 }

    // fetching data from database using api
    console.log((localStorage.getItem('user_id')));
    const user_id = localStorage.getItem('user_id');
    const [order, setOrder] = useState();

    const fetchUserData = () => {


        fetch("http://127.0.0.1:8000/api/ordershow/" + user_id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("fetch Order data:", data.data);

                if (data.status == "success") {
                    setOrder(data.data);
                    console.log("fetch Order data:", data.data);
                }
                else {
                    "Error on data fetching."
                }

            })
    }



    React.useEffect(() => {
        // Update the document title using the browser API
        fetchUserData();

    },
        []);
  return (
    <Table>
                <Tr>
                    <Th>Order Id</Th>
                    <Th>Order Date</Th>
                    <Th>Total</Th>
                    <Th>View</Th>

                </Tr>

                <Tr>
                <Td colSpan={4}>
                <Hr/>

                </Td>
                </Tr>

                {order &&order.map((item,index) => (
                            <Tr>
                                <Td>#{item.id}</Td>
                                <Td>{item.created_at.toString().substr(0,10)}</Td>
                                <Td>Rs.{item.total}</Td>
                                <Td><Button onClick={()=>{routesingleorder(item.id)}}>view</Button></Td>
                            </Tr>
                        ))}


            </Table>
  )
}

export default Myorderdetails
