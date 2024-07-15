import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function CustomerTable({ onCustomerSelect }) {
  const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState({ name: '', amount: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  async function fetchData(){
    try {
        const customersResponse = await axios.get('http://localhost:5000/customers');
        const transactionsResponse = await axios.get('http://localhost:5000/transactions');
        setCustomers(customersResponse.data);
        setTransactions(transactionsResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }

    };
  
    useEffect(() => {
      fetchData()
  }, []);

  const handleNameChange = (e) => {
    setFilter({ ...filter, name:e.target.value });
  };

  const handleAmountChange = (e) => {
    setFilter({ ...filter, amount: e.target.value });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const customer = customers.find(c => c.id == transaction.customer_id);
    if (!customer) return false;
    return (
      (!filter.name || customer.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (!filter.amount || transaction.amount == Number(filter.amount))
    );
  });
console.log(transactions);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <>
 <div className="row  px-0">
        <header className="header bg-white " id="header">
          <div className="bg-white px-2 py-3 rounded-3">

      <h3>CustomerTable</h3>
          </div>
    </header>
        </div>


  <div className="container  my-5">
 
      <div className='d-flex justify-content-around my-3'>
        <div className="form-group mx-2 w-100">
          <label className='lead'>Filter by Name:</label>
          <input className='form-control'
            type="text"
            value={filter.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group mx-2 w-100">
          <label className='lead'>Filter by Amount:</label>
          <input className='form-control'
            type="number"
            value={filter.amount}
            onChange={handleAmountChange}
          />
        </div>
      </div>
      <table className='table table-striped table-hover'>
        <thead className='thead-dark'>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>chart</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => {
            const customer = customers.find(c => c.id == transaction.customer_id);
            return (
              <tr key={transaction.id}>
                <td>{customer ? customer.name : 'Unknown'}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td> <Link to={`/transactionGraph/${customer.id}`} className='btn btn-outline-dark '> show chart</Link> </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>


  </>
}
