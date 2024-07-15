import React, { useEffect, useState } from 'react'
import CustomerTable from '../CustomerTable/CustomerTable'
import CalendarComponent from '../Calendar/Calendar'
import axios from 'axios'

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [numberOfCustomers, setNumberOfCustomers] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to fetch data from API
  async function fetchData() {
          const customersResponse = await axios.get('http://localhost:5000/customers');
          const transactionsResponse = await axios.get('http://localhost:5000/transactions');
          setCustomers(customersResponse.data);
          setTransactions(transactionsResponse.data);
  }


  // useEffect to update derived state (number of customers and total amount)
  useEffect(() => {
    fetchData();

      // Update number of customers
      if (customers && customers.length > 0) {
          setNumberOfCustomers(customers.length);
      }

      // Calculate total amount of transactions
      if (transactions && transactions.length > 0) {
          const total = transactions.reduce((total, transaction) => total + transaction.amount, 0);
          setTotalAmount(total);
      }
  }, [customers, transactions]); // Dependency array ensures this runs whenever customers or transactions change



  
  return <>

  <div className="row  px-0">
        <header className="header bg-white shadow-sm px-2 py-3 " id="header">
      <h3>Dashbord</h3>
    </header>
        </div>
  <section className="container mt-3">
    <div className="row ">
      <div className="col-md-4 p-0 ">
        <div className="customer bg-white shadow py-2 px-3 rounded-3 mx-3 ">
          <div className="icon py-2 text-center">

          <i class="fas fa-thin fa-user-group my-2"></i>
          </div>
          <div className="info d-flex justify-content-between">
            <p>Customers Total</p>
            <div className="num">{numberOfCustomers}</div>
          </div>
          
        </div>

      </div>
      <div className="col-md-4 p-0 ">
        <div className="customer bg-white shadow py-2 px-3 rounded-3 mx-3 ">
          <div className="icon py-2 text-center">

          <i class="fa-solid my-2 fa-money-bill-1-wave"></i>
          </div>
          <div className="info d-flex  justify-content-between">
            <p> Total 	Amount</p>
            <div className="num">{totalAmount}</div>
          </div>
          
        </div>

      </div>
      <div className="col-md-4 p-0 ">
        <div className="customer bg-white shadow py-2 px-3 rounded-3 mx-3 ">
          <div className="icon py-2 text-center">

          <i class="fas fa-thin fa-user-group my-2"></i>
          </div>
          <div className="info d-flex justify-content-between">
            <p>Customers Total</p>
            <div className="num">{numberOfCustomers}</div>
          </div>
          
        </div>

      </div>
      
    </div>
    <div className="row">
      <div className="col-md-8">
        <div className="customer bg-white px-3 py-3 mt-4 shadow rounded-3">
       <CustomerTable/>
        </div>
      </div>
      <div className="col-md-4 calender">
        <div className="bg-white py-1 mt-4 shadow rounded-3 pb-3 ">

   <CalendarComponent/>
        </div>
      </div>
    </div>
   
      




    </section>

  </>
}
