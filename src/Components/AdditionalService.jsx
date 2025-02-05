import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdditionalService = () => {
      const navigate = useNavigate();
      const [flag, setFlag] = useState(true);
      const [product, setProduct] = useState([]);
      const [page, setPage] = useState(1);
      const [search, setSearch] = useState("");
      const [count, setCount] = useState(0);
      const url = process.env.REACT_APP_DEV_URL;
    
      const handleDelete = async (id) => {
        try {
          let data = await fetch(`${url}/service/delete/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          data = await data.json();
          getService();
          getCount();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      const getCount = async () => {
        try {
          let data = await fetch(`${url}/service`);
          data = await data.json();
          setCount(data.data.length);
        } catch (error) {
          console.log(error);
        }
      };
    
      const getService = async () => {
        try {
          let data = await fetch(`${url}/service?page=${page}`);
          data = await data.json();
          console.log(data, "data");
          setProduct(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getService();
        getCount();
      }, [page]);
  return (
    <div>

    </div>
  )
}

export default AdditionalService