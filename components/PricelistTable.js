import { useEffect, useState } from "react";
import Center from "./Center";
import Title from "./Title";

export default  function PricelistTable(){
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
  
    // Fetch existing records on load
    useEffect(() => {
      fetch("/api/pricelist")
        .then((res) => res.json())
        .then((json) => setData(json));
    }, []);
  
    const handleUpload = async () => {
      if (!file) return alert("Please select a CSV file first.");
  
      const formData = new FormData();
      formData.append("csv", file);
  
      const res = await fetch("/api/pricelist", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
      if (result?.data) {
        setData(result.data); // show imported data immediately
      } else {
        alert("Upload failed");
      }
    };

    return <Center>
        <Title>Ценовник</Title>
        <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Реден</th>
            <th>Назив</th>
            <th>Цена М</th>
            <th>Пак</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.reden}</td>
              <td>{item.naziv}</td>
              <td>{item.cenam}</td>
              <td>{item.pak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Center>
}