import React, {  useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const TransactionChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const { customerId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionsResponse = await axios.get('http://localhost:5000/transactions');
                
                const transactions = transactionsResponse.data || [];
                console.log(transactionsResponse.data);
                const customerTransactions = transactions.filter(transaction => transaction.customer_id == parseInt(customerId));

                const dailyAmounts = {};
                customerTransactions.forEach(transaction => {
                    const date = transaction.date;
                    const amount = transaction.amount;
                    if (dailyAmounts[date]) {
                        dailyAmounts[date] += amount;
                    } else {
                        dailyAmounts[date] = amount;
                    }
                });

                const labels = Object.keys(dailyAmounts);
                const data = Object.values(dailyAmounts);

                console.log('Labels:', labels);
                console.log('Data:', data);

                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                const ctx = chartRef.current.getContext('2d');
                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Total Amount per Day',
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true // Ensure y-axis starts from zero
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [customerId]);

    return <>
     <div className="row  px-0">
        <header className="header bg-white shadow-sm px-2 py-3 " id="header">
      <h3> <Link to='/customerTable' className='text-decoration-none  text-dark' >CustomerTable  </Link> {'>'} chart </h3>
    </header>
        </div>
        
        <div className='container'>
            <div className="chart-container">
                <canvas ref={chartRef} width="400" height="200" />
            </div>
        </div>
    </>
};

export default TransactionChart;
