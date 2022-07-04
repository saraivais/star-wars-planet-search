import React from 'react';
import lsObiwan from '../images/lsObiwan.png';
import '../style/Loading.css';

function Loading() {
  return (
    <div className="loading-page">
      <img className="loading-saber-hilt" src={ lsObiwan } alt="teste" />
      <div className="loading-saber-blade" />
    </div>
  );
}

export default Loading;
