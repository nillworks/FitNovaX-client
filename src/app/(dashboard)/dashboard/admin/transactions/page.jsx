import TransactionsSection from '@/Components/DashBoardUi/AdminUi/Transactions/TransactionsSection';
import getTransactions from '@/lib/api/getTransactions';

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const pageNumber = Number(params?.page) || 1;
  const limit = 10;
  
  const transactionsRes = await getTransactions(pageNumber, limit);
  const transactions = transactionsRes?.data || [];
  const pagination = {
    total: transactionsRes?.total || 0,
    currentPage: transactionsRes?.currentPage || 1,
    totalPages: transactionsRes?.totalPages || 1,
  };

  return (
    <>
     <TransactionsSection 
       transactions={transactions} 
       pagination={pagination} 
       currentPage={pageNumber} 
     /> 
    </>
  )
}

export default page;
