import React from 'react';
import { useParams } from 'react-router';
export const Usuario: React.FC = () => {
    let { usuarioId }:any = useParams();
    return <h3>Requested topic ID: {usuarioId}</h3>;

}