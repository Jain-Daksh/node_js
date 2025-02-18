import React from 'react'

import { useEffect, useState } from 'react';
const Role = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userdetails'));
    if (items) {
      setItems(items);
    }
  }, []);
}
export default Role