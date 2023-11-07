import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`


`;
const Table = styled.table``;
const Tr = styled.tr``;
const Th = styled.th`
    /* width:100%, */
    font-size: 30px;
    color: #ec407a;
`;
const Td = styled.td`
    width: 300px;
    text-align:jus;
    text-align: center;
    font-size: 25px;
    vertical-align:top;
`;
const Hr = styled.hr`
    font-size: 20px;
    width: 95%;
`;
const Image = styled.img`
    width: 120px;
    height: 150px;
    margin: 10px;
`;
const Right = styled.div`

align-self:right;
display:flex;


`;

const Table1 = styled.table`

/* text-align:right; */


`;
const Table2 = styled.table`
width:80% ;

/* text-align:right; */
`;

const Left = styled.div`

`;

const image_url = "http://127.0.0.1:8000/images/";
const Singleorder = () => {

    const [singleorderdetail, setSingleorderdetail] = useState();
    const [singleorder, setSingleorder] = useState();

    let { id } = useParams();

    const fetchUserData = () => {

        console.log("id", id);
        fetch("http://127.0.0.1:8000/api/orderdetails/" + id)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("fetch singleOrderdetail data:", data.order_detail);

                if (data.status == "success") {
                    setSingleorderdetail(data.order_detail);
                    setSingleorder(data.order);
                    console.log(
                        "fetch singleOrderdetail data:",
                        data.order_detail
                    );
                    console.log("fetch singleOrder data:", data.order);
                } else {
                    ("Error on data fetching.");
                }
            });
    };

    console.log("single order:", singleorder);

    React.useEffect(() => {
        // Update the document title using the browser API
        fetchUserData();
    }, []);

    return (
        <Wrapper>

            <Table>
                <Tr>
                    <Th>order id</Th>
                    <Th>images</Th>
                    <Th>Product Name</Th>
                    <Th>textoncake</Th>
                    <Th>Quantity</Th>
                    <Th>sugerless</Th>
                    <Th>Eggless</Th>
                </Tr>
                <Tr>
                    <Td colSpan={7}>
                        <Hr />
                    </Td>
                </Tr>

                {singleorderdetail &&
                    singleorderdetail.map((item, index) => (
                        <Tr>
                            <Td>{item.order_id}</Td>
                            <Td>
                                <Image src={image_url + item.image} />
                            </Td>
                            <Td>{item.name}</Td>
                            <Td>{item.textoncake}</Td>
                            <Td>{item.qty}</Td>
                            <Td>{item.sugarless}</Td>
                            <Td>{item.eggless}</Td>
                        </Tr>
                    ))}
            </Table>


            <Right>
                {singleorder &&
                    singleorder.map((item, index) => (
                        <><Table2></Table2>
                            <Table1>
                                <tr>
                                <td>subtotal:</td>
                                <td>{item.subtotal}</td>
                                </tr>
                                <tr>
                                <td>discount::</td>
                                <td>{item.discount}</td>
                                </tr>
                                <tr>
                                <td> shiping charge:</td>
                                <td>{item.shipping_charge}</td>
                                </tr>
                                <tr>
                                    <td> total:</td>
                                    <td> {item.total}</td>
                                </tr>



                                                      </Table1>
                        </>
                    ))}
            </Right>
        </Wrapper>
    );
};

export default Singleorder;
