//import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import Axios from 'axios';

//Dependencias para la tablas
import * as React from 'react';
import { createStyles, createTheme, makeStyles, styled, Theme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { red } from "@mui/material/colors";
// import Paper from '@mui/material/Paper';
// import { red } from "@mui/material/colors";
// import { width } from "@mui/system";

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'black',
      color: theme.palette.common.white,
      padding: '1%',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,

    },
    [`&.${tableCellClasses.alignCenter}`]: {
        margin : 500,
    }
  }));

  const MyTable = styled(TableContainer)(({ theme }) => ({
      margin : 50,
      width : 1250,
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  

const UsuariosLista:React.FC = () => {
    const [usersList, setUsersList]= useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3009/api/users/userList').then((response) => {
            setUsersList(response.data)

        });
    },[])

const desactivarUsuario= (userId : number) => {
    Axios.put('http://localhost:3009/api/users/userDelete',{
      userId : userId
    });
    window.location.reload();
}    

    return (
        <MyTable>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="right">Apellido</StyledTableCell>
                <StyledTableCell align="right">Mail&nbsp;</StyledTableCell>
                <StyledTableCell align="right">Teléfono&nbsp;</StyledTableCell>
                <StyledTableCell align="right">Rol&nbsp;</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((row : any) => (
                <StyledTableRow key={row.nombre}>
                  <StyledTableCell component="th" scope="row">
                    {row.nombre}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.apellido}</StyledTableCell>
                  <StyledTableCell align="right">{row.mail}</StyledTableCell>
                  <StyledTableCell align="right">{row.tel}</StyledTableCell>
                  <StyledTableCell align="right">{row.rol_id}</StyledTableCell>
                  <IconButton aria-label="edit" onClick={() => {
                    alert('Vas a editar el usuario: '+ row.id)
                  }}>
                  <ModeEditIcon color="primary"/>
                  </IconButton><br/> 
                  <IconButton aria-label="delete" onClick={() => {
                    desactivarUsuario(row.id)
                  }}>
                    <DeleteIcon sx={{ color: red[500] }}/>
                  </IconButton>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </MyTable>
      );
}

export default UsuariosLista