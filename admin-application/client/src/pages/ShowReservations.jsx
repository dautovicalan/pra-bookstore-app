import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import TextField from "@mui/material/TextField";
import Swal from 'sweetalert2'


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "userUid",
    numeric: false,
    disablePadding: true,
    label: "User UID",
  },
  {
    id: "bookStoreId",
    numeric: false,
    disablePadding: true,
    label: "Bookstore ID",
  },
  {
    id: "bookName",
    numeric: false,
    disablePadding: true,
    label: "Book Name",
  },
  {
    id: "loanDuration",
    numeric: true,
    disablePadding: true,
    label: "Loan Duration",
  },
  {
    id: "loanStart",
    numeric: false,
    disablePadding: true,
    label: "Loan Start",
  },
  {
    id: "loanEnd",
    numeric: false,
    disablePadding: true,
    label: "Loan End",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ShowReservations = () => {
  const [originalRows, setOriginalRows] = useState();
  const [loanData, setLoanData] = useState();
  const [reservationId, setReservationId] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const filteredRows = originalRows.filter((row) => {
      return row.user.bookStoreId.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setLoanData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    setLoanData(originalRows);
  };

  useEffect(() => {
    async function getLoans() {
      const response = await fetch("/api-admin/loans/get-loans");
      const result = await response.json();
      setOriginalRows(result);
      setLoanData(result);
    }
    getLoans();
  }, []);

  const handleBookReturned = async (e) => {
    e.preventDefault();

    if (!reservationId) {
      return console.log("something went wrong");
    }

    try {
      const response = await fetch("/api-admin/loans/set-loan-returned", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservationId }),
      });
      const result = await response.json();
      setLoanData(result);
      Swal.fire({
        title: "Uspjeh",
        text: "Uspjesno ste oznacili vracenu knjigu",
        icon: "success",
        confirmButtonText: "Cool"
      })
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(loanData);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = loanData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - loanData.length) : 0;

  return (
    <div style={{ width: "95%", margin: "auto" }}>
      {loanData && (
        <Paper sx={{ width: "100%" }}>
          <TextField
            id="standard-basic"
            label="Search by Bookstore ID"
            variant="standard"
            value={searched}
            onChange={(e) => requestSearch(e.target.value)}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={loanData.length}
              />
              <TableBody>
                {stableSort(loanData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);

                    return (
                      <TableRow hover tabIndex={-1} key={row._id}>
                        <TableCell align="left">{row.userUid}</TableCell>                        
                        <TableCell align="left">{row.user.bookStoreId}</TableCell>                        
                        <TableCell align="left">{row.bookId.name}</TableCell>
                        <TableCell align="left">{row.loanDuration}</TableCell>
                        <TableCell align="left">{row.loanDateStart}</TableCell>
                        <TableCell align="left">{row.loanDateEnd}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              setReservationId(row._id);
                              handleOpen();
                            }}
                          >
                            Oznaci kao vraceno
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={loanData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Jeste li sigurni?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Oznaci rezervaciju kao vracenu? <br/>{reservationId}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleBookReturned}
            >
              Da
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Ne
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ShowReservations;
