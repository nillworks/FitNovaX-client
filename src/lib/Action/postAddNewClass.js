import headersAuthorization from '../headersAuthorization.client';

const postAddNewClass = async newAddClass => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/addNewClass`, {
    method: 'POST',
    headers: {
      ...(await headersAuthorization()),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAddClass),
  });
  const res = await req.json();

  return res;
};

export default postAddNewClass;
