import React from 'react';
import { useParams } from 'react-router';
export const Usuario: React.FC = () => {
    let { usuarioId }:any = useParams();
    const titulo = usuarioId ? "editar usuario ":"crear usuaior" 
    const value = usuarioId?{nombre:'julian'}:{}
    return <h3><input type="text" value={value?.nombre}/>{titulo} Requested topic ID: {usuarioId}</h3>;

}