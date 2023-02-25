import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const ShowPurchases = () => {
  const [purchaseData, setpurchaseData] = useState();

  useEffect(() => {
    async function getLoans() {
      const response = await fetch("/api-admin/purchases/get-purchases");
      const result = await response.json();
      setpurchaseData(result);
    }
    getLoans();
  }, []);

  const columns = [
    { field: "userUid", headerName: "User UID", width:270 },
    { field: "user", headerName: "Bookstore ID", width:270, valueFormatter: (params) => {
      return params?.value?.bookStoreId
    } },
    { field: "bookId", headerName: "Book Name", width: 230, valueFormatter: (params) => {       
      return params?.value?.name;
    } },
    { field: "price", headerName: "Book Price", width: 100 },
    {
      field: "purchaseDate",
      headerName: "Purchase Date",
      width: 290,
    },
    {
      field: "purchaseType",
      headerName: "Purchase Type",
      width: 160,
    },
  ];

  console.log(purchaseData);
  return (
    <div style={{height: 400, width: "80%", margin: "auto"}}>
      {purchaseData && (
        <DataGrid
          getRowId={(r) => r._id}
          rows={purchaseData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}      
    </div>
  );
};

export default ShowPurchases;
