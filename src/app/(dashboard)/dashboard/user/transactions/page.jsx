import TransactionsTable from '@/Components/DashBoardUi/UserUi/Transactions/TransactionsTable';

export const metadata = { title: 'FitNova | My Transactions' };

const page = () => {
  return (
    <>
      <TransactionsTable />
    </>
  );
};

export default page;
